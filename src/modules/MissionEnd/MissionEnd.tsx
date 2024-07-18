import React, { useEffect, useState } from "react";
import StatusBarComp from "../../components/StatusBarComp/StatusBarComp";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import {
  ActivityIndicator,
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
import {
  BooleanInterface,
  ReviewBoxListInterface,
  StringInterface,
} from "../../intefaces/variablesInterfaces";
import CustomShimmer from "../../components/CustomShimmer/CustomShimmer";
import { useLazyGetGoalsByMissionIdQuery } from "../../../redux/services/user_goals";

const MissionEnd: React.FC<NavigationInterface> = ({
  navigation,
}): React.JSX.Element => {
  const [reviewBoxList, setReviewBoxList] = useState<ReviewBoxListInterface[]>(
    []
  );
  const [isPlaying, setIsPlaying] = useState<BooleanInterface>(false); // State to track if the audio is playing
  const [howManyShowTranscript, setHowManyShowTranscript] = useState(0);
  const [
    getchMissionByMissionId,
    { data: missionDetails, isLoading: fetchingMission },
  ] = useLazyGetUserMissionByUserMissionIdQuery();
  const [
    getUserGoals,
    { data: userGoalsDetails, isLoading: loadingUserGoals },
  ] = useLazyGetGoalsByMissionIdQuery();
  
 
const goalsReviewArray = (
) => {

  let finalArray:[] = [];

  userGoalsDetails?.forEach((item:any) => {
    let object:any = missionDetails?.user_goals?.find(
      (ele:any) => ele?.goal_id === item?.id
    );
    finalArray.push({ ...item, ...object });
  });

  return finalArray || [];
};
  
  useEffect(() => {
    if (!missionDetails) return;
    setReviewBoxList([
      {
        value: "PHRASES",
        icon: MessageIcon,
        color: "#171717",
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
    setHowManyShowTranscript(4);
    getUserGoals({ mission_id: missionDetails?.mission_id });
  }, [missionDetails]);

  const { id } = useSelector((state) => state.missionSlice.mission);

  useEffect(() => {
    getchMissionByMissionId({ user_mission_id: id });
  }, []);

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

  const renderItem = ({
    item,
  }: {
    item: {
      title: string;
      description: string;
      state?:string;
      icon?: any;
    };
  }) => {
    return (
      <CustomGoalListComponent
        icon={item?.state === "COMPLETED" ? Tick:XSvg}
        title={item.title}
        description={item.description}
      />
    );
  };

  const renderHelpfulPharases = ({
    item,
    index,
  }: {
    item: {
      native_text: StringInterface;
      native_text_language: StringInterface;
      translated_text: StringInterface;
      translated_text_language: StringInterface;
      interaction_type?: string;
      showDescriptionIcons?: boolean;
      utterance: StringInterface;
      user_phrase?:any;
      thought?: StringInterface;
      action?: StringInterface;
      phrase?:any;
    };
    index: number;
  }) => {
    return (
      <>
        {index <= howManyShowTranscript ? (
          <HelphulPharasesComp
            title={item.native_text || item?.utterance || item?.action|| item?.phrase?.text }
            description={item?.translated_text || item?.thought}
            text_language={item?.native_text_language}
            interaction_type={item?.interaction_type}
            showDescriptionIcons={item?.showDescriptionIcons}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        ) : null}
      </>
    );
  };
  function calculateResult(arr: [], completed_goals: number = 0) {
    const completionPercentage = (completed_goals / arr?.length) * 100;
    return completionPercentage;
  }

  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      <SafeAreaView style={[styles.mainContainer]}>
        <ScrollView style={styles.container}>
          {fetchingMission ? (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator
                  size="large"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 200,
                  }}
                  color={"#F58C39"}
                />
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.header}
                // onPress={() => {
                //   navigation.goBack();
                // }}
              >
                {/* <CustomSvgImageComponent
                  width={20}
                  height={20}
                  Component={LeftIcon}
                /> */}

                <Text
                  style={[
                    styles.defaultFontFamilyBold,
                    styles.scenarioCompletedTxt,
                  ]}
                >
                  Scenario{" "}
                  {missionDetails?.user_goals?.every((item:any)=>item?.state==="COMPLETED")
                    ? "Complete!"
                    : "Failed"}
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
                    tintColor="#eaedf0"
                    backgroundColor="#d8e1ee"
                    lineCap="round"
                    rotation={-120}
                    arcSweepAngle={240}
                    style={{
                      borderRadius: 20,
                      shadowColor: "#F1F5F9",
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
                    {[...Array(3)].map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.starBox1,
                          index === 0 && styles.starBox1,
                          index === 1 && styles.starBox2,
                          index === 2 && styles.starBox3,
                        ]}
                      >
                        <CustomSvgImageComponent
                          width={42}
                          height={40}
                          Component={
                            index < missionDetails?.number_of_goals_completed
                              ? StarIcon
                              : GrayStarIcon
                          }
                        />
                      </View>
                    ))}
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

              {loadingUserGoals ? (
                <>
                  <CustomShimmer
                    styleProps={{
                      width: "80%",
                      height: 10,
                      backgroundColor: "#9e9e9e",
                      marginTop: 12,
                    }}
                  />
                  <CustomShimmer
                    styleProps={{
                      width: "60%",
                      height: 10,
                      backgroundColor: "#9e9e9e",
                      marginTop: 8,
                      marginBottom: 12,
                    }}
                  />
                </>
              ) : (
                <>
                  {userGoalsDetails?.length ? (
                    <View style={styles.goalsContainer}>
                      <Text
                        style={[
                          styles.goalsTxt,
                          styles.defaultFontFamilySemiBold,
                        ]}
                      >
                        Goals Review
                      </Text>
                      <FlatList
                        data={goalsReviewArray()}
                        renderItem={renderItem}
                      />
                    </View>
                  ) : null}
                </>
              )}

              {missionDetails?.incorrect_user_phrases?.length ? (
                <HelpfulActionsContainer
                  list={missionDetails?.incorrect_user_phrases?.map(
                    (element) => {
                      return {
                        ...element,
                        showDescriptionIcons: true,
                      };
                    }
                  )}
                  renderItem={renderHelpfulPharases}
                  buttonText={` See all ${missionDetails?.incorrect_user_phrases?.length} mistakes`}
                  heading={"Incorrect Phrases"}
                  navigation={navigation}
                  navigationRoute={"HelpfulPharases"}
                  buttonTextCheck={
                    missionDetails?.incorrect_user_phrases?.length
                  }
                />
              ) : null}
              {missionDetails?.correct_user_phrases?.length ? (
                <HelpfulActionsContainer
                  list={missionDetails?.correct_user_phrases}
                  renderItem={renderHelpfulPharases}
                  buttonText={`See all ${missionDetails?.correct_user_phrases?.length}`}
                  heading={"Correct Phrases"}
                  navigation={navigation}
                  navigationRoute={"HelpfulPharases"}
                  buttonTextCheck={missionDetails?.correct_user_phrases?.length}
                />
              ) : null}

              {missionDetails?.interactions?.length ? (
                <HelpfulActionsContainer
                  list={missionDetails?.interactions}
                  renderItem={renderHelpfulPharases}
                  buttonText={`See full transcript`}
                  heading={"Transcript"}
                  navigation={navigation}
                  navigationRoute={"HelpfulPharases"}
                  buttonTextCheck={`See full transcript`}
                  handleButton={() =>
                    setHowManyShowTranscript(
                      missionDetails?.interactions?.length
                    )
                  }
                />
              ) : null}

             
            </>
          )}
        </ScrollView>
       {!fetchingMission? <View style={styles.buttonContainer}>
                {/* <CustomButtom
                  textStyle={[
                    styles.alreadyHaveAccountButtonText,
                    styles.defaultFontFamilySemiBold,
                  ]}
                  buttonStyle={styles.alreadyHaveAnAccount}
                  onPress={() => {}}
                  buttonTxt={"PRACTICE MISTAKES"}
                  icon={DumbleIcon}
                /> */}

                <CustomButtom
                  textStyle={[
                    styles.getStartedButtonText,
                    styles.defaultFontFamilySemiBold,
                  ]}
                  buttonStyle={styles.getStarted}
                  onPress={() => {
                    navigation.navigate("HomeTab");
                  }}
                  buttonTxt={"CONTINUE"}
                />
              </View>:null}
      </SafeAreaView>
    </>
  );
};

export default MissionEnd;
