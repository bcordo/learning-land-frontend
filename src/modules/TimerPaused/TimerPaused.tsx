import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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
import CustomSwitch from "../../components/CustomSwitch/CustomSwitch";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import { useLazyGetUserSettingsQuery } from "../../../redux/services/user_settings";

interface TimerPausedProps {
  navigation: any;
}

const TimerPaused: React.FC<TimerPausedProps> = ({
  navigation,
}): React.JSX.Element => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const [difficultyLevel, setDifficultyLevel] = useState<string>("Easy");

  const [getUserSettings, { data: userSettings, isLoading }] =
    useLazyGetUserSettingsQuery();

  useEffect(() => {
    getUserSettings(14);
  }, []);

  interface ListItem {
    icon: any;
    title: string;
    subTitle?: string;
    type?: string;
    name: string;
  }

  const optionsList: ListItem[] = [
    { icon: SettingsIcon, title: "Settings", name: "" },
    {
      icon: TranslateIcon,
      title: "Set Difficulty",
      subTitle: "Choose difficulty of character",
      type: "select",
      name: "mission_difficulty",
    },
    {
      icon: TranslateIcon,
      title: "Show translations",
      subTitle: "Automatically translate each response",
      type: "switch",
      name: "show_translation",
    },
    {
      icon: LightBlubIcon,
      title: "Show hints",
      subTitle: "Show hints before you respond",
      type: "switch",
      name: "show_hints",
    },
    {
      icon: SpeakIcon,
      title: "Slow audio",
      subTitle: "Have the character speak slowly",
      type: "switch",
      name: "slow_audio",
    },
    {
      icon: AsteriskIcon,
      title: "Show corrections",
      subTitle: "Automatically show corrections to mistakes",
      type: "switch",
      name: "show_corrections",
    },
    {
      icon: AsteriskIcon,
      title: "Default to Audio Input",
      subTitle: "Use audio as the default input",
      type: "switch",
      name: "default_audio_input",
    },
  ];
  const dropdownList = [
    { title: "Easy", value: "easy" },
    { title: "Medium", value: "medium" },
    { title: "Hard", value: "hard" },
  ];
  const renderDropdownItem = (
    item: { title?: string },
    index: number | undefined,
    isSelected: boolean | undefined
  ) => {
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
  };
  const renderItem = ({ item }: { item: ListItem }) => {
    return (
      <View style={styles.optionContainer}>
        <View style={styles.optionBox}>
          <CustomSvgImageComponent
            width={20}
            height={20}
            Component={item.icon}
          />
          <View>
            <Text
              style={[
                item?.type
                  ? styles.defaultFontFamilySemiBold
                  : styles.defaultFontFamilyBold,
                {
                  fontSize: item.type ? 14 : 16,
                  color: item.type ? "#262626" : "#404040",
                },
              ]}
            >
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
            trackColor={{ false: "#fff", true: "#F58C39" }}
            thumbColor={"#fff"}
            value={userSettings ? userSettings[item.name] : false}
            style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
          />
        ) : null}
        {item.type === "select" ? (
          <CustomDropdown
            onSelect={(selectedItem: { title: string }) => {
              setDifficultyLevel(selectedItem.title);
            }}
            setDifficultyLevel={setDifficultyLevel}
            list={dropdownList}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <View style={styles.dropdownButtonStyle2}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {userSettings ? userSettings[item.name] : "Select"}
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
            renderItem={renderDropdownItem}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        ) : null}
      </View>
    );
  };
  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      <SafeAreaView style={styles.container}>
        <View style={styles.timerContainer}>
          <CustomSvgImageComponent width={76} height={76} Component={Pause} />
          <View style={styles.timerPausedTxtContainer}>
            <Text style={[styles.timerPausedTxt, styles.defaultFontFamilyBold]}>
              Timer Paused
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonBoxtxt}>
              <TouchableOpacity
                style={styles.buttonBox}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <CustomSvgImageComponent
                  width={27}
                  height={27}
                  Component={Vector}
                />
              </TouchableOpacity>
              <Text style={[styles.defaultFontFamily, styles.stoptxt]}>
                stop
              </Text>
            </View>
            <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalBackground}>
                  <TouchableWithoutFeedback>
                    <View style={styles.modalView}>
                      <Text
                        style={[
                          styles.modalText,
                          styles.defaultFontFamilySemiBold,
                        ]}
                      >
                        Are you sure you want to exit the mission ?
                      </Text>
                      <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("MissionEnd");

                            setModalVisible(false);
                          }}
                          style={styles.modalConfirmButton}
                        >
                          <Text
                            style={[
                              styles.getStartedButtonTextCancel,
                              styles.defaultFontFamilySemiBold,
                            ]}
                          >
                            Confirm
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setModalVisible(false)}
                          style={styles.modalConfirmButtonCancel}
                        >
                          <Text
                            style={[
                              styles.getStartedButtonTextCancel,
                              styles.defaultFontFamilySemiBold,
                            ]}
                          >
                            Cancel
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <View style={styles.buttonBoxtxt}>
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
              <Text style={[styles.defaultFontFamily, styles.stoptxt]}>
                resume
              </Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <FlatList data={optionsList} renderItem={renderItem} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default TimerPaused;
