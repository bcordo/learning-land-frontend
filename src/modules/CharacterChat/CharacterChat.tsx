import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import CharacterResponseContainer from "../../components/CharacterResponseContainer/CharacterResponseContainer";
import FadedDividerText from "../../components/FadedDividerText/FadedDividerText";
import CharacterChatNavbar from "./CharacterChatNavbar";
import { styles } from "./styles";
import uuid from "react-native-uuid";
import {
  Command,
  ContentType,
  InteractionType,
  MessageType,
  UserMissionState,
  WEBSOCKET_URL,
} from "../../assets/constant";
import StatusBarComp from "../../components/StatusBarComp/StatusBarComp";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import RNFS from "react-native-fs";
import { PermissionsAndroid } from "react-native";
import UserResponseContainer from "../../components/UserResponseContainer/UserResponseContainer";
import AssistantCorrection from "../../components/AssistantCorrection/AssistantCorrection";
import CharacterChatFooter from "../../components/CharacterChatFooter/CharacterChatFooter";

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.09);

const CharacterChat = (): React.JSX.Element => {
  interface chatMessagesInterface {
    type: string;
    text: string;
    action?: string;
    emotion?: string;
    thought?: string;
    isTyping?: boolean;
  }

  const [inputText, setInputText] = useState<string>("");
  const [enableRecording, setEnableRecording] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [recordPath, setRecordPath] = useState("");
  const [sendingAudio, isSendingAudio] = useState<boolean>(false);
  const [speakStatus, setSpeakStatus] = useState<string>("Start speaking");
  const [duration, setDuration] = useState(0);
  const [invalidRecord, setInvalidRecord] = useState(false);
  const [startSpeaking, setStartSpeaking] = useState(false);
  const [WS, setWS] = React.useState<WebSocket | null>(null);

  const [chatMessages, setChatMessages] = React.useState<
    chatMessagesInterface[]
  >([]);
  const [currentUtterance, setCurrentUtterance] = React.useState("");

  const connectWebSocket = () => {
    const newWS = new WebSocket(WEBSOCKET_URL);
    setWS(newWS);
    newWS.onopen = () => {
      setSocketConnected(true);

      console.log("WebSocket connected");
    };
    newWS.onmessage = (event) => {
      isSendingAudio(false);
      setSpeakStatus("Start speaking");
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

      setChatMessages([
        { type: "state", text: "Mission started" },
        { text: "", type: "character-utterance", isTyping: true },
      ]);
    }
  }, [socketConnected]);

  useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRecording]);

  const handleServerMessage = (message: string) => {
    try {
      const parsedMessage = JSON.parse(message);

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

  const handleUserUtteranceMessage = (message: any) => {
    if (message.content_type === ContentType.TEXT) {
      setChatMessages((prevMessages) => {
        const updatedMessages = prevMessages.filter((message) => {
          if (message.isTyping) {
            return false;
          }

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

  const handleCharacterUtteranceMessage = (message: any) => {
    if (message.message_type === MessageType.CHUNK) {
      setCurrentUtterance((utterance) => utterance + message.data);

      setChatMessages((prevMessages) => {
        if (
          prevMessages.length > 0 &&
          prevMessages[prevMessages.length - 1].type === "character-utterance"
        ) {
          const lastMessage = prevMessages.pop() || { text: "" };
          let updatedText = "";
          if (lastMessage?.text) {
            updatedText = lastMessage.text + " " + message.data;
          } else {
            updatedText = message.data;
          }
          return [
            ...prevMessages,
            {
              type: "character-utterance",
              text: updatedText,
              thought: message.thought,
            },
          ];
        } else {
          return [
            ...prevMessages,
            { type: "character-utterance", text: message.data },
          ];
        }
      });
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
  const handleCharacterResponseMessage = (message: any) => {
    try {
      const response = JSON.parse(message.data);
      setChatMessages((prevMessages) => {
        const updatedMessages = prevMessages.filter((message) => {
          if (message.isTyping) {
            return false;
          }
          if (message.type === "character-utterance") {
            message.thought = response.thought;

            return true;
          }

          return true;
        });

        updatedMessages.push({
          type: "character-response",
          text: response.utterance,
          action: response.action,
          emotion: response.emotion,
          thought: response.thought,
        });
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error parsing character response:", error);
    }
  };

  const handleHintMessage = (message: any) => {
    try {
      const hint = JSON.parse(message.data);
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

  const handleCorrectionMessage = (message: any) => {
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

  const handleMissionStatusMessage = (message: any) => {
    if (
      message.content_type === ContentType.JSON ||
      message.content_type === ContentType.TEXT
    ) {
      try {
        const missionStatusData = JSON.parse(message.data);

        if (missionStatusData.mission_state === UserMissionState.COMPLETED) {
          setChatMessages([
            { type: "state", text: "Mission completed successfully!" },
          ]);
          setChatMessages((messages) => [
            ...messages,
            { type: "state", text: "Refresh page to retry" },
          ]);
        } else if (
          missionStatusData.mission_state === UserMissionState.FAILED
        ) {
          setChatMessages([{ type: "state", text: "Mission failed" }]);
          setChatMessages((messages) => [
            ...messages,
            { type: "state", text: "Refresh page to retry" },
          ]);
        } else if (
          missionStatusData.mission_state === UserMissionState.ACTIVE
        ) {
        } else if (
          missionStatusData.mission_state === UserMissionState.PAUSED
        ) {
        }
      } catch (error) {
        console.error("Error parsing mission status:", error);
      }
    }
  };

  const renderChatMessage = (message: any) => {
    switch (message.type) {
      case "user-action":
        return <></>;
      case "user":
        return <UserResponseContainer message={message.text} />;
      case "character-utterance":
        return (
          <>
            <CharacterResponseContainer
              isTyping={message?.isTyping}
              message={message.text}
              thought={message?.thought}
            />
          </>
        );
      case "character-response":
        return (
          <View>
            {message.action && (
              <FadedDividerText
                key={uuid.v4().toString()}
                idx={uuid.v4()}
                text={message.action}
                color={[
                  "rgba(255, 255, 255, 0)",
                  "rgba(0, 0, 0, 0.5)",
                  "rgba(255, 255, 255, 0)",
                ]}
                showIcon={false}
              />
            )}
          </View>
        );
      case "assistant-hint":
        return (
          <FadedDividerText
            key={uuid.v4().toString()}
            idx={uuid.v4()}
            text={message.text}
            fadedDividerTextColor={styles.fadedDividerTextOrange}
            color={[
              "rgba(245, 140, 57, 0)",
              "#F58C39",
              "rgba(245, 140, 57, 0)",
            ]}
            showIcon={true}
          />
        );
      case "assistant-correction":
        return <AssistantCorrection text={message.text} />;
      case "state":
        return <></>;
      default:
        return null;
    }
  };

  const scrollViewRef = useRef<ScrollView | null>(null);
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chatMessages]);

  useEffect(() => {
    setChatMessages((messages) => [
      ...messages,
      {
        type: "character-utterance",
        isTyping: true,
        text: "",
      },
    ]);

    connectWebSocket();
  }, []);
  const onStartRecord = async () => {
    setInvalidRecord(false);
    setSpeakStatus("Listening");
    setDuration(0);
    const hasPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Audio Recorder Permission",
        message: "App needs access to your microphone to record audio.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    if (hasPermission === PermissionsAndroid.RESULTS.GRANTED) {
      const path = `${RNFS.DocumentDirectoryPath}/test.mp3`;
      setRecordPath(path);
      const result = await audioRecorderPlayer.startRecorder(path);

      audioRecorderPlayer.addRecordBackListener((e) => {
        return;
      });
    }
  };
  const handleStartRecord = () => {
    setStartSpeaking(true);
    setSpeakStatus("Start speaking");
    setIsRecording(true);
    setTimeout(() => {
      setStartSpeaking(false);
      onStartRecord();
    }, 1000);
  };

  const onStopRecord = async (sendAudioViaSocket: boolean) => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    if (duration <= 1) {
      setIsRecording(false);
      return setInvalidRecord(true);
    } else if (sendAudioViaSocket) {
      setIsRecording(false);
      sendAudio();
    }
  };

  const sendAudio = () => {
    if (WS) {
      setSpeakStatus("Sending audio");
      RNFS.readFile(recordPath, "base64")
        .then((data) => {
          sendMessage({
            message_type: MessageType.FULL,
            interaction_type: InteractionType.USER_UTTERANCE,
            content_type: ContentType.AUDIO,
            data: data,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const sendMessage = (message: any) => {
    if (WS && WS.readyState === WebSocket.OPEN) {
      isSendingAudio(true);
      WS.send(JSON.stringify(message));
    } else {
      console.error(
        "WebSocket is not connected. Cannot send message:",
        message
      );
    }
  };
  const handleInputEnter = () => {
    if (inputText !== "") {
      sendMessage({
        message_type: MessageType.FULL,
        interaction_type: InteractionType.USER_UTTERANCE,
        content_type: ContentType.TEXT,
        data: inputText,
      });
      setChatMessages((messages) => [
        ...messages,
        {
          type: "user",
          text: inputText,
        },
      ]);
      setInputText("");
    }
  };
  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      <View style={styles.mainContainer}>
        <View style={styles.characterChatContainer}>
          <View>
            <CharacterChatNavbar />
            <View style={styles.missionTxtContainer}>
              <Text
                style={[styles.defaultFontFamilyBold, styles.coffeeShopTxt]}
              >
                The girl in the coffee shop
              </Text>
              <Text style={[styles.defaultFontFamily, styles.missionTxt]}>
                World 1, Mission 1
              </Text>
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
          {chatMessages.map((message, index) => (
            <View key={index}>{renderChatMessage(message)}</View>
          ))}
        </ScrollView>
        <CharacterChatFooter
          enableRecording={enableRecording}
          isRecording={isRecording}
          speakStatus={speakStatus}
          invalidRecord={invalidRecord}
          setInvalidRecord={setInvalidRecord}
          sendingAudio={sendingAudio}
          startSpeaking={startSpeaking}
          setEnableRecording={setEnableRecording}
          onStopRecord={onStopRecord}
          setIsRecording={setIsRecording}
          handleStartRecord={handleStartRecord}
          setInputText={setInputText}
          handleInputEnter={handleInputEnter}
          inputText={inputText}
        />
      </View>
    </>
  );
};
export default CharacterChat;
