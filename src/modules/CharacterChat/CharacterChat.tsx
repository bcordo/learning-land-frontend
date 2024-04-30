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
import LottieView from "lottie-react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import RNFS from "react-native-fs";
import { PermissionsAndroid } from "react-native";
import UserResponseContainer from "../../components/UserResponseContainer/UserResponseContainer";
import FadedDivider from "../../components/FadedDivider/FadedDivider";
// import EllipseIcon from "../../assets/icons/EllipseCircle.svg";

const audioRecorderPlayer = new AudioRecorderPlayer();

const CharacterChat = (): React.JSX.Element => {
  interface chatMessagesInterface {
    type: string;
    text: string;
    action?: string;
    emotion?: string;
    thought?: string;
  }

  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [enableRecording, setEnableRecording] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [recordPath, setRecordPath] = useState("");

  const [WS, setWS] = React.useState<WebSocket | null>(null);

  const [chatMessages, setChatMessages] = React.useState<
    chatMessagesInterface[]
  >([]);
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
      setIsTyping(false);
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

      setChatMessages([{ type: "state", text: "Mission started" }]);
    }
  }, [socketConnected]);

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
      setChatMessages((messages) => [
        ...messages,
        {
          type: "user",
          text: message.data,
        },
      ]);
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
          const updatedText = lastMessage.text + " " + message.data;

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
        let lastIndex = -1;
        for (let i = prevMessages.length - 1; i >= 0; i--) {
          if (prevMessages[i].type === "character-utterance") {
            lastIndex = i;
            break;
          }
        }

        if (lastIndex !== -1) {
          const updatedMessages = [...prevMessages];
          updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            thought: response.thought,
          };
          return [
            ...updatedMessages,
            {
              type: "character-response",
              text: response.utterance,
              action: response.action,
              emotion: response.emotion,
              thought: response.thought,
            },
          ];
        } else {
          return [
            ...prevMessages,
            {
              type: "character-response",
              text: response.utterance,
              action: response.action,
              emotion: response.emotion,
              thought: response.thought,
            },
          ];
        }
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

        setMissionState(missionStatusData.mission_state);
        setGoals(missionStatusData.goals || []);

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
        return (
          <></>
          // <View key={message.id}>
          //   <Text>Action: {message.text}</Text>
          // </View>
        );
      case "user":
        return (
          <UserResponseContainer message={message.text} />
          // <View key={message.id}>
          //   <Text>{message.text}</Text>
          // </View>
        );
      case "character-utterance":
        return (
          <>
            <CharacterResponseContainer
              isTyping={isTyping}
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
            {/* {message.emotion && <Text>Emotion: {message.emotion}</Text>} */}
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
        return (
          // <View key={message.id}>
          //   <Text>Assistant Correction: {message.text}</Text>
          // </View>
          <>
            <FadedDivider
              style={{ marginVertical: 11 }}
              color={[
                "rgba(255, 255, 255, 0)",
                "rgba(0, 0, 0, 0.5)",
                "rgba(255, 255, 255, 0)",
              ]}
            />
            <View style={styles.trySayingInstedContainer}>
              <Image source={require("../../assets/icons/gray_stars.png")} />
              <View>
                <Text style={styles.trySayingInstedTxt}>{message.text}</Text>
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
                <Text style={styles.characterChatButtonTxt}>Explain to me</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.characterChatButtons}
                onPress={() => {}}
              >
                <Image source={require("../../assets/icons/bookmark.png")} />
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
          </>
        );
      case "state":
        return (
          <></>
          // <View key={message.id}>
          //   <Text>{message.text}</Text>
          // </View>
        );
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
    connectWebSocket();
  }, []);

  const onStartRecord = async () => {
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
      setIsRecording(true);
    }
  };

  const onStopRecord = async (sendAudioViaSocket: boolean) => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setIsRecording(false);
    if (sendAudioViaSocket) {
      sendAudio();
    }
  };

  const sendAudio = () => {
    if (WS) {
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
      setIsTyping(true);
      WS.send(JSON.stringify(message));
    } else {
      console.error(
        "WebSocket is not connected. Cannot send message:",
        message
      );
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
          {chatMessages.map((message, index) => (
            <View key={index}>{renderChatMessage(message)}</View>
          ))}
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
                    {/* <EllipseIcon /> */}
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
              <TouchableOpacity
                style={styles.plusButton}
                onPress={
                  isRecording
                    ? () => {
                        onStopRecord(false);
                        setEnableRecording(false);
                      }
                    : () => {}
                }
              >
                {isRecording ? (
                  <Image source={require("../../assets/icons/x.png")} />
                ) : (
                  <Image source={require("../../assets/icons/plus.png")} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.startRecordButton}
                onPress={isRecording ? () => onStopRecord(true) : onStartRecord}
              >
                {isRecording ? (
                  <Image
                    style={styles.startRecordIcon}
                    source={require("../../assets/icons/arrow-up.png")}
                  />
                ) : (
                  <Image
                    style={styles.startRecordIcon}
                    source={require("../../assets/icons/microphone.png")}
                  />
                )}
              </TouchableOpacity>
              {isRecording ? (
                <TouchableOpacity style={styles.emptyBtn}></TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.plusButton}
                  onPress={() => {
                    setEnableRecording(false);
                  }}
                >
                  <Image source={require("../../assets/icons/keyboard.png")} />
                </TouchableOpacity>
              )}
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
