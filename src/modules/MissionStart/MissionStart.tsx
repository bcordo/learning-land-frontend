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

interface MissionStartProps {
  navigation: any;
}

const MissionStart: React.FC<MissionStartProps> = ({
  navigation,
}): React.JSX.Element => {
  const [fetchMissions, { data: allMissions }] = useLazyGetAllMissionsQuery();
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    fetchMissions("");
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
      />
    );
  };
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
                World 1, Mission 1
              </Text>
              {allMissions?.length ? (
                <View style={styles.coffeeShopTxtContainer}>
                  <Text
                    style={[styles.coffeeShopTxt, styles.defaultFontFamilyBold]}
                  >
                    {allMissions[0]?.title}
                  </Text>
                </View>
              ) : null}
            </View>

            {allMissions?.length ? (
              <>
                <View style={styles.dividerContainer}>
                  <FadedDivider
                    color={[
                      "rgba(255, 255, 255, 0)",
                      "rgba(0, 0, 0, 0.5)",
                      "rgba(255, 255, 255, 0)",
                    ]}
                  />
                  <View style={styles.dividerTxtContainer}>
                    <Text style={[styles.dividerTxt, styles.defaultFontFamily]}>
                      {allMissions[0]?.public_summary}
                    </Text>
                  </View>
                  <FadedDivider
                    color={[
                      "rgba(255, 255, 255, 0)",
                      "rgba(0, 0, 0, 0.5)",
                      "rgba(255, 255, 255, 0)",
                    ]}
                  />
                </View>

                <View style={styles.goalsContainer}>
                  <Text style={[styles.defaultFontFamilyBold, styles.goalstxt]}>
                    Goals
                  </Text>

                  <FlatList
                    data={allMissions[0]?.goals || []}
                    renderItem={renderItem}
                  />
                </View>

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
                      data={allMissions[0]?.helpful_phrases}
                      renderItem={renderHelpfulPharases}
                    />
                  </View>
                </View>
              </>
            ) : null}
          </ScrollView>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate("CharacterChat")}
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
