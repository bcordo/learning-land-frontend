import React, { useState } from "react";
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

interface CharacterResponseContainerProps {
  commentTexts?: string;
  quoteText?: string;
  isTyping?: boolean;
  profileIconContainerStyle?: object;
  message?: string;
  thought?: string;
}
const CharacterResponseContainer: React.FC<CharacterResponseContainerProps> = ({
  commentTexts,
  quoteText,
  isTyping,
  profileIconContainerStyle,
  message,
  thought,
}): React.JSX.Element => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [translatedText, setTranslatedText] = useState<string>("");
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
  const speakText = (text: string) => {
    Tts.stop();
    Tts.speak(text)
      .then(() => console.log("Text spoken successfully"))
      .catch((error) => console.error("Error occurred:", error));
  };

  const handleTranslateClick = async (message: string) => {
    try {
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
        <View style={styles.shadowTopLeft}>
          <View style={styles.shadowBottomRight}>
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
                  <TouchableOpacity
                    onPress={() => handleTranslateClick(message)}
                  >
                    <CustomSvgImageComponent
                      width={18}
                      height={18}
                      Component={Translate}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => setOpenMenu(true)}
                    style={styles.menuContainer}
                  >
                    <CustomSvgImageComponent
                      width={20}
                      height={20}
                      Component={Dots}
                    />
                    <View
                      style={[
                        styles.menu,
                        { display: openMenu ? "flex" : "none" },
                      ]}
                    >
                      {menuList.map((item, index) => (
                        <View
                          key={uuid.v4().toString()}
                          style={[
                            styles.menuListItem,
                            {
                              borderBottomWidth:
                                index !== menuList.length - 1 ? 1 : 0,
                            },
                          ]}
                        >
                          <Image source={item.icon} />
                          <Text style={styles.defaultFontFamily}>
                            {item.value}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {/* {commentTexts || quoteText || thought ? (
            <>
              <View style={styles.divider}></View>
              <Text
                style={[
                  styles.translationText,
                  quoteText ? styles.quotedText : null,
                ]}
              >
                {commentTexts || thought || `"${quoteText}"`}
              </Text>
            </>
          ) : (
            ""
          )} */}
              {translatedText ? (
                <>
                  <View style={styles.divider}></View>
                  <Text
                    style={[
                      styles.defaultFontFamily,
                      styles.translationText,
                      quoteText ? styles.quotedText : null,
                    ]}
                  >
                    {translatedText}
                  </Text>
                </>
              ) : (
                ""
              )}
            </View>
          </View>
        </View>
      ) : (
        ""
      )}
    </>
  );
};

export default CharacterResponseContainer;
