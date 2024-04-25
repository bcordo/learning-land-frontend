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
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVModeIOSOption,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from "react-native-audio-recorder-player";
import RNFS from "react-native-fs";

const CharacterChat = (): React.JSX.Element => {
  type arrayString = string[];
  const [inputText, setInputText] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [boatResponse, setBoatResponse] = useState<string>("");
  const [botHint, setbotHint] = useState<arrayString>([]);
  const [botCorrection, setbotCorrection] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [enableRecording, setEnableRecording] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioPath, setAudioPath] = useState("");

  const audioRecorderPlayer = new AudioRecorderPlayer();

  const scrollViewRef = useRef<ScrollView>();
  useEffect(() => {
    setBoatResponse(boatResponse + responseMessage);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [responseMessage]);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "chunk") {
          if (message?.data === "</END>" || message?.data == "</START>") return;
          setIsTyping(false);

          setResponseMessage(message.data);
        } else if (message.type === "full") {
          if (message.interaction_type === "assistant_hint") {
            const hint = JSON.parse(message.data);
            setTimeout(() => {
              setbotHint([...botHint, hint.utterance]);
            }, 700);
          }
          if (message.interaction_type === "assistant_correction") {
            const hint = JSON.parse(message.data);
            setTimeout(
              () => {
                setbotCorrection(hint.utterance);
              },
              botHint ? 1200 : 700
            );
          }
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws) ws.close();
    };
  }, [ws]);

  useEffect(() => {
    const handleStartChat = () => {
      const newWs = new WebSocket(WEBSOCKET_URL);
      setWs(newWs);
      setIsTyping(true);
      newWs.onopen = () =>
        newWs.send(JSON.stringify({ type: "command", data: "</START>" }));
    };
    handleStartChat();
  }, []);

  const options = {
    sampleRate: 16000, // Sample rate for audio recording (Hz)
    channels: 1, // Number of audio channels (1 for mono, 2 for stereo)
    bitsPerSample: 16, // Number of bits per sample
    audioSource: 6, // AudioSource: 6 for voice recognition (Android only)
    waveFile: "test.wav",
  };

  const generateAudioName = () => {
    // Come up with a funky way to generate a name here!
    const timestamp = new Date().getTime();

    // Generate a random string of alphanumeric characters
    const randomString = Math.random().toString(36).substring(7);

    // Combine timestamp and random string to create a unique name
    const audioName = `audio_${timestamp}_${randomString}`;

    return audioName;
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
