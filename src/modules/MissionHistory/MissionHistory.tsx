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
import CrossIcon from "../../assets/icons/crossIcon.svg";
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
import { useGetUserMissionHistoryQuery } from "../../../redux/services/missions";
import {
  MissionHistoryDataInterface,
  NumberInterface,
  RenderMissionHistoryItemInterface,
  ScoreListInterface,
} from "../../intefaces/variablesInterfaces";
import CustomShimmer from "../../components/CustomShimmer/CustomShimmer";
import { formatDate } from "../../assets/reusableFunctions";

const MissionHistory: React.FC<NavigationInterface> = ({
  navigation,
}): React.JSX.Element => {
  const drawerRef = useRef<any>(null);
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  const [scoreList, setScoreList] = useState<[ScoreListInterface][]>([]);

  const { data, isFetching } = useGetUserMissionHistoryQuery({
    user_mission_id: 119,
  });

  useEffect(() => {
    if (!data) return;

    const newData = data.map((element: MissionHistoryDataInterface) => {
      return [
        {
          type: "user_goals",
          icon: Goal,
          score:
            element?.mission_state === "INACTIVE"
              ? "-"
              : `${element?.number_of_goals_completed}/${element?.user_goals?.length}`,
        },
        {
          type: "incorrect_user_phrases",
          icon: XCiexle,
          score:
            element?.mission_state === "INACTIVE"
              ? "-"
              : `${element?.incorrect_user_phrases?.length}`,
        },
        {
          type: "correct_user_phrases",
          icon: Message,
          score:
            element?.mission_state === "INACTIVE"
              ? "-"
              : `${element?.correct_user_phrases?.length}`,
        },
      ];
    });

    setScoreList([...newData]);
  }, [data]);

  useEffect(() => {
    drawerRef?.current?.open();

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

  const renderMissionHistory = ({
    item,
    index,
  }: {
    item: RenderMissionHistoryItemInterface;
    index: NumberInterface;
  }) => {
    return (
      <View style={styles.missionHistoryDetailsListContainer}>
        <View style={styles.missionDateContainer}>
          <Text style={[styles.defaultFontFamily, styles.missionDate]}>
            {formatDate(item?.user_mission_current_time)}
          </Text>
          <View
            style={[
              styles?.missionStatusContainer,
              {
                backgroundColor:
                  item?.mission_state === "ACTIVE"
                    ? "#FFEFE3"
                    : item?.mission_state === "COMPLETED"
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
                    item?.mission_state === "ACTIVE"
                      ? "#F58C39"
                      : item?.mission_state === "COMPLETED"
                      ? "#7DDFDE"
                      : "#A2AAAA",
                },
              ]}
            >
              {item?.mission_state === "ACTIVE"
                ? "IN-PROGRESS"
                : item?.mission_state === "COMPLETED"
                ? "COMPLETE"
                : "NOT-STARTED"}
            </Text>
          </View>
        </View>
        <View style={styles.progressBarParent}>
          {/* <View
            style={[styles.progressBar, { width: `${item?.progressFill}%` }]}
          >
            {item?.progressText && (
              <Text style={[styles.defaultFontFamilyBold, styles.progressText]}>
                + {item?.progressText}
              </Text>
            )}
          </View> */}
        </View>
        <View style={styles.scoreContainer}>
          {scoreList[index]?.map((e) => (
            <View
              style={[
                styles.scoreSubContainer,
                {
                  opacity:
                    item?.mission_state === "NOT_STARTED" ||
                    item?.mission_state === "INACTIVE"
                      ? 0.5
                      : 1,
                },
              ]}
            >
              <CustomSvgImageComponent
                width={13}
                height={13}
                Component={e?.icon}
              />
              <Text style={[styles.defaultFontFamilySemiBold, styles.scoreTxt]}>
                {e?.score}
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
      {/* <Drawer
        width={"100%"}
        type="overlay"
        // ref={drawerRef}
        content={
          <BlurView
            style={[{ width: "100%", height: "100%" }]}
            blurType="light"
            blurAmount={15}
            reducedTransparencyFallbackColor="transparent"
          >
            <View style={styles.missionHistoryContaier}>
              <View
                style={[
                  styles.topContainer,
                  {
                    paddingTop: Platform.OS === "ios" ? 40 : 0,
                    // backgroundColor: "red",
                  },
                ]}
              >
                <View style={styles.drawerHeader}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    // style={{
                    //   // backgroundColor: "red",
                    //   width: 20,
                    //   height: 20,
                    // }}
                  >
                    <CustomSvgImageComponent
                      width={20}
                      height={20}
                      Component={CrossIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.missionHistorySubContaier}>
                <View
                  style={[
                    styles.scenarioHistoryContainer,
                    { borderBottomWidth: isFetching ? 0 : 1 },
                  ]}
                >
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

                {isFetching ? (
                  <>
                    <CustomShimmer
                      styleProps={{
                        width: "90%",
                        height: 10,
                        backgroundColor: "#9e9e9e",
                      }}
                    />
                    <CustomShimmer
                      styleProps={{
                        width: "70%",
                        height: 10,
                        marginTop: 8,
                        backgroundColor: "#9e9e9e",
                      }}
                    />
                    <CustomShimmer
                      styleProps={{
                        width: "50%",
                        height: 10,
                        backgroundColor: "#9e9e9e",
                        marginTop: 8,
                        marginBottom: 60,
                      }}
                    />
                  </>
                ) : (
                  <View style={{ marginBottom: 60 }}>
                    <FlatList data={data} renderItem={renderMissionHistory} />
                  </View>
                )}
              </View>
            </View>
          </BlurView>
        }
      > */}
      <SafeAreaView>
        <BlurView
          blurType="light"
          blurAmount={15}
          reducedTransparencyFallbackColor="transparent"
          style={{
            position: "absolute",
            height: Platform.OS === "ios" ? "112%" : "102%",
            width: "100%",
            zIndex: 111,
          }}
        >
          <View style={styles.missionHistoryContaier}>
            <View
              style={[
                styles.topContainer,
                {
                  paddingTop: Platform.OS === "ios" ? 40 : 0,
                },
              ]}
            >
              <View style={styles.drawerHeader}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                >
                  <CustomSvgImageComponent
                    width={20}
                    height={20}
                    Component={CrossIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.missionHistorySubContaier}>
              <View
                style={[
                  styles.scenarioHistoryContainer,
                  { borderBottomWidth: isFetching ? 0 : 1 },
                ]}
              >
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

              {isFetching ? (
                <>
                  <CustomShimmer
                    styleProps={{
                      width: "90%",
                      height: 10,
                      backgroundColor: "#9e9e9e",
                    }}
                  />
                  <CustomShimmer
                    styleProps={{
                      width: "70%",
                      height: 10,
                      marginTop: 8,
                      backgroundColor: "#9e9e9e",
                    }}
                  />
                  <CustomShimmer
                    styleProps={{
                      width: "50%",
                      height: 10,
                      backgroundColor: "#9e9e9e",
                      marginTop: 8,
                      marginBottom: 60,
                    }}
                  />
                </>
              ) : (
                <View style={{ marginBottom: 60 }}>
                  <FlatList data={data} renderItem={renderMissionHistory} />
                </View>
              )}
            </View>
          </View>
        </BlurView>
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

            <CustomSvgImageComponent width={20} height={20} Component={Timer} />
          </View>
          <ScrollView
            style={{
              height:
                Platform.OS === "ios" ? screenHeight - 390 : screenHeight - 310,
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
      {/* </Drawer> */}
    </>
  );
};

export default MissionHistory;
