import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ProfileContainer from "../ProfileContainer/ProfileContainer";
import { styles } from "./styles";
import uuid from "react-native-uuid";
import Tts from "react-native-tts";
import Translate from "../../assets/icons/translate.svg";
import Speak from "../../assets/icons/speak.svg";
import Dots from "../../assets/icons/dots-horizontal.svg";
import CustomSvgImageComponent from "../CustomComponents/Image";
import { BASE_URL, Language } from "../../assets/constant";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import CustomShimmer from "../CustomShimmer/CustomShimmer";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { decode } from "base-64";

interface CharacterResponseContainerProps {
  quoteText?: string;
  isTyping?: boolean;
  profileIconContainerStyle?: object;
  message?: string;
}
const CharacterResponseContainer: React.FC<CharacterResponseContainerProps> = ({
  quoteText,
  isTyping,
  profileIconContainerStyle,
  message,
}): React.JSX.Element => {
  const [isTranslateEnabled, setIsTranslateEnabled] = useState<boolean>(false);
  const [translatedText, setTranslatedText] = useState<string>("");

  const audioRecorderPlayer = new AudioRecorderPlayer();

  useEffect(() => {
    if (!translatedText) return;
    setIsTranslateEnabled(false);
  }, [translatedText, isTranslateEnabled]);

  const menuList = [
    { icon: require("../../assets/icons/thought.png"), value: "See thoughts" },
    {
      icon: require("../../assets/icons/bookmark.png"),
      value: "Add to core phrases",
    },
    { icon: require("../../assets/icons/cycle.png"), value: "Regenerate " },
    {
      icon: require("../../assets/icons/thumb-up.png"),
      value: "Good response ",
    },
    {
      icon: require("../../assets/icons/thumb-down.png"),
      value: "Bad response",
    },
  ];

  const decodeBase64Audio = async (base64String) => {
    try {
      const base64Data = base64String.replace(/^data:audio\/mpeg;base64,/, "");

      const binaryData = decode(base64Data);

      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const byteArray = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
      const audioURI = URL.createObjectURL(blob);

      return await audioRecorderPlayer.startPlayer(audioURI);
    } catch (err) {
      console.log(err);
    }
  };

  const speakText = async (text: string) => {
    try {
      const response = await fetch(
        `https://desolate-anchorage-97861-39db3837351f.herokuapp.com/api/v1/utils/text_to_speech/?text=${encodeURIComponent(
          text
        )}&voice=alloy`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const audioBlob = await response.blob();

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          decodeBase64Audio(reader.result);

          const base64Data = reader.result.split(",")[1];
        };
      } else {
        console.error("Text-to-speech error:", response.status);
      }
    } catch (error) {
      console.error("Text-to-speech error:", error);
    }
    // Tts.stop();
    // Tts.speak(text)
    //   .then(() => console.log("Text spoken successfully"))
    //   .catch((error: any) => console.error("Error occurred:", error));
  };

  const handleTranslateClick = async (message: string) => {
    try {
      console.log(message, "message");
      setIsTranslateEnabled(true);
      const response = await fetch(
        `${BASE_URL}/api/v1/utils/translate?foreign_text=${encodeURIComponent(
          message
        )}&target_lang=${Language.AMERICAN_ENGLISH}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const translation = data.text;
      setTranslatedText(translation);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  const renderItem = (item, i) => {
    return (
      <View
        key={uuid.v4().toString()}
        style={[
          styles.menuListItem,
          {
            borderBottomWidth: i !== menuList.length - 1 ? 1 : 0,
          },
        ]}
      >
        <Image source={item.icon} />
        <Text style={styles.defaultFontFamily}>{item.value}</Text>
      </View>
    );
  };

  return (
    <>
      <View
        style={[
          styles.aiTyping,
          profileIconContainerStyle ? profileIconContainerStyle : null,
        ]}
      >
        <View style={[styles.profileIconContainer]}>
          <Image
            style={styles.profileIcon}
            source={require("../../assets/icons/profileAvatar.png")}
          />

          <Text style={[styles.defaultFontFamily, styles.estherText]}>
            Esther
          </Text>
        </View>
      </View>

      {isTyping ? (
        <ProfileContainer isTyping={isTyping} />
      ) : message ? (
        <View style={styles.characterResponseContainer}>
          <Text
            style={[styles.defaultFontFamily, styles.characterResponseText]}
          >
            {message}
          </Text>
          <View style={styles.translateContainer}>
            <View style={styles.translateRightContainer}>
              <TouchableOpacity onPress={() => speakText(message)}>
                <CustomSvgImageComponent
                  width={18}
                  height={18}
                  Component={Speak}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTranslateClick(message)}>
                <CustomSvgImageComponent
                  width={18}
                  height={18}
                  Component={Translate}
                />
              </TouchableOpacity>
            </View>

            <CustomDropdown
              list={menuList}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownTxtContainer}>
                    <CustomSvgImageComponent
                      width={20}
                      height={20}
                      Component={Dots}
                    />
                  </View>
                );
              }}
              renderItem={renderItem}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </View>

          {isTranslateEnabled || translatedText ? (
            <>
              <View style={styles.divider}></View>
              {translatedText ? (
                <Text
                  style={[
                    styles.defaultFontFamily,
                    styles.translationText,
                    quoteText ? styles.quotedText : null,
                  ]}
                >
                  {translatedText}
                </Text>
              ) : (
                <>
                  <CustomShimmer
                    styleProps={{
                      width: "80%",
                      height: 10,
                      backgroundColor: "#9e9e9e",
                    }}
                  />
                  <CustomShimmer
                    styleProps={{
                      width: "50%",
                      height: 10,
                      backgroundColor: "#9e9e9e",
                      marginTop: 6,
                    }}
                  />
                </>
              )}
            </>
          ) : (
            ""
          )}
        </View>
      ) : (
        ""
      )}
    </>
  );
};

export default CharacterResponseContainer;
