import React, { useEffect, useRef, useState } from "react";
import StatusBarComp from "../../components/StatusBarComp/StatusBarComp";
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import LeftIcon from "../../assets/icons/arrow-left-black.svg";
import Timer from "../../assets/icons/reload-timer.svg";
import Goal from "../../assets/icons/goal-black.svg";
import XCiexle from "../../assets/icons/x-circle-black.svg";
import Message from "../../assets/icons/message-gray.svg";
import PlayIcon from "../../assets/icons/white-play-Icon.svg";
import CustomSvgImageComponent from "../../components/CustomComponents/Image";
import FadedDivider from "../../components/FadedDivider/FadedDivider";
import { LIGHT_BLACK_FADED_COLOR } from "../../assets/constant";
import Star from "../../assets/icons/golder-star.svg";
import { NavigationInterface } from "../../intefaces/componentsInterfaces";
import Drawer from "react-native-drawer";
import { BlurView } from "@react-native-community/blur";
import CustomGoalListComponent from "../../components/CustomGaolListComp/CustomGaolListComp";

const MissionHistory: React.FC<NavigationInterface> = ({
  navigation,
}): React.JSX.Element => {
  const drawerRef = useRef<any>(null);
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    drawerRef.current.open();

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setScreenHeight(
          Dimensions.get("window").height - event.endCoordinates.height
        );
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setScreenHeight(Dimensions.get("window").height);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const goalsList = [
    {
      description: "Ich möchte einen Kaffee bitte. ",
      title: "I would like a coffee please. ",
    },
    {
      description: "Ich möchte einen Kaffee bitte. ",
      title: "I would like a coffee please. ",
    },
  ];

  const renderItem = ({
    item,
  }: {
    item: {
      description: string;

      title: string;
    };
  }) => {
    return (
      <CustomGoalListComponent
        icon={Star}
        title={item.title}
        description={item.description}
      />
    );
  };

  const missionsHistoryData = [
    {
      date: "12 June 2022",
      status: "COMPLETED",
      missionCompleted: 10,
      totalMissions: 3,
      completedMissions: 2,
      pharases: 22,
      progressText: 12,
      progressFill: 60,
    },
    {
      date: "12 June 2022",
      status: "ACTIVE",
      missionCompleted: 10,
      totalMissions: 3,
      completedMissions: 2,
      pharases: 22,
      progressText: 3,
      progressFill: 50,
    },
    {
      date: "12 June 2022",
      status: "NOT_STARTED",
      missionCompleted: 10,
      totalMissions: 3,
      completedMissions: 2,
      pharases: 22,
      progressFill: 0,
    },
  ];
  const renderMissionHistory = ({ item }) => {
    return (
      <View style={styles.missionHistoryDetailsListContainer}>
        <View style={styles.missionDateContainer}>
          <Text style={[styles.defaultFontFamily, styles.missionDate]}>
            {item?.date}
          </Text>
          <View
            style={[
              styles?.missionStatusContainer,
              {
                backgroundColor:
                  item?.status === "ACTIVE"
                    ? "#FFEFE3"
                    : item?.status === "COMPLETED"
                    ? "#D9F5F5"
                    : "#F5F5F5",
              },
            ]}
          >
            <Text
              style={[
                styles.defaultFontFamilySemiBold,
                styles?.missionStatusTxt,
                {
                  color:
                    item?.status === "ACTIVE"
                      ? "#F58C39"
                      : item?.status === "COMPLETED"
                      ? "#7DDFDE"
                      : "#A2AAAA",
                },
              ]}
            >
              {item?.status === "ACTIVE"
                ? "IN-PROGRESS"
                : item?.status === "COMPLETED"
                ? "COMPLETE"
                : "NOT-STARTED"}
            </Text>
          </View>
        </View>
        <View style={styles.progressBarParent}>
          <View
            style={[styles.progressBar, { width: `${item?.progressFill}%` }]}
          >
            {item?.progressText && (
              <Text style={[styles.defaultFontFamilyBold, styles.progressText]}>
                + {item?.progressText}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.scoreContainer}>
          {[Goal, XCiexle, Message].map((e) => (
            <View
              style={[
                styles.scoreSubContainer,
                { opacity: item?.status === "NOT_STARTED" ? 0.5 : 1 },
              ]}
            >
              <CustomSvgImageComponent width={13} height={13} Component={e} />
              <Text style={[styles.defaultFontFamilySemiBold, styles.scoreTxt]}>
                {item?.status === "NOT_STARTED" ? "-" : "2/3"}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };
  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      <Drawer
        width={"100%"}
        type="overlay"
        ref={drawerRef}
        content={
          <BlurView
            style={[{ width: "100%", height: "100%" }]}
            blurType="light"
            blurAmount={15}
            reducedTransparencyFallbackColor="transparent"
          >
            <View style={styles.missionHistoryContaier}>
              <View style={styles.missionHistorySubContaier}>
                <View style={styles.scenarioHistoryContainer}>
                  <CustomSvgImageComponent
                    width={20}
                    height={20}
                    Component={Timer}
                  />
                  <Text
                    style={[
                      styles.defaultFontFamilySemiBold,
                      styles.scenarioHistoryTxt,
                    ]}
                  >
                    Scenario History
                  </Text>
                </View>

                <View style={{ marginBottom: 60 }}>
                  <FlatList
                    data={missionsHistoryData}
                    renderItem={renderMissionHistory}
                  />
                </View>
              </View>
              <View></View>
            </View>
          </BlurView>
        }
      >
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <CustomSvgImageComponent
                  width={20}
                  height={20}
                  Component={LeftIcon}
                />
              </TouchableOpacity>

              <View
                style={{
                  transform: [{ scaleY: 1.35 }],
                  paddingVertical: 20,
                }}
              >
                <Image
                  source={require("../../assets/icons/profile-image-mission-start.png")}
                  style={{
                    width: 134,
                    height: 128,
                    borderRadius: Math.min(134, 168) / 2,
                  }}
                  resizeMode="stretch"
                />
              </View>

              <CustomSvgImageComponent
                width={20}
                height={20}
                Component={Timer}
              />
            </View>
            <ScrollView
              style={{
                height:
                  Platform.OS === "ios"
                    ? screenHeight - 390
                    : screenHeight - 310,
              }}
            >
              <View style={styles.missiontxtContainer}>
                <Text style={(styles.missionTxt, styles.defaultFontFamily)}>
                  World 1, Mission 1
                </Text>
                <View style={styles.coffeeShopTxtContainer}>
                  <Text
                    style={[styles.coffeeShopTxt, styles.defaultFontFamilyBold]}
                  >
                    Mission 1
                  </Text>
                </View>
              </View>

              <View style={styles.dividerContainer}>
                <FadedDivider color={LIGHT_BLACK_FADED_COLOR} />
                <View style={styles.dividerTxtContainer}>
                  <Text style={[styles.dividerTxt, styles.defaultFontFamily]}>
                    Public Summary for mission 1
                  </Text>
                </View>
                <FadedDivider color={LIGHT_BLACK_FADED_COLOR} />
              </View>

              <View style={styles.goalsContainer}>
                <Text style={[styles.defaultFontFamilyBold, styles.goalstxt]}>
                  Goals
                </Text>
                <FlatList data={goalsList || []} renderItem={renderItem} />
              </View>
            </ScrollView>

            <TouchableOpacity style={styles.startButton}>
              <CustomSvgImageComponent
                width={22}
                height={22}
                Component={PlayIcon}
              />
              <Text style={[styles.defaultFontFamilyBold, styles.startTxt]}>
                START
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Drawer>
    </>
  );
};

export default MissionHistory;