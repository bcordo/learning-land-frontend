import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
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
import TranslateIcon from "../../assets/icons/translate-black.svg";

const TimerPaused = ({ navigation }): React.JSX.Element => {
  const dispatch = useDispatch();

  const optionsList = [
    { icon: SettingsIcon, title: "Settings" },
    {
      icon: TranslateIcon,
      title: "Set Difficulty",
      subTitle: "Choose difficulty of character",
    },
    {
      icon: TranslateIcon,
      title: "Show translations",
      subTitle: "Automatically translate each response",
    },
    {
      icon: LightBlubIcon,
      title: "Show hints",
      subTitle: "Show hints before you respond",
    },
    {
      icon: SpeakIcon,
      title: "Slow audio",
      subTitle: "Have the character speak slowly",
    },
    {
      icon: AsteriskIcon,
      title: "Show corrections",
      subTitle: "Automatically show corrections to mistakes",
    },
    {
      icon: AsteriskIcon,
      title: "Default to Audio Input",
      subTitle: "Use audio as the default input",
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <View style={styles.optionBox}>
        <CustomSvgImageComponent width={20} height={20} Component={item.icon} />
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
