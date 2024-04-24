import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ProfileContainer from "../ProfileContainer/ProfileContainer";
import { styles } from "./styles";

interface CharacterResponseContainerProps {
  commentTexts?: string;
  quoteText?: string;
  isTyping?: boolean;
  profileIconContainerStyle?: object;
  message?: string;
}
const CharacterResponseContainer: React.FC<CharacterResponseContainerProps> = ({
  commentTexts,
  quoteText,
  isTyping,
  profileIconContainerStyle,
  message,
}): React.JSX.Element => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuList = [
    { icon: require("../../assets/icons/thought.png"), value: "See thoughts" },
    {
      icon: require("../../assets/icons/bookmark.png"),
      value: "SAdd to core phrases",
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
          <Text style={styles.estherText}>Esther</Text>
        </View>
      </View>
      {isTyping ? (
        <ProfileContainer isTyping={isTyping} />
      ) : message ? (
        <View style={styles.characterResponseContainer}>
          <Text style={styles.characterResponseText}>{message}</Text>
          <View style={styles.translateContainer}>
            <View style={styles.translateRightContainer}>
              <Image source={require("../../assets/icons/speak.png")} />
              <Image source={require("../../assets/icons/translate.png")} />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setOpenMenu(true)}
                style={styles.menuContainer}
              >
                <Image
                  source={require("../../assets/icons/dots-horizontal.png")}
                />
                {/* <View  style={[styles.menu,{display:openMenu?'flex':'none'}]}>
      {menuList.map(item => (
        <View key={item.value} style={styles.menuListItem}> 
          <Image source={item.icon} />
          <Text style={styles.menuText}>{item.value}</Text>
        </View>
      ))}
    </View> */}
              </TouchableOpacity>
            </View>
          </View>
          {commentTexts || quoteText ? (
            <>
              <View style={styles.divider}></View>
              <Text
                style={[
                  styles.translationText,
                  quoteText ? styles.quotedText : null,
                ]}
              >
                {commentTexts || `"${quoteText}"`}
              </Text>
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
