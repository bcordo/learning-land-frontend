import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { useDispatch, useSelector } from "react-redux";
import { updatePauseTimmer } from "../../../redux/slices/timmerSlice";
import SettingsIcon from "../../assets/icons/settings-black.svg";
import AsteriskIcon from "../../assets/icons/asterisk.svg";
import LightBlubIcon from "../../assets/icons/light-bulb.svg";
import SpeakIcon from "../../assets/icons/speak-black.svg";
import Right from "../../assets/icons/Right.svg";
import TranslateIcon from "../../assets/icons/translate-black.svg";
import CustomSwitch from "../../components/CustomSwitch/CustomSwitch";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import {
  useLazyGetUserSettingsQuery,
  useUpdateUserSettingsMutation,
} from "../../../redux/services/user_settings";
import {
  updateUserSettings,
  updateUserSettingsByType,
} from "../../../redux/slices/userSetingsSlice";
import CustomShimmer from "../../components/CustomShimmer/CustomShimmer";
import { NavigationInterface } from "../../intefaces/componentsInterfaces";
import { ListItem } from "../../intefaces/variablesInterfaces";
import DownArrowIcon from "../../assets/icons/MySvgComponents/DownArrowIcon";
import { AudioPlayerContext } from "../../customHooks/AudioPlayerContext";
import { useWebSocket } from "../../customHooks/WebSocketContext";
import Toast from "react-native-toast-message";

const TimerPaused: React.FC<NavigationInterface> = ({
  navigation,
}): React.JSX.Element => {
  const dispatch = useDispatch();
  const audioPlayerContext = useContext(AudioPlayerContext);
  const { disconnectWebSocket, WS, handleError } = useWebSocket();
  const [modalVisible, setModalVisible] = useState(false);
  const [getUserSettings, { data: userSettingsData }] =
    useLazyGetUserSettingsQuery();
  const user_mission = useSelector((state) => state?.missionSlice?.mission);
  const userSettings: any = useSelector(
    (state: { userSettingsSlice: {} }) => state.userSettingsSlice
  );
  const [updateUserSettingsAPI, { isLoading: settingsLoader }] =
    useUpdateUserSettingsMutation();
  const onCancelModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    if (userSettingsData) {
      dispatch(updateUserSettings(userSettingsData));
    }
  }, [userSettingsData]);

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
    { title: "EASY", value: "easy" },
    { title: "MEDIUM", value: "medium" },
    { title: "HARD", value: "hard" },
  ];
  const colorMap: any = {
    EASY: { ...styles.easyOptionColor, svgColor: "#7DDFDE" },
    MEDIUM: { ...styles.mediumOptionColor, svgColor: "#ec9046" },
    HARD: { ...styles.hardOptionColor, svgColor: "#FF8B67" },
  };
  const onHandleResume = () => {
    if (WS) {
      dispatch(updatePauseTimmer(false));
      navigation.navigate("CharacterChat");
    } else {
      dispatch(updatePauseTimmer(false));
      navigation.navigate("MissionStart");
      handleError(true);
    }
  };
  const handleSettingError = () => {
    try {
      throw new Error("Simulated error");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Setting not updated.",
        text2: "Please try again later.",
        position: "top",
      });
    }
  };
  const onHandleSwitchChange = async (item?: any) => {
    try {
      dispatch(
        updateUserSettingsByType({
          type: item.name,
          value: !userSettings?.[item.name],
        })
      );
      const res = await updateUserSettingsAPI({
        user_id: userSettings.user_id,
        body: {
          ...userSettings,
          [item.name]: !userSettings[item.name],
        },
      });
      if (!res?.data) {
        handleSettingError();
        getUserSettings({ user_id: user_mission?.user_id });
        // dispatch(updateUserSettings(res?.data));
        // dispatch(updateUserSettingsByType({type:item.name,value:res?.data?.[item.name]}))
      }
    } catch (err) {
      console.log("getting error from onValueChange CustomSwitch " + err);
    }
  };
  const onHandleSelectChange = async (selectedItem?: any, item?: any) => {
    try {
      dispatch(
        updateUserSettingsByType({
          type: item.name,
          value: selectedItem?.title,
        })
      );
      if (userSettings?.mission_difficulty !== selectedItem?.title) {
        const res = await updateUserSettingsAPI({
          user_id: userSettings?.user_id,
          body: {
            ...userSettings,
            [item.name]: selectedItem?.title,
          },
        });
        if (!res?.data) {
          handleSettingError();
          getUserSettings({ user_id: user_mission?.user_id });
          // dispatch(updateUserSettings(res?.data));
          // dispatch(updateUserSettingsByType({type:item.name,value:res?.data?.[item.name]}))
        }
      }
    } catch (err) {
      console.log("getting error from onValueChange CustomSwitch " + err);
    }
  };
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
        <Text style={[styles.defaultFontFamily, styles.dropdownItemTxtStyle]}>
          {item.title}
        </Text>
      </View>
    );
  };
  const renderItem = ({ item }: { item: ListItem }) => {
    return (
      <View style={styles.optionContainer} key={item?.title}>
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
                {item.subTitle}
              </Text>
            ) : null}
          </View>
        </View>
        {item.type === "switch" ? (
          <CustomSwitch
            trackColor={{ false: "#fff", true: "#F58C39" }}
            thumbColor={"#fff"}
            value={userSettings ? userSettings[item.name] : false}
            style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
            name={item.name}
            // disabled={settingsLoader}
            onValueChange={() => {
              onHandleSwitchChange(item);
            }}
          />
        ) : null}
        {item.type === "select" ? (
          <CustomDropdown
            // disabled={settingsLoader}
            onSelect={async (selectedItem: { title: string }) => {
              onHandleSelectChange(selectedItem, item);
            }}
            list={dropdownList}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={[styles.dropdownButtonStyle]}>
                  <View
                    style={[
                      styles.dropdownButtonStyle2,
                      colorMap?.[userSettings[item.name]],
                    ]}
                  >
                    <Text style={[colorMap[userSettings[item.name]]]}>
                      {userSettings ? userSettings[item.name] : "Select"}
                    </Text>
                  </View>
                  {/* <CustomSvgImageComponent
                    width={16}
                    height={16}
                    Component={Right}
                  /> */}
                  <DownArrowIcon
                    color={colorMap?.[userSettings?.[item?.name]]?.svgColor}
                  />
                </View>
              );
            }}
            renderItem={renderDropdownItem}
            dropdownStyle={[styles.dropdownMenuStyle]}
          />
        ) : null}
      </View>
    );
  };
  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      {/* {settingsLoader ? (
        <View
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            backgroundColor: "#ffffff69",
            zIndex: 10000,
          }}
        >
          <ActivityIndicator
            size="large"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // height: 600,
            }}
            color={"#F58C39"}
          />
        </View>
      ) : null} */}
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
                            disconnectWebSocket();
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
                          onPress={() => onCancelModal()}
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
                  onHandleResume();
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
        {userSettings?.isLoading ? (
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
                width: "60%",
                height: 10,
                marginTop: 8,
                backgroundColor: "#9e9e9e",
              }}
            />
          </>
        ) : (
          <ScrollView>
            <FlatList data={optionsList} renderItem={renderItem} />
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};
export default TimerPaused;
