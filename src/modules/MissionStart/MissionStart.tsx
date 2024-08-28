import React, { useContext, useEffect, useState } from "react";
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
import Star from "../../assets/icons/golder-star.svg";
import PlayIcon from "../../assets/icons/white-play-Icon.svg";
import CustomSvgImageComponent from "../../components/CustomComponents/Image";
import FadedDivider from "../../components/FadedDivider/FadedDivider";
import HelphulPharasesComp from "../../components/HelphulPharasesComp/HelphulPharasesComp";
import CustomGoalListComponent from "../../components/CustomGaolListComp/CustomGaolListComp";
import { LIGHT_BLACK_FADED_COLOR } from "../../assets/constant";
import { useDispatch, useSelector } from "react-redux";
import { NavigationInterface } from "../../intefaces/componentsInterfaces";
import {
  updateInitialTimmer,
  updatePauseTimmer,
  updateTime,
} from "../../../redux/slices/timmerSlice";
import HistorySvg from "../../assets/icons/MySvgComponents/HistorySvg";
import { AudioPlayerContext } from "../../customHooks/AudioPlayerContext";

const MissionStart: React.FC<NavigationInterface> = ({
  navigation,
}): React.JSX.Element => {
  const state = navigation.getState();
  const currentRoute = state.routes[state.index].name;
  const dispatch = useDispatch();
  const audioContext = useContext(AudioPlayerContext);

  const allMissions = useSelector(
    (state: { missionSlice: any }) => state.missionSlice.mission
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
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

  const handleOpenBlur = () => {
    navigation.navigate("MissionHistory");
    audioContext?.stopAudio();
  };

  const borderRadius = Math.min(134, 168) / 2;

  const renderItem = ({
    item,
  }: {
    item: {
      created_at: string;
      description: string;
      goal_type: string;
      id: number;
      mission_id: number;
      title: string;
      updated_at: string;
      user_id: null;
    };
  }) => {
    return (
      <CustomGoalListComponent
        icon={Star}
        title={item.title}
        description={item.description}
        // isFetching={fetchingMissions}
      />
    );
  };
  // const renderItemSkeleton = ({ item }) => {
  //   return (
  //     <CustomGoalListComponent
  //       icon={Star}
  //       title={""}
  //       description={""}
  //       // isFetching={fetchingMissions}
  //     />
  //   );
  // };
  const renderHelpfulPharases = ({
    item,
    index,
  }: {
    item: {
      created_at: string;
      id: number;
      mission_id: number;
      text: string;
      text_language: string;
      training_id: number;
      updated_at: string;
      user_id: number;
    };
    index: number;
  }) => {
    return index <= 2 ? (
      <HelphulPharasesComp
        title={item.text}
        text_language={item?.text_language}
        currentRoute={currentRoute}
      />
    ) : null;
  };
  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />

      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                audioContext?.stopAudio();
              }}
            >
              <CustomSvgImageComponent
                width={20}
                height={20}
                Component={LeftIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleOpenBlur();
              }}
              disabled={!allMissions?.has_history}
            >
              <HistorySvg
                color={!allMissions?.has_history ? "gray" : "#171717"}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{
              height:
                Platform.OS === "ios" ? screenHeight - 210 : screenHeight - 130,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/icons/profile-image-mission-start.png")}
                style={{
                  width: 134,
                  height: 128,
                  borderRadius,
                }}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.missiontxtContainer}>
              <Text style={[styles.missionTxt, styles.defaultFontFamily]}>
                World {allMissions?.index}, Mission {allMissions?.mission_index}
              </Text>
              <View style={styles.coffeeShopTxtContainer}>
                <Text
                  style={[styles.coffeeShopTxt, styles.defaultFontFamilyBold]}
                >
                  {allMissions.title}
                </Text>
              </View>
            </View>

            <View style={styles.dividerContainer}>
              <FadedDivider color={LIGHT_BLACK_FADED_COLOR} />
              <View style={styles.dividerTxtContainer}>
                <Text style={[styles.dividerTxt, styles.defaultFontFamily]}>
                  {allMissions.public_summary}
                </Text>
              </View>
              <FadedDivider color={LIGHT_BLACK_FADED_COLOR} />
            </View>

            {allMissions.goals?.length > 0 && (
              <View style={styles.goalsContainer}>
                <Text style={[styles.defaultFontFamilyBold, styles.goalstxt]}>
                  Goals
                </Text>
                {/* {fetchingMissions ? (
                  <FlatList data={[1, 2, 3]} renderItem={renderItemSkeleton} />
                ) : (
                  <FlatList
                    data={allMissions?.goals || []}
                    renderItem={renderItem}
                  />
                )} */}
                <FlatList
                  data={allMissions?.goals || []}
                  renderItem={renderItem}
                />
              </View>
            )}

            {allMissions.phrases?.length > 0 && (
              <View style={styles.helpfulPharasesContainer}>
                <View style={styles.helpfulPharasesHeader}>
                  <Text
                    style={[
                      styles.helpfulPharasesTxt,
                      styles.defaultFontFamilyBold,
                    ]}
                  >
                    Helpful Phrases
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("HelpfulPharases");
                      audioContext?.stopAudio();
                    }}
                  >
                    <Text
                      style={[
                        styles.seeAllPharasesTxt,
                        styles.defaultFontFamily,
                      ]}
                    >
                      See all phrases
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.helpfulPharasesListContainer}>
                  <FlatList
                    data={allMissions.phrases || []}
                    renderItem={renderHelpfulPharases}
                  />
                </View>
              </View>
            )}
          </ScrollView>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              dispatch(
                updateTime({
                  minutes: 5,
                  seconds: 0,
                  totalSeconds: 300,
                })
              );
              dispatch(updateInitialTimmer({ initialTotalSeconds: 300 }));
              dispatch(updatePauseTimmer(false));
              navigation.navigate("CharacterChat");
              audioContext?.stopAudio();
            }}
          >
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
    </>
  );
};

export default MissionStart;
