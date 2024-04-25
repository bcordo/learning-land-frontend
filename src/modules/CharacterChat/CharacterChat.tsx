import React, { useEffect, useState } from "react";
import {
  Alert,
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
import Voice from "@react-native-voice/voice";
import uuid from "react-native-uuid";
import { WEBSOCKET_URL } from "../../assets/constant";
import StatusBarComp from "../../components/StatusBarComp/StatusBarComp";

const CharacterChat = (): React.JSX.Element => {
  type arrayString = string[];
  const [inputText, setInputText] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [boatResponse, setBoatResponse] = useState<string>("");
  const [botHint, setbotHint] = useState<arrayString>([]);
  const [botCorrection, setbotCorrection] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setBoatResponse(boatResponse + responseMessage);
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

    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechEnd = stopRecording;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    try {
      await Voice.start("en-US");
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      Alert.alert("Error", "Failed to start recording");
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      Alert.alert("Error", "Failed to stop recording");
    }
  };

  const onSpeechResults = (event: any) => {
    setInputText(inputText + " " + event.value[0]);
  };

  const onSpeechError = (event: any) => {
    Alert.alert("Error", "Speech recognition error");
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
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

      <ScrollView style={styles.characterChatContainerHeight}>
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
                <Image source={require("../../assets/icons/gray_stars.png")} />
                <View>
                  <Text style={styles.trySayingInstedTxt}>{botCorrection}</Text>
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
            </View>
          ) : (
            ""
          )}
        </View>
      </ScrollView>
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
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Image source={require("../../assets/icons/microphone.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CharacterChat;
