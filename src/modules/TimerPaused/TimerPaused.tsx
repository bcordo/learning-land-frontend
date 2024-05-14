import React, { useState } from "react";
import { FlatList, Switch, Text, TouchableOpacity, View } from "react-native";
import StatusBarComp from "../../components/StatusBarComp/StatusBarComp";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSvgImageComponent from "../../components/CustomComponents/Image";
import Pause from "../../assets/icons/pause-btn.svg";
import Vector from "../../assets/icons/Vector.svg";
import Play from "../../assets/icons/play.svg";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { updatePauseTimmer } from "../../../redux/slices/timmerSlice";
import SettingsIcon from "../../assets/icons/settings-black.svg";
import AsteriskIcon from "../../assets/icons/asterisk.svg";
import LightBlubIcon from "../../assets/icons/light-bulb.svg";
import SpeakIcon from "../../assets/icons/speak-black.svg";
import Right from "../../assets/icons/Right.svg";
import TranslateIcon from "../../assets/icons/translate-black.svg";
import SelectDropdown from "react-native-select-dropdown";
import CustomSwitch from "../../components/CustomSwitch/CustomSwitch";

const TimerPaused = ({ navigation }): React.JSX.Element => {
  const dispatch = useDispatch();

  const optionsList = [
    { icon: SettingsIcon, title: "Settings" },
    {
      icon: TranslateIcon,
      title: "Set Difficulty",
      subTitle: "Choose difficulty of character",
      type: "select",
    },
    {
      icon: TranslateIcon,
      title: "Show translations",
      subTitle: "Automatically translate each response",
      type: "switch",
    },
    {
      icon: LightBlubIcon,
      title: "Show hints",
      subTitle: "Show hints before you respond",
      type: "switch",
    },
    {
      icon: SpeakIcon,
      title: "Slow audio",
      subTitle: "Have the character speak slowly",
      type: "switch",
    },
    {
      icon: AsteriskIcon,
      title: "Show corrections",
      subTitle: "Automatically show corrections to mistakes",
      type: "switch",
    },
    {
      icon: AsteriskIcon,
      title: "Default to Audio Input",
      subTitle: "Use audio as the default input",
      type: "switch",
    },
  ];
  const dropdownList = [
    { title: "Easy", isSelected: true },
    { title: "Medium", isSelected: false },
    { title: "Hard", isSelected: false },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.optionContainer}>
        <View style={styles.optionBox}>
          <CustomSvgImageComponent
            width={20}
            height={20}
            Component={item.icon}
          />
          <View>
            <Text style={[styles.optionTitle, styles.defaultFontFamilyBold]}>
              {item.title}
            </Text>
            {item?.subTitle ? (
              <Text style={[styles.optionSubTitle, styles.defaultFontFamily]}>
                {" "}
                {item.title}
              </Text>
            ) : null}
          </View>
        </View>
        {item.type === "switch" ? (
          <CustomSwitch
            trackColor={{ false: "#F58C39", true: "#F58C39" }}
            thumbColor={"#fff"}
            ios_backgroundColor={"#F58C39"}
            style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
          />
        ) : null}
        {item.type === "select" ? (
          <SelectDropdown
            defaultValue={"Easy"}
            data={dropdownList}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <View style={styles.dropdownButtonStyle2}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) || "Select "}
                    </Text>
                  </View>
                  <CustomSvgImageComponent
                    width={16}
                    height={16}
                    Component={Right}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        ) : null}
      </View>
    );
  };
  return (
    <View>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      <SafeAreaView style={styles.container}>
        <View style={styles.timerContainer}>
          <CustomSvgImageComponent width={76} height={76} Component={Pause} />
          <Text style={[styles.timerPausedTxt, styles.defaultFontFamilyBold]}>
            Timer Paused
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonBox} onPress={() => {}}>
              <CustomSvgImageComponent
                width={27}
                height={27}
                Component={Vector}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonBox}
              onPress={() => {
                dispatch(updatePauseTimmer(false));
                navigation.navigate("CharacterChat");
              }}
            >
              <CustomSvgImageComponent
                width={40}
                height={40}
                Component={Play}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <FlatList data={optionsList} renderItem={renderItem} />
        </View>
      </SafeAreaView>
    </View>
  );
};
export default TimerPaused;
