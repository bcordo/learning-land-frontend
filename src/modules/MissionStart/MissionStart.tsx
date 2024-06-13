import React, { useEffect, useState } from "react";
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
import Star from "../../assets/icons/golder-star.svg";
import PlayIcon from "../../assets/icons/white-play-Icon.svg";
import CustomSvgImageComponent from "../../components/CustomComponents/Image";
import FadedDivider from "../../components/FadedDivider/FadedDivider";
import HelphulPharasesComp from "../../components/HelphulPharasesComp/HelphulPharasesComp";
import { useLazyGetAllMissionsQuery } from "../../../redux/services/missions";
import CustomGoalListComponent from "../../components/CustomGaolListComp/CustomGaolListComp";
import { LIGHT_BLACK_FADED_COLOR } from "../../assets/constant";
import { useDispatch, useSelector } from "react-redux";
import { NavigationInterface } from "../../intefaces/componentsInterfaces";
import { updateTime } from "../../../redux/slices/timmerSlice";

const MissionStart: React.FC<NavigationInterface> = ({
  navigation,
}): React.JSX.Element => {
  const dispatch = useDispatch();
  // const [fetchMissions, { isLoading: fetchingMissions }] =
  //   useLazyGetAllMissionsQuery();
  const aa = {
    all_user_phrases: [],
    assistant_id: 1,
    correct_user_phrases: [],
    created_at: "2024-06-12T20:58:53.880054",
    id: 1,
    incorrect_user_phrases: [],
    index: 1,
    interaction_summary: null,
    interactions: [
      {
        action: null,
        created_at: "2024-06-12T20:58:53.880054",
        embedding: "",
        emotion: null,
        from_user_assistant_id: null,
        from_user_character_id: null,
        from_user_id: 1,
        id: 1,
        importance: 3,
        interaction_type: "ASSISTANT_CORRECTION",
        prompt_string: "Prompt string for interaction 1 in user mission 1",
        status: "ACTIVE",
        thought: null,
        to_user_assistant_id: null,
        to_user_character_id: 1,
        to_user_id: null,
        translated_utterance: null,
        translated_utterance_language: null,
        updated_at: "2024-06-12T21:01:33.321765",
        user_mission_id: 1,
        user_training_id: null,
        utterance: "Interaction 1 for user mission 1",
        utterance_language: null,
      },
      {
        action: null,
        created_at: "2024-06-12T20:58:53.880054",
        embedding: "",
        emotion: null,
        from_user_assistant_id: null,
        from_user_character_id: null,
        from_user_id: 1,
        id: 2,
        importance: 4,
        interaction_type: "ASSISTANT_HINT",
        prompt_string: "Prompt string for interaction 2 in user mission 1",
        status: "ACTIVE",
        thought: null,
        to_user_assistant_id: null,
        to_user_character_id: 7,
        to_user_id: null,
        translated_utterance: null,
        translated_utterance_language: null,
        updated_at: "2024-06-12T21:01:33.322558",
        user_mission_id: 1,
        user_training_id: null,
        utterance: "Interaction 2 for user mission 1",
        utterance_language: null,
      },
      {
        action: null,
        created_at: "2024-06-12T20:58:53.880054",
        embedding: "",
        emotion: null,
        from_user_assistant_id: null,
        from_user_character_id: null,
        from_user_id: 1,
        id: 3,
        importance: 2,
        interaction_type: "USER_ACTION",
        prompt_string: "Prompt string for interaction 3 in user mission 1",
        status: "ACTIVE",
        thought: null,
        to_user_assistant_id: null,
        to_user_character_id: 20,
        to_user_id: null,
        translated_utterance: null,
        translated_utterance_language: null,
        updated_at: "2024-06-12T21:01:33.323170",
        user_mission_id: 1,
        user_training_id: null,
        utterance: "Interaction 3 for user mission 1",
        utterance_language: null,
      },
      {
        action: null,
        created_at: "2024-06-12T20:58:53.880054",
        embedding: "",
        emotion: null,
        from_user_assistant_id: null,
        from_user_character_id: null,
        from_user_id: 1,
        id: 4,
        importance: 3,
        interaction_type: "ASSISTANT_HINT",
        prompt_string: "Prompt string for interaction 4 in user mission 1",
        status: "ACTIVE",
        thought: null,
        to_user_assistant_id: null,
        to_user_character_id: 8,
        to_user_id: null,
        translated_utterance: null,
        translated_utterance_language: null,
        updated_at: "2024-06-12T21:01:33.323761",
        user_mission_id: 1,
        user_training_id: null,
        utterance: "Interaction 4 for user mission 1",
        utterance_language: null,
      },
      {
        action: null,
        created_at: "2024-06-12T20:58:53.880054",
        embedding: "",
        emotion: null,
        from_user_assistant_id: null,
        from_user_character_id: null,
        from_user_id: 1,
        id: 5,
        importance: 5,
        interaction_type: "COMMAND",
        prompt_string: "Prompt string for interaction 5 in user mission 1",
        status: "ACTIVE",
        thought: null,
        to_user_assistant_id: null,
        to_user_character_id: 2,
        to_user_id: null,
        translated_utterance: null,
        translated_utterance_language: null,
        updated_at: "2024-06-12T21:01:33.324350",
        user_mission_id: 1,
        user_training_id: null,
        utterance: "Interaction 5 for user mission 1",
        utterance_language: null,
      },
    ],
    mission_definition: "Definition for mission 1 in world 1",
    mission_icon: "https://www.google.com",
    mission_id: 1,
    mission_index: 1,
    mission_location: "Location for mission 1 in world 1",
    mission_narration_template: "Narration template for mission 1 in world 1",
    mission_start_datetime: "2021-10-01 12:00:00",
    mission_start_situation: "Start situation for mission 1 in world 1",
    mission_state: "ACTIVE",
    mission_type: "PRIMARY",
    number_of_goals_completed: 0,
    pause_time: null,
    public_summary: "Public summary for mission 1 in world 1",
    start_time: null,
    time_spent_seconds: 0,
    title: "Mission 1, world 1",
    updated_at: "2024-06-12T21:01:31.235205",
    user_assistant_id: 1,
    user_goals: [
      {
        created_at: "2024-06-12T20:58:53.880054",
        goal_id: 1,
        id: 1,
        state: "FAILED",
        updated_at: "2024-06-12T21:01:33.320368",
        user_id: 1,
        user_mission_id: 1,
      },
      {
        created_at: "2024-06-12T20:58:53.880054",
        goal_id: 2,
        id: 2,
        state: "COMPLETED",
        updated_at: "2024-06-12T21:01:33.320788",
        user_id: 1,
        user_mission_id: 1,
      },
      {
        created_at: "2024-06-12T20:58:53.880054",
        goal_id: 3,
        id: 3,
        state: "ACTIVE",
        updated_at: "2024-06-12T21:01:33.321040",
        user_id: 1,
        user_mission_id: 1,
      },
    ],
    user_id: 1,
    user_mission_current_location: "Location for user mission 1",
    user_mission_current_time: "2021-10-01T12:00:00",
    world_id: 1,
  };
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
        // isFetching={fetchingMissions}
      />
    ) : null;
  };
  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />

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
                overflow: "hidden",
                transform: [{ scaleY: 1.35 }],
                paddingVertical: 20,
              }}
            >
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
                World {allMissions?.index}, Mission 1
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
                    onPress={() => navigation.navigate("HelpfulPharases")}
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
              navigation.navigate("CharacterChat");
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
