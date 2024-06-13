import React, { useEffect, useState } from "react";
import StatusBarComp from "../../components/StatusBarComp/StatusBarComp";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomSvgImageComponent from "../../components/CustomComponents/Image";
import LeftIcon from "../../assets/icons/arrow-left-black.svg";
import StarIcon from "../../assets/icons/golden-star2.svg";
import GrayStarIcon from "../../assets/icons/start-gray.svg";
import MessageIcon from "../../assets/icons/message.svg";
import XCrossIcon from "../../assets/icons/x-circle.svg";
import CheckIcon from "../../assets/icons/check-circle.svg";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import XSvg from "../../assets/icons/x.svg";
import Tick from "../../assets/icons/check-tick.svg";
import DumbleIcon from "../../assets/icons/dumble-orange.svg";
import HelphulPharasesComp from "../../components/HelphulPharasesComp/HelphulPharasesComp";
import HelpfulActionsContainer from "../../components/HelpfulActionsContainer/HelpfulActionsContainer";
import CustomButtom from "../../components/CustomButtom/CustomButtom";
import CustomGoalListComponent from "../../components/CustomGaolListComp/CustomGaolListComp";
import { useLazyGetUserMissionByUserMissionIdQuery } from "../../../redux/services/missions";
import { useSelector } from "react-redux";
import { NavigationInterface } from "../../intefaces/componentsInterfaces";
import { StringInterface } from "../../intefaces/variablesInterfaces";
interface aa {
  value: string;
  icon: any;
  color: string;
  score: string | number;
  key: string;
}
const MissionEnd: React.FC<NavigationInterface> = ({
  navigation,
}): React.JSX.Element => {
  const [reviewBoxList, setReviewBoxList] = useState<aa[]>([]);
  const [
    getchMissionByMissionId,
    { data: missionDetails, isLoading: fetchingMission },
  ] = useLazyGetUserMissionByUserMissionIdQuery();
  useEffect(() => {
    if (!missionDetails) return;
    setReviewBoxList([
      {
        value: "PHRASES",
        icon: MessageIcon,
        color: "#1717171",
        score: `+${missionDetails?.all_user_phrases?.length}`,
        key: "total_phrases",
      },
      {
        value: "CORRECT",
        icon: CheckIcon,
        color: "#7DDFDE",
        score: missionDetails?.correct_user_phrases?.length,
        key: "correct_phrases",
      },
      {
        value: "INCORRECT",
        icon: XCrossIcon,
        color: "#FF8B67",
        score: missionDetails?.incorrect_user_phrases?.length,
        key: "incorrect_phrases",
      },
    ]);
  }, [missionDetails]);

  const { id } = useSelector((state) => state.missionSlice.mission);

  useEffect(() => {
    getchMissionByMissionId({ user_mission_id: id });
  }, []);

  // const reviewBoxList = [
  //   {
  //     value: "PHRASES",
  //     icon: MessageIcon,
  //     color: "#1717171",
  //     score: `+${missionDetails?.all_user_phrases?.length}`,
  //     key: "total_phrases",
  //   },
  //   {
  //     value: "CORRECT",
  //     icon: CheckIcon,
  //     color: "#7DDFDE",
  //     score: 18,
  //     key: "correct_phrases",
  //   },
  //   {
  //     value: "INCORRECT",
  //     icon: XCrossIcon,
  //     color: "#FF8B67",
  //     score: 4,
  //     key: "incorrect_phrases",
  //   },
  // ];

  const goalsList = [
    {
      title: "Get her number",
      description: "Successfully exchange phone numbers",
      icon: Tick,
    },
    {
      title: "Schedule a date",
      description: "Successfully schedule a date for later",
      icon: XSvg,
    },
    { title: "Third goal", description: "Third goal description", icon: Tick },
  ];
  const incorrectPharases = [
    {
      title: "Ich möchte einen Kaffee bitte.  ",
      description: "Ish mushta ein cafe bitter.  ",
      showDescriptionIcons: true,
    },
    {
      title: "Ich möchte einen Kaffee bitte.  ",
      description: "Ish mushta ein cafe bitter.  ",
      showDescriptionIcons: true,
    },
    {
      title: "Ich möchte einen Kaffee bitte.  ",
      description: "Ish mushta ein cafe bitter.  ",
      showDescriptionIcons: true,
    },
  ];
  const correctPharases = [
    {
      title: "Ich möchte einen Kaffee bitte.  ",
      text_language: "DE",
    },
    {
      title: "I need a tour guide. Do you know anyone? ;)",
      text_language: "DE",
    },
    {
      title: "I would like your phone number",
      text_language: "DE",
    },
  ];
  const transcriptList = [
    {
      title: "Ich möchte einen Kaffee bitte.ss",
      description: "Ich möchte einen Kaffee bitte.",
      type: "character-response",
      showDescriptionIcons: false,
    },
    {
      title: "Ich möchte einen Kaffee bitte.",
      description: "Ich möchte einen Kaffee bitte.",
      descriptionColor: "#7DDFDE",
      isRight: true,
      type: "user-response",
      showDescriptionIcons: false,
    },
    {
      title: "Ich möchte einen Kaffee bitte.",
      description: "Ich möchte einen Kaffee bitte.",
      type: "character-response",
      showDescriptionIcons: false,
    },
    {
      title: "Ich möchte einen Kaffee bitte.",
      isRight: false,
      type: "user-response",
      hideDescriptionText: true,
    },
  ];

  const renderItem = ({
    item,
  }: {
    item: {
      title: string;
      description: string;

      icon: any;
    };
  }) => {
    return (
      <CustomGoalListComponent
        icon={item.icon}
        title={item.title}
        description={item.description}
      />
    );
  };

  const renderHelpfulPharases = ({
    item,
  }: {
    item: {
      native_text: StringInterface;
      native_text_language: StringInterface;
      translated_text: StringInterface;
      translated_text_language: StringInterface;
      interaction_type?: string;
      showDescriptionIcons?: boolean;
      utterance: StringInterface;
    };
    index: number;
  }) => {
    return (
      <HelphulPharasesComp
        title={item.native_text || item?.utterance}
        description={item?.translated_text}
        text_language={item?.native_text_language}
        interaction_type={item?.interaction_type}
        showDescriptionIcons={item?.showDescriptionIcons}
      />
    );
  };
  function calculateResult(arr: [], completed_goals: number) {
    const completionPercentage = (completed_goals || 0 / arr?.length) * 100;
    let result = (completionPercentage / 100) * 70;
    result = Math.min(result, 70);
    result = Math.max(result, 0);

    return result;
  }

  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      <SafeAreaView style={[styles.mainContainer]}>
        <ScrollView style={styles.container}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <CustomSvgImageComponent
              width={20}
              height={20}
              Component={LeftIcon}
            />

            <Text
              style={[
                styles.defaultFontFamilyBold,
                styles.scenarioCompletedTxt,
              ]}
            >
              Scenario Complete!
            </Text>
          </TouchableOpacity>

          <View style={{ alignItems: "center" }}>
            <View style={styles.scoreContainer}>
              <AnimatedCircularProgress
                size={250}
                width={12}
                fill={calculateResult(
                  missionDetails?.user_goals,
                  missionDetails?.number_of_goals_completed
                )}
                tintColor="#F1F5F9"
                backgroundColor="#d8e1ee"
                lineCap="round"
                rotation={-135}
                style={{
                  borderRadius: 20,
                  shadowColor: "#3282ce9c",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                {(fill) => (
                  <View style={styles.scoretxtContainer}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[
                          styles.defaultFontFamilyBold,
                          styles.scoretxt,
                          styles.scoretxtXL,
                        ]}
                      >
                        {missionDetails?.number_of_goals_completed}
                      </Text>
                      <Text
                        style={[
                          styles.defaultFontFamilySemiBold,
                          styles.scoretxt,
                          styles.scoretxtXL,
                        ]}
                      >
                        /
                      </Text>
                      <Text
                        style={[
                          styles.defaultFontFamilyBold,
                          styles.scoretxt,
                          styles.scoretxtXL,
                        ]}
                      >
                        {missionDetails?.user_goals?.length}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.defaultFontFamilySemiBold,
                        styles.scoretxt,
                      ]}
                    >
                      GOALS COMPLETE{" "}
                    </Text>
                  </View>
                )}
              </AnimatedCircularProgress>

              <View style={styles.starContainer}>
                <View style={styles.starBox1}>
                  <CustomSvgImageComponent
                    width={42}
                    height={40}
                    Component={StarIcon}
                  />
                </View>

                <View style={[styles.starBox1, styles.starBox2]}>
                  <CustomSvgImageComponent
                    width={42}
                    height={40}
                    Component={StarIcon}
                  />
                </View>
                <View style={[styles.starBox1, styles.starBox3]}>
                  <CustomSvgImageComponent
                    width={42}
                    height={40}
                    Component={GrayStarIcon}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.reviewContainer}>
            {reviewBoxList.map((item, i) => {
              return (
                <View style={styles.reviewBox}>
                  <Text
                    style={[
                      styles.defaultFontFamilySemiBold,
                      styles.reviewTxt,
                      { color: item.color || "" },
                    ]}
                  >
                    {item.value}
                  </Text>
                  <View style={styles.reviewScoreContainer}>
                    <CustomSvgImageComponent
                      width={30}
                      height={30}
                      Component={item.icon}
                    />
                    <Text
                      style={[
                        styles.defaultFontFamilySemiBold,
                        styles.reviewScore,
                        { color: item.color || "" },
                      ]}
                    >
                      {item?.score}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.goalsContainer}>
            <Text style={[styles.goalsTxt, styles.defaultFontFamilySemiBold]}>
              Goals Review
            </Text>
            <FlatList data={goalsList} renderItem={renderItem} />
          </View>

          <HelpfulActionsContainer
            list={missionDetails?.incorrect_user_phrases?.map((element) => {
              return {
                ...element,
                showDescriptionIcons: true,
              };
            })}
            renderItem={renderHelpfulPharases}
            buttonText={` See all ${missionDetails?.incorrect_user_phrases?.length} mistakes`}
            heading={"Incorrect Phrases"}
            navigation={navigation}
            navigationRoute={"HelpfulPharases"}
          />
          <HelpfulActionsContainer
            list={missionDetails?.correct_user_phrases}
            renderItem={renderHelpfulPharases}
            buttonText={`See all ${missionDetails?.correct_user_phrases?.length}`}
            heading={"Correct Phrases"}
            navigation={navigation}
            navigationRoute={"HelpfulPharases"}
          />

          <HelpfulActionsContainer
            list={missionDetails?.interactions}
            renderItem={renderHelpfulPharases}
            buttonText={`See full transcript`}
            heading={"Transcript"}
            navigation={navigation}
            navigationRoute={"HelpfulPharases"}
          />

          <View style={styles.buttonContainer}>
            <CustomButtom
              textStyle={[
                styles.alreadyHaveAccountButtonText,
                styles.defaultFontFamilySemiBold,
              ]}
              buttonStyle={styles.alreadyHaveAnAccount}
              onPress={() => {
                navigation.navigate("MissionHistory");
              }}
              buttonTxt={"PRACTICE MISTAKES"}
              icon={DumbleIcon}
            />

            <CustomButtom
              textStyle={[
                styles.getStartedButtonText,
                styles.defaultFontFamilySemiBold,
              ]}
              buttonStyle={styles.getStarted}
              onPress={() => {}}
              buttonTxt={"CONTINUE"}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default MissionEnd;
