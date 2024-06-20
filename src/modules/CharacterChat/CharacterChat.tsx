import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
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
  LIGHT_BLACK_FADED_COLOR,
  MessageType,
  ORANGE_FADED_COLOR,
  UserMissionState,
  WEBSOCKET_URL,
} from "../../assets/constant";
import RNFS from "react-native-fs";
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from "react-native-audio-recorder-player";
import UserResponseContainer from "../../components/UserResponseContainer/UserResponseContainer";
import AssistantCorrection from "../../components/AssistantCorrection/AssistantCorrection";
import CharacterChatFooter from "../../components/CharacterChatFooter/CharacterChatFooter";
import Drawer from "react-native-drawer";
import AddAction from "../../components/AddAction/AddAction";
import StatusBarComp from "../../components/StatusBarComp/StatusBarComp";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetUserSettingsQuery } from "../../../redux/services/user_settings";
import { updateUserSettingsByType } from "../../../redux/slices/userSetingsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationInterface } from "../../intefaces/componentsInterfaces";
import {
  BooleanInterface,
  NullInterface,
  NumberInterface,
  StringInterface,
  chatMessagesInterface,
} from "../../intefaces/variablesInterfaces";

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.09);

const CharacterChat: React.FC<NavigationInterface> = ({
  navigation,
}): React.JSX.Element => {
  const [inputText, setInputText] = useState<StringInterface>("");
  const [isPlaying, setIsPlaying] = useState<BooleanInterface>(false);
  const [enableRecording, setEnableRecording] =
    useState<BooleanInterface>(false);
  const [isRecording, setIsRecording] = useState<BooleanInterface>(false);
  const [socketConnected, setSocketConnected] =
    useState<BooleanInterface>(false);
  const [sendingAudio, isSendingAudio] = useState<BooleanInterface>(false);
  const [speakStatus, setSpeakStatus] =
    useState<StringInterface>("Start speaking");
  const [duration, setDuration] = useState(0);
  const [invalidRecord, setInvalidRecord] = useState<BooleanInterface>(false);
  const [startSpeaking, setStartSpeaking] = useState<BooleanInterface>(false);
  const [WS, setWS] = React.useState<WebSocket | NullInterface>(null);
  const [chatState, setChatState] = React.useState("inactive");
  const [screenHeight, setScreenHeight] = useState<NumberInterface>(
    Dimensions.get("window").height
  );
  const [missionState, setMissionState] = React.useState(
    UserMissionState.INACTIVE
  );
  const [goals, setGoals] = React.useState([]);

  const [chatMessages, setChatMessages] = React.useState<
    chatMessagesInterface[]
  >([]);

  const user_mission = useSelector((state) => state.missionSlice.mission);
  const [getUserSettings, { data: userSettings, isLoading }] =
    useLazyGetUserSettingsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUserSettingsByType({ type: "isLoading", value: isLoading }));
  }, [isLoading]);

  const drawerRef = useRef<any>(null);
  const scrollViewRef = useRef<ScrollView | NullInterface>(null);

  const openDrawer = () => {
    drawerRef.current.open();
  };
  const closeDrawer = () => {
    drawerRef.current.close();
  };

  useEffect(() => {
    setChatMessages((messages) => [
      ...messages,
      {
        type: InteractionType.CHARACTER_UTTERANCE,
        isTyping: true,
        text: "",
      },
    ]);

    connectWebSocket();
    getUserSettings({ user_id: user_mission?.user_id });

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setScreenHeight(
          Dimensions.get("window").height - event.endCoordinates.height
        );
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setScreenHeight(Dimensions.get("window").height);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 0);
  }, [chatMessages, screenHeight, enableRecording]);

  useEffect(() => {
    if (socketConnected) {
      sendMessage({
        message_type: MessageType.FULL,
        interaction_type: InteractionType.COMMAND,
        content_type: ContentType.TEXT,
        data: Command.START,
      });
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

  const connectWebSocket = async () => {
    const token = await AsyncStorage.getItem("token");
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
      setSpeakStatus("Start speaking");
      handleServerMessage(event.data);
    };

    newWS.onclose = () => {
      isSendingAudio(false);
      console.log("WebSocket disconnected");
      setWS(null);
    };
  };

  const handleServerMessage = async (message: StringInterface) => {
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

  const handleMissionStatusMessage = (message) => {
    if (
      message.content_type === ContentType.JSON ||
      message.content_type === ContentType.TEXT
    ) {
      try {
        const missionStatusData = JSON.parse(message.data);

        setMissionState(missionStatusData.mission_state);
        setGoals(missionStatusData.goals || []);

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

  const renderChatMessage = (message: any) => {
    switch (message.type) {
      case "user-action":
        return <></>;
      case "user":
        return <UserResponseContainer message={message.text} />;
      case InteractionType.CHARACTER_UTTERANCE:
        return (
          <>
            <CharacterResponseContainer
              isTyping={message?.isTyping}
              message={message.text}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </>
        );
      case InteractionType.CHARACTER_ACTION:
      case InteractionType.USER_ACTION:
      case InteractionType.CHARACTER_NARRATION:
        return (
          <View>
            {message.text && (
              <FadedDividerText
                key={uuid.v4().toString()}
                idx={uuid.v4()}
                text={message.text}
                color={LIGHT_BLACK_FADED_COLOR}
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
            color={ORANGE_FADED_COLOR}
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

  const onStartRecord = async () => {
    setInvalidRecord(false);
    setSpeakStatus("Listening");
    setDuration(0);

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    try {
      const result = await audioRecorderPlayer.startRecorder(
        undefined,
        audioSet
      );

      console.log(result, "Recording started successfully");
    } catch (error) {
      console.error("Error starting recording:", error);
    }

    audioRecorderPlayer.addRecordBackListener((e) => {
      return;
    });
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

  const onStopRecord = async (sendAudioViaSocket: BooleanInterface) => {
    const result = await audioRecorderPlayer.stopRecorder();

    if (duration <= 1) {
      setIsRecording(false);
      return setInvalidRecord(true);
    } else if (sendAudioViaSocket) {
      setIsRecording(false);
      sendAudio(result);
    }
  };

  const sendAudio = (result: any) => {
    if (WS) {
      setSpeakStatus("Sending audio");
      try {
        RNFS.readFile(result, "base64")
          .then((data) => {
            sendMessage({
              message_type: MessageType.FULL,
              interaction_type: InteractionType.USER_UTTERANCE,
              content_type: ContentType.AUDIO,
              data: data,
              metadata: {
                file_extension: Platform.OS === "ios" ? "m4a" : "mp4",
              },
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (err) {
        console.log(err, "ERROR");
      }
    }
  };
  const sendMessage = async (message: any, metadata = {}) => {
    if (WS && WS.readyState === WebSocket.OPEN) {
      if (message.content_type === ContentType.AUDIO) isSendingAudio(true);
      try {
        let messageWithMetadata = {};
        if (
          Platform.OS === "ios" &&
          message?.content_type === ContentType.AUDIO
        ) {
          messageWithMetadata = {
            ...message,
            metadata: {
              ...metadata,
              user_mission_id: 1,
              user_id: 1,
              file_extension: "m4a",
            },
          };
        } else {
          messageWithMetadata = {
            ...message,
            metadata: {
              ...metadata,
              user_mission_id: 1,
              user_id: 1,
            },
          };
        }
        console.log(messageWithMetadata, "messageWithMetadata");
        await WS.send(JSON.stringify(messageWithMetadata));
        console.log("Message Sent");
      } catch (err) {
        console.log(err, "Error");
      }
    } else {
      console.error(
        "WebSocket is not connected. Cannot send message:",
        message
      );
    }
  };
  const handleInputEnter = () => {
    if (inputText !== "") {
      setChatMessages((messages) => [
        ...messages,
        {
          type: "user",
          text: inputText,
        },
      ]);
      sendMessage({
        content_type: ContentType.TEXT,
        data: inputText,
        interaction_type: InteractionType.USER_UTTERANCE,
        message_type: MessageType.FULL,
      });
      setInputText("");
    }
  };
  return (
    <Drawer
      ref={drawerRef}
      width={"100%"}
      type="overlay"
      content={
        <AddAction
          closeDrawer={closeDrawer}
          sendMessage={sendMessage}
          setChatMessages={setChatMessages}
        />
      }
      closedDrawerOffset={-3}
      tweenHandler={(ratio: any) => ({
        main: { opacity: (2 - ratio) / 2 },
      })}
    >
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      <SafeAreaView style={[styles.mainContainer]}>
        <View style={styles.characterChatContainer}>
          <View>
            <CharacterChatNavbar
              userSettings={{ ...userSettings }}
              navigation={navigation}
            />
          </View>
        </View>
        <ScrollView
          ref={scrollViewRef}
          style={[
            styles.characterChatContainerHeight,
            {
              maxHeight: screenHeight,
            },
          ]}
        >
          <View style={styles.missionTxtContainer}>
            <Text style={[styles.defaultFontFamilyBold, styles.coffeeShopTxt]}>
              {user_mission?.title}
            </Text>
            <Text style={[styles.defaultFontFamily, styles.missionTxt]}>
              World {user_mission?.index}, Mission {user_mission?.mission_index}
            </Text>
          </View>
          <View>
            {chatMessages.map((message, index) => (
              <View key={index}>{renderChatMessage(message)}</View>
            ))}
          </View>
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
          openDrawer={openDrawer}
        />
      </SafeAreaView>
    </Drawer>
  );
};
export default CharacterChat;
