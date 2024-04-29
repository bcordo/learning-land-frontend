import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CharacterResponseContainer from "../../components/CharacterResponseContainer/CharacterResponseContainer";
import FadedDivider from "../../components/FadedDivider/FadedDivider";
import FadedDividerText from "../../components/FadedDividerText/FadedDividerText";
import CharacterChatNavbar from "./CharacterChatNavbar";
import { styles } from "./styles";
import uuid from "react-native-uuid";
import { WEBSOCKET_URL } from "../../assets/constant";
import StatusBarComp from "../../components/StatusBarComp/StatusBarComp";
import LottieView from "lottie-react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";

const CharacterChat = (): React.JSX.Element => {
  const UserMissionState = {
    INACTIVE: "INACTIVE",
    ACTIVE: "ACTIVE",
    FAILED: "FAILED",
    COMPLETED: "COMPLETED",
    PAUSED: "PAUSED",
    ERROR: "ERROR",
  };
  const Command = {
    START: "START",
    END: "END",
    PAUSE: "PAUSE",
    RESUME: "RESUME",
  };
  const InteractionType = {
    COMMAND: "COMMAND",
    USER_UTTERANCE: "USER_UTTERANCE",
    CHARACTER_RESPONSE: "CHARACTER_RESPONSE",
    CHARACTER_RESPONSE_UTTERANCE: "CHARACTER_RESPONSE_UTTERANCE",
    ASSISTANT_HINT: "ASSISTANT_HINT",
    ASSISTANT_CORRECTION: "ASSISTANT_CORRECTION",
    MISSION_STATUS: "MISSION_STATUS",
    USER_ACTION: "USER_ACTION",
    ERROR: "ERROR",
  };
  const MessageType = {
    CHUNK: "CHUNK",
    FULL: "FULL",
  };
  const ContentType = {
    TEXT: "TEXT",
    AUDIO: "AUDIO",
    JSON: "JSON",
    VIDEO: "VIDEO",
    IMAGE: "IMAGE",
  };

  type arrayString = string[];
  const [inputText, setInputText] = useState<string>("");
  const [boatResponse, setBoatResponse] = useState<string>("");
  const [botHint, setbotHint] = useState<arrayString>([]);
  const [botCorrection, setbotCorrection] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [enableRecording, setEnableRecording] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const [WS, setWS] = React.useState(null);

  const [chatMessages, setChatMessages] = React.useState([]);
  const [currentUtterance, setCurrentUtterance] = React.useState("");

  const [missionState, setMissionState] = React.useState(
    UserMissionState.INACTIVE
  );
  const [goals, setGoals] = React.useState([]);

  const connectWebSocket = () => {
    const newWS = new WebSocket(WEBSOCKET_URL);
    setWS(newWS);
    newWS.onopen = () => {
      setSocketConnected(true);
      console.log("WebSocket connected");
    };
    newWS.onmessage = (event) => {
      // console.log("Received WS message:", event.data);
      handleServerMessage(event.data);
    };
    newWS.onclose = () => {
      console.log("WebSocket disconnected");
      setWS(null);
    };
  };

  useEffect(() => {
    if (socketConnected) {
      sendMessage({
        message_type: MessageType.FULL,
        interaction_type: InteractionType.COMMAND,
        content_type: ContentType.TEXT,
        data: Command.START,
      });

      // setChatState("active");
      setChatMessages([{ type: "state", text: "Mission started" }]);
    }
  }, [socketConnected]);
  console.log(boatResponse, responseMessage, "MESSAGE is");

  const handleServerMessage = (message) => {
    try {
      setIsTyping(false);
      const parsedMessage = JSON.parse(message);
      // console.log("Parsed message:", parsedMessage);

      switch (parsedMessage.interaction_type) {
        case InteractionType.USER_UTTERANCE:
          handleUserUtteranceMessage(parsedMessage);
          break;
        case InteractionType.CHARACTER_RESPONSE_UTTERANCE:
          handleCharacterUtteranceMessage(parsedMessage);
          break;
        case InteractionType.CHARACTER_RESPONSE:
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

  const handleUserUtteranceMessage = (message) => {
    if (message.content_type === ContentType.TEXT) {
      setChatMessages((messages) => [
        ...messages,
        {
          type: "user",
          text: message.data,
        },
      ]);
    }
  };

  const handleCharacterUtteranceMessage = (message) => {
    console.log(message, "messaggeg");
    if (message.message_type === MessageType.CHUNK) {
      setResponseMessage(message.data);
      setCurrentUtterance((utterance) => utterance + message.data);
    } else if (message.message_type === MessageType.FULL) {
      setChatMessages((messages) => [
        ...messages,
        {
          type: "character-utterance",
          text: currentUtterance,
        },
      ]);
      setCurrentUtterance("");
    }
  };

  const handleCharacterResponseMessage = (message) => {
    try {
      const response = JSON.parse(message.data);
      setChatMessages((messages) => [
        ...messages,
        {
          type: "character-response",
          text: response.utterance,
          action: response.action,
          emotion: response.emotion,
          thought: response.thought,
        },
      ]);
    } catch (error) {
      console.error("Error parsing character response:", error);
    }
  };

  const handleHintMessage = (message) => {
    try {
      const hint = JSON.parse(message.data);
      setbotHint([...botHint, hint.utterance]);
      setChatMessages((messages) => [
        ...messages,
        {
          type: "assistant-hint",
          text: hint.utterance,
        },
      ]);
    } catch (error) {
      console.error("Error parsing assistant hint:", error);
    }
  };

  const handleCorrectionMessage = (message) => {
    try {
      const correction = JSON.parse(message.data);
      setChatMessages((messages) => [
        ...messages,
        {
          type: "assistant-correction",
          text: correction.utterance,
        },
      ]);
    } catch (error) {
      console.error("Error parsing assistant correction:", error);
    }
  };

  const handleMissionStatusMessage = (message) => {
    // console.log("Received mission status message:", message);
    if (
      message.content_type === ContentType.JSON ||
      message.content_type === ContentType.TEXT
    ) {
      try {
        const missionStatusData = JSON.parse(message.data);
        // console.log("Parsed mission status data:", missionStatusData);

        setMissionState(missionStatusData.mission_state);
        setGoals(missionStatusData.goals || []); // Ensure goals are updated correctly

        // console.log("Mission state:", missionStatusData.mission_state);
        // console.log("Goals:", missionStatusData.goals);

        if (missionStatusData.mission_state === UserMissionState.COMPLETED) {
          setChatState("completed");
          setChatMessages([
            { type: "state", text: "Mission completed successfully!" },
          ]);
          setChatMessages((messages) => [
            ...messages,
            { type: "state", text: "Refresh page to retry" },
          ]);
          // setChatMessages((messages) => [...messages, { type: 'state', text: 'Mission completed successfully!!' }]);
        } else if (
          missionStatusData.mission_state === UserMissionState.FAILED
        ) {
          setChatState("failed");
          setChatMessages([{ type: "state", text: "Mission failed" }]);
          setChatMessages((messages) => [
            ...messages,
            { type: "state", text: "Refresh page to retry" },
          ]);
          // setChatMessages((messages) => [...messages, { type: 'state', text: 'Mission failed' }]);
        } else if (
          missionStatusData.mission_state === UserMissionState.ACTIVE
        ) {
          setChatState("active");
        } else if (
          missionStatusData.mission_state === UserMissionState.PAUSED
        ) {
          setChatState("paused");
        }
      } catch (error) {
        console.error("Error parsing mission status:", error);
      }
    }
  };

  const scrollViewRef = useRef<ScrollView>();
  useEffect(() => {
    setBoatResponse(boatResponse + responseMessage);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [responseMessage]);

  useEffect(() => {
    const handleStartChat = () => {
      connectWebSocket();
      setIsTyping(true);
    };
    handleStartChat();
  }, []);

  const sendMessage = (message: any) => {
    if (WS && WS.readyState === WebSocket.OPEN) {
      WS.send(JSON.stringify(message));
      // console.log("Sent WS message:", message);
    } else {
      console.error(
        "WebSocket is not connected. Cannot send message:",
        message
      );
    }
  };

  const handleStartRecordAudio = () => {
    setIsRecording(true);
  };
  const handleStopRecordAudio = () => {
    setIsRecording(false);
    setEnableRecording(false);
  };

  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      <View style={styles.mainContainer}>
        <View style={styles.characterChatContainer}>
          <View>
            <CharacterChatNavbar />
            <View style={styles.missionTxtContainer}>
              <Text style={styles.coffeeShopTxt}>
                The girl in the coffee shop
              </Text>
              <Text style={styles.missionTxt}>World-1 Mission-1</Text>
            </View>
          </View>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={[
            styles.characterChatContainerHeight,
            {
              height: enableRecording ? "40%" : "60%",
              minHeight: enableRecording ? "40%" : "60%",
            },
          ]}
        >
          <View style={[styles.characterChatContainer]}>
            <CharacterResponseContainer
              isTyping={isTyping}
              message={boatResponse}
            />
            {botHint.length
              ? botHint.map((hint) => (
                  <FadedDividerText
                    key={uuid.v4().toString()}
                    idx={uuid.v4()}
                    text={hint}
                    fadedDividerTextColor={styles.fadedDividerTextOrange}
                    color={[
                      "rgba(245, 140, 57, 0)",
                      "#F58C39",
                      "rgba(245, 140, 57, 0)",
                    ]}
                    showIcon={true}
                  />
                ))
              : ""}
            {botCorrection ? (
              <View>
                <FadedDivider
                  style={{ marginVertical: 11 }}
                  color={[
                    "rgba(255, 255, 255, 0)",
                    "rgba(0, 0, 0, 0.5)",
                    "rgba(255, 255, 255, 0)",
                  ]}
                />
                <View style={styles.trySayingInstedContainer}>
                  <Image
                    source={require("../../assets/icons/gray_stars.png")}
                  />
                  <View>
                    <Text style={styles.trySayingInstedTxt}>
                      {botCorrection}
                    </Text>
                  </View>
                </View>
                <View style={styles.characterChatButtonsBox}>
                  <TouchableOpacity
                    style={styles.characterChatButtons}
                    onPress={() => {}}
                  >
                    <Image
                      source={require("../../assets/icons/circular_outlined.png")}
                    />
                    <Text style={styles.characterChatButtonTxt}>
                      Explain to me
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.characterChatButtons}
                    onPress={() => {}}
                  >
                    <Image
                      source={require("../../assets/icons/bookmark.png")}
                    />
                    <Text style={styles.characterChatButtonTxt}>
                      Add to core phrases
                    </Text>
                  </TouchableOpacity>
                </View>
                <FadedDivider
                  style={{ marginVertical: 11 }}
                  color={[
                    "rgba(255, 255, 255, 0)",
                    "rgba(0, 0, 0, 0.5)",
                    "rgba(255, 255, 255, 0)",
                  ]}
                />
              </View>
            ) : (
              ""
            )}
          </View>
        </ScrollView>
        {enableRecording ? (
          <View style={styles.startRecordContainer}>
            <View style={styles.startToRecordContainer}>
              {isRecording ? (
                <LottieView
                  style={{ width: 100, height: 48 }}
                  source={require("../../assets/animations/recording.json")}
                  autoPlay
                  loop
                />
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.plusButton}
                    onPress={() => {}}
                  >
                    <Image
                      source={require("../../assets/icons/EllipseStartRecord.png")}
                    />
                  </TouchableOpacity>
                  <Text style={styles.startToRecordTxt}>Tap to record</Text>
                </>
              )}
            </View>
            <View
              style={[
                styles.typeMessageContainer,
                { justifyContent: "center", alignItems: "center", gap: 36 },
              ]}
            >
              <TouchableOpacity style={styles.plusButton} onPress={() => {}}>
                <Image source={require("../../assets/icons/plus.png")} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.startRecordButton}
                onPress={handleStartRecordAudio}
              >
                <Image
                  style={styles.startRecordIcon}
                  source={require("../../assets/icons/microphone.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() => {
                  handleStopRecordAudio();
                }}
              >
                <Image source={require("../../assets/icons/keyboard.png")} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.typeMessageContainer}>
            <TouchableOpacity style={styles.plusButton} onPress={() => {}}>
              <Image source={require("../../assets/icons/plus.png")} />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Message"
              placeholderTextColor="#D4D4D4"
              onChangeText={(text) => setInputText(text)}
              value={inputText}
            />
            <TouchableOpacity
              style={[styles.plusButton, styles.recordeButton]}
              onPress={() => setEnableRecording(true)}
            >
              <Image source={require("../../assets/icons/microphone.png")} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};
export default CharacterChat;
