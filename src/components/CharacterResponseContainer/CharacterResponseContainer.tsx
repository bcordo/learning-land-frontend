import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ProfileContainer from "../ProfileContainer/ProfileContainer";
import { styles } from "./styles";
import uuid from "react-native-uuid";
import Translate from "../../assets/icons/translate.svg";
import Speak from "../../assets/icons/speak.svg";
import Dots from "../../assets/icons/dots-horizontal.svg";
import CustomSvgImageComponent from "../CustomComponents/Image";
import { BASE_URL, Language } from "../../assets/constant";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import CustomShimmer from "../CustomShimmer/CustomShimmer";
import { CharacterResponseContainerProps } from "../../intefaces/componentsInterfaces";
import { AudioPlayerContext } from "../../customHooks/AudioPlayerContext";

const CharacterResponseContainer: React.FC<CharacterResponseContainerProps> = ({
  quoteText,
  isTyping,
  profileIconContainerStyle,
  message,
  currentRoute,
}): React.JSX.Element => {
  const audioPlayerContext = useContext(AudioPlayerContext);
  const [isTranslateEnabled, setIsTranslateEnabled] = useState<boolean>(false);
  const [translatedText, setTranslatedText] = useState<string>("");
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

  const handleTranslateClick = async (message: string) => {
    try {
      setIsTranslateEnabled(true);
      const response = await fetch(
        `${BASE_URL}/api/v1/utils/translate?foreign_text=${encodeURIComponent(
          message
        )}&target_lang=${Language.AMERICAN_ENGLISH}`
      );
      if (!response.ok) {
        setIsTranslateEnabled(false);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const translation = data.text;
      setTranslatedText(translation);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  const renderItem = (item: { icon: any; value: string }, i: number) => {
    return (
      <View
        key={uuid.v4().toString()}
        style={[
          styles.menuListItem,
          {
            borderBottomWidth: i !== menuList.length - 1 ? 1 : 0,
            borderTopWidth: i === 0 ? 1 : 0,
            borderTopLeftRadius: i === 0 ? 10 : 0,
            borderTopRightRadius: i === 0 ? 10 : 0,
            borderBottomLeftRadius: i === menuList.length - 1 ? 10 : 0,
            borderBottomRightRadius: i === menuList.length - 1 ? 10 : 0,
          },
        ]}
      >
        <Image source={item.icon} />
        <Text style={[styles.defaultFontFamily, styles.menuListText]}>
          {item.value}
        </Text>
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
              <TouchableOpacity
                onPress={() =>
                  audioPlayerContext?.speakText(message, currentRoute)
                }
                disabled={audioPlayerContext?.isPlaying}
              >
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
