import React from "react";
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
import StarIcon from "../../assets/icons/golder-star.svg";
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

interface MissionEndProps {
  navigation: any;
}

const MissionEnd: React.FC<MissionEndProps> = ({
  navigation,
}): React.JSX.Element => {
  const reviewBoxList = [
    { value: "PHRASES", icon: MessageIcon, color: "#1717171", score: "+22" },
    { value: "CORRECT", icon: CheckIcon, color: "#7DDFDE", score: 18 },
    { value: "INCORRECT", icon: XCrossIcon, color: "#FF8B67", score: 4 },
  ];

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
    index,
  }: {
    item: {
      title: string;
      description: string;
      descriptionColor?: string;
      type?: string;
      hideDescriptionText?: boolean;
      isRight: boolean;
      text_language: string;
      showDescriptionIcons?: boolean;
    };
    index: number;
  }) => {
    return (
      <HelphulPharasesComp
        title={item.title}
        description={item?.description}
        text_language={item?.text_language}
        descriptionColor={item.descriptionColor}
        type={item.type}
        hideDescriptionText={item.hideDescriptionText}
        isRight={item.isRight}
        showDescriptionIcons={item.showDescriptionIcons}
      />
    );
  };
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
                fill={50}
                tintColor="#fff"
                backgroundColor="lightgray"
                lineCap="round"
                rotation={-135}
              >
                {(fill) => (
                  <View style={styles.scoretxtContainer}>
                    <Text
                      style={[
                        styles.defaultFontFamilyBold,
                        styles.scoretxt,
                        styles.scoretxtXL,
                      ]}
                    >
                      2/3
                    </Text>
                    <Text
                      style={[styles.defaultFontFamilyBold, styles.scoretxt]}
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
                    Component={StarIcon}
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
                      styles.defaultFontFamilyBold,
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
                        styles.defaultFontFamily,
                        styles.reviewScore,
                        { color: item.color || "" },
                      ]}
                    >
                      {item.score}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.goalsContainer}>
            <Text style={[styles.goalsTxt, styles.defaultFontFamilyBold]}>
              Goals Review
            </Text>
            <FlatList data={goalsList} renderItem={renderItem} />
          </View>

          <HelpfulActionsContainer
            list={incorrectPharases}
            renderItem={renderHelpfulPharases}
            buttonText={` See all 10 mistakes`}
            heading={"Incorrect Phrases"}
            navigation={navigation}
            navigationRoute={"HelpfulPharases"}
          />
          <HelpfulActionsContainer
            list={correctPharases}
            renderItem={renderHelpfulPharases}
            buttonText={`See all 10`}
            heading={"Correct Phrases"}
            navigation={navigation}
            navigationRoute={"HelpfulPharases"}
          />

          <HelpfulActionsContainer
            list={transcriptList}
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
                styles.defaultFontFamilyBold,
              ]}
              buttonStyle={styles.alreadyHaveAnAccount}
              onPress={() => {}}
              buttonTxt={"PRACTICE MISTAKES"}
              icon={DumbleIcon}
            />

            <CustomButtom
              textStyle={[
                styles.getStartedButtonText,
                styles.defaultFontFamilyBold,
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
