import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ContentType,
  InteractionType,
  MessageType,
  UserMissionState,
  WEBSOCKET_URL,
} from "../assets/constant";
import Toast from "react-native-toast-message";
import { chatMessagesInterface } from "../intefaces/variablesInterfaces";
import { useNavigation } from "@react-navigation/native";

interface WebSocketContextProps {
  WS: WebSocket | null;
  socketConnected: boolean;
  loader: boolean;
  setLoader: any;
  speakStatus: string;
  setSpeakStatus: any;
  chatMessages: chatMessagesInterface[];
  setChatMessages: any;
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;
  handleError: () => void;
  sendingAudio: boolean;
  isSendingAudio: any;
  handleServerMessage: (message: string) => void;
  handleUserUtteranceMessage: (message: string) => void;
  handleCharacterResponseMessage: (message: string) => void;
  handleHintMessage: (message: string) => void;
  handleCorrectionMessage: (message: string) => void;
  handleMissionStatusMessage: (message: string) => void;
  handleGoEndScreen:()=>void;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(
  undefined
);

interface WebSocketProviderProps {
  children: ReactNode;
}
const initialSpeakStatus = "";

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
    const navigation:any = useNavigation();
  const [WS, setWS] = useState<WebSocket | null>(null);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [speakStatus, setSpeakStatus] = useState<string>(
    initialSpeakStatus
  );
  const [chatMessages, setChatMessages] = useState<chatMessagesInterface[]>([]);
  const [sendingAudio, isSendingAudio] = useState<boolean>(false);
  const [missionState, setMissionState] = React.useState(
    UserMissionState.INACTIVE
  );
  const [goals, setGoals] = React.useState([]);
  const [chatState, setChatState] = React.useState("inactive");
const handleGoEndScreen=()=>{
  disconnectWebSocket();
  setTimeout(()=>{
    navigation.navigate('MissionEnd');
  },100)
}
  const handleError = () => {
    if(['CharacterChat'].includes(navigation?.getCurrentRoute()?.name)){
            try {
              throw new Error("Simulated error");
            } catch (error) {
            Toast.show({
                type: "error",
                text1: "Server disconnected.",
                text2: "Please try again later.",
                position: "top",
              });
      
            }
          
    }
   
  };
  const handleNavigate=()=>{
    if(['CharacterChat'].includes(navigation?.getCurrentRoute()?.name)){
        setTimeout(()=>{
          navigation.navigate('MissionStart');
        },100)
      }
  }
  const handleServerMessage = async (message: string) => {
    try {
      const parsedMessage = JSON.parse(message);
      switch (parsedMessage.interaction_type) {
        case InteractionType.USER_UTTERANCE:
          handleUserUtteranceMessage(parsedMessage);
          break;
        case InteractionType.CHARACTER_UTTERANCE:
        case InteractionType.CHARACTER_ACTION:
        case InteractionType.CHARACTER_NARRATION:
        case InteractionType.CHARACTER_EMOTION:
        case InteractionType.CHARACTER_THOUGHT:
        case InteractionType.CHARACTER_UPDATED_LOCATION:
        case InteractionType.CHARACTER_UPDATED_TIME:
        case InteractionType.COMMAND:
          handleCharacterResponseMessage(parsedMessage);

          break;

        case InteractionType.ASSISTANT_HINT:
          handleHintMessage(parsedMessage);

          break;
        case InteractionType.ASSISTANT_CORRECTION:
          handleCorrectionMessage(parsedMessage);

          break;
        case InteractionType.MISSION_STATUS:
          handleMissionStatusMessage(parsedMessage);

          break;
        default:
          console.log(
            "Unknown interaction type:",
            parsedMessage.interaction_type
          );
      }
    } catch (error) {
      console.error("Error parsing server message:", error);
    }
  };
  const handleUserUtteranceMessage = (message: any) => {
    if (message.content_type === ContentType.TEXT) {
      setChatMessages((prevMessages) => {
        const updatedMessages = prevMessages.filter((message) => {
          return true;
        });

        updatedMessages.push({
          type: "user",
          text: message.data,
        });
        return updatedMessages;
      });
    }
  };
  const handleCharacterResponseMessage = (message: any) => {
    if (message.message_type === MessageType.CHUNK) {
      if (message.content_type === ContentType.TEXT) {
        const interactionTypes = [
          InteractionType.CHARACTER_UTTERANCE,
          InteractionType.CHARACTER_ACTION,
          InteractionType.CHARACTER_NARRATION,
          InteractionType.CHARACTER_EMOTION,
          InteractionType.CHARACTER_THOUGHT,
          InteractionType.CHARACTER_UPDATED_LOCATION,
          InteractionType.CHARACTER_UPDATED_TIME,
        ];

        if (interactionTypes.includes(message.interaction_type)) {
          setChatMessages((messages) => {
            const updatedMessages = messages.filter(
              (message) => !message?.isTyping
            );
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            if (lastMessage && lastMessage.type === message.interaction_type) {
              return [
                ...updatedMessages.slice(0, -1),
                {
                  ...lastMessage,
                  text: lastMessage.text + message.data,
                },
              ];
            } else {
              return [
                ...updatedMessages,
                {
                  type: message.interaction_type,
                  text: message.data,
                },
              ];
            }
          });
        }
      }
    } else if (message.message_type === MessageType.FULL) {
      if (message.content_type === ContentType.TEXT) {
        setChatMessages((messages) => [
          ...messages,
          {
            type: "character-utterance",
            text: message.data,
          },
        ]);
      } else if (message.content_type === ContentType.AUDIO) {
        console.log("Received full audio message:", message.data);
      }
    }
  };
  const handleHintMessage = (message: any) => {
    try {
      const hint = JSON.parse(message.data);
      setChatMessages((messages) => [
        ...messages,
        {
          type: "assistant-hint",
          text: hint?.phrase?.text,
        },
      ]);
    } catch (error) {
      console.error("Error parsing assistant hint:", error);
    }
  };
  const handleCorrectionMessage = (message: any) => {
    try {
      const correction = JSON.parse(message.data);
      setChatMessages((messages) => [
        ...messages,
        {
          type: "assistant-correction",
          text: correction?.phrase?.text,
        },
      ]);
    } catch (error) {
      console.error("Error parsing assistant correction:", error);
    }
  };
  const handleMissionStatusMessage = (message: any) => {
    if (
      message.content_type === ContentType.JSON ||
      message.content_type === ContentType.TEXT
    ) {
      try {
        const missionStatusData = JSON.parse(message.data);
        setMissionState(missionStatusData?.user_mission_state);
        setGoals(missionStatusData?.user_goals || []);

        if (
          missionStatusData?.user_mission_state === UserMissionState.COMPLETED
        ) {
          setChatState("completed");
          // setChatMessages([
          //   { type: "state", text: "Mission completed successfully!" },
          // ]);
          setChatMessages((messages) => [
            ...messages,
            { type: "state", text: "Refresh page to retry" },
          ]);
          // setChatMessages((messages) => [...messages, { type: 'state', text: 'Mission completed successfully!!' }]);
        } else if (
          missionStatusData?.user_mission_state === UserMissionState.FAILED
        ) {
          setChatState("failed");
          setChatMessages([{ type: "state", text: "Mission failed" }]);
          setChatMessages((messages) => [
            ...messages,
            { type: "state", text: "Refresh page to retry" },
          ]);
          // setChatMessages((messages) => [...messages, { type: 'state', text: 'Mission failed' }]);
        } else if (
          missionStatusData?.user_mission_state === UserMissionState.ACTIVE
        ) {
          setChatState("active");
        } else if (
          missionStatusData?.user_mission_state === UserMissionState.PAUSED
        ) {
          setChatState("paused");
        }
      } catch (error) {
        console.error("Error parsing mission status:", error);
      }
    }
  };
  const connectWebSocket = async () => {
    const token = await AsyncStorage.getItem("access_token");
    const websocketUrlWithToken = `${WEBSOCKET_URL}?token=${token}`;
    const newWS = new WebSocket(websocketUrlWithToken);
    setWS(newWS);
    newWS.onopen = () => {
      setSocketConnected(true);
      console.log("WebSocket connected");
    };

    newWS.onmessage = (event) => {
      console.log("Message Arrived");
      isSendingAudio(false);
      setSpeakStatus(initialSpeakStatus);
      handleServerMessage(event.data);
      if (
        chatMessages?.[chatMessages?.length - 2]?.type ===
        InteractionType?.CHARACTER_UTTERANCE
      )
        return;
      setLoader(false);
    };

    newWS.onclose = () => {
      isSendingAudio(false);
      console.log("WebSocket disconnected");
      setWS(null);
      setLoader(false);
      handleError();
      handleNavigate()
    };
  };

  const disconnectWebSocket = () => {
    if (WS) {
      WS.close();
      console.log("WebSocket disconnected manually");
      setSocketConnected(false);
      setWS(null);
      setLoader(false);
      isSendingAudio(false);
      setChatMessages([])
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        WS,
        socketConnected,
        loader,
        setLoader,
        speakStatus,
        setSpeakStatus,
        chatMessages,
        setChatMessages,
        connectWebSocket,
        disconnectWebSocket,
        handleError,
        sendingAudio,
        isSendingAudio,
        handleServerMessage,
        handleUserUtteranceMessage,
        handleCharacterResponseMessage,
        handleHintMessage,
        handleCorrectionMessage,
        handleMissionStatusMessage,
        handleGoEndScreen,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
