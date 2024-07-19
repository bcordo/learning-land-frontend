import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import CustomSvgImageComponent from "../../components/CustomComponents/Image";
import ChevronDown from "../../assets/icons/chevronDown.svg";
import { useDispatch, useSelector } from "react-redux";
import { updatePauseTimmer } from "../../../redux/slices/timmerSlice";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import { updateUserSettings } from "../../../redux/slices/userSetingsSlice";
import { CharacterChatNavbarProps } from "../../intefaces/componentsInterfaces";
import { NumberInterface } from "../../intefaces/variablesInterfaces";
import CustomTimerComponent from "../../components/CustomTimerComponent/CustomTimerComponent";
import { AudioPlayerContext } from "../../customHooks/AudioPlayerContext";

const CharacterChatNavbar: React.FC<CharacterChatNavbarProps> = ({
  navigation,
  userSettings,
}): React.JSX.Element => {
  const audioPlayerContext = useContext(AudioPlayerContext);
  const [completedGoals, setCompletedGoals] = useState(0);
  const [id, setId] = useState<NumberInterface>(0);
  const [userGoals, setUserGoals] = useState([]);

  const user_mission = useSelector((state) => state.missionSlice.mission);
  
  useEffect(() => {
    if (!user_mission) return;
    const goals = [...user_mission?.goals];
    const user_goals = [...user_mission?.user_goals];

    if (!goals?.length && !user_goals?.length) return;
    const goalsWithStatus: any = [];
    goals?.forEach((goal) => {
      const filterUserGoal = user_goals?.find(
        (item) => item?.goal_id === goal?.id
      );
      if (filterUserGoal) {
        goalsWithStatus.push({
          ...filterUserGoal,
          ...goal,
        });
      }
    });
    if (goalsWithStatus?.length > 0) {
      setUserGoals([...goalsWithStatus]);
    }
  }, [user_mission]);

  useEffect(() => {
    if (userGoals?.length) {
      const res = userGoals.filter(
        (goal: { state: string }) => goal.state === "COMPLETED"
      );

      setCompletedGoals(res?.length);
      setId(res?.length);
    }
  }, [userGoals]);

  const dispatch = useDispatch();

  const data = [
    { id: 1, value: "Order", subVal: "Order a coffee with oat milk" },
    { id: 2, value: "Get her number", subVal: "Get her telephone number" },
    { id: 3, value: "Setup date", subVal: "Setup a date to meet her later" },
  ];

  const renderItem = (item) => {
    return (
      <View
        style={[
          styles.goalsDropdownSubContainer,
          // item.id === data[data.length - 1].id
          //   ? styles.lastGoalsDropdownSubContainer
          //   : null,
          // { gap: id >= item.id ? 8 : 10 },
        ]}
      >
        {item?.state === "FAILED" ? (
          <Image
            style={[styles.goalsDropdownContainerIcon, { marginLeft: -5 }]}
            source={require("../../assets/icons/goals_x.png")}
          />
        ) : item?.state === "INACTIVE" ? (
          <View style={styles.stepCircleOutlined}></View>
        ) : item?.state === "COMPLETED" ? (
          <Image
            style={[styles.goalsDropdownContainerIcon, { marginLeft: -5 }]}
            source={require("../../assets/icons/Progress_step.png")}
          />
        ) : (
          ""
        )}

        <View style={{ gap: 5, width: "85%" }}>
          <Text style={[styles.defaultFontFamilySemiBold, styles.goalsValue]}>
            {item.title}
          </Text>
          <Text style={[styles.defaultFontFamily, , styles.goalsValue]}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.characterNavContainer}>
      <View style={styles.pauseIconContainer}>
        <TouchableOpacity
          onPress={() => {
            dispatch(updateUserSettings(userSettings));
            navigation.navigate("TimerPausedScreen");
            dispatch(updatePauseTimmer(true));
            audioPlayerContext?.stopAudio();
          }}
        >
          <Image
            style={styles.pauseIcon}
            source={require("../../assets/icons/pauseIcon.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.dropdownContainer}>
        <CustomDropdown
          list={userGoals}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownTxtContainer}>
                <Text style={[styles.orangeText, styles.defaultFontFamily]}>
                  {`  ${id} of ${userGoals?.length} goals`}
                </Text>
                <CustomSvgImageComponent
                  width={16}
                  height={16}
                  Component={ChevronDown}
                />
              </View>
            );
          }}
          renderItem={renderItem}
          dropdownStyle={styles.dropdownMenuStyle}
        />

        <View style={styles.stepperContainer}>
          {userGoals.map((e, i) => (
            <>
              <View style={styles.stepCircle}>
                {id < i + 1 ? (
                  <View style={styles.stepCircleOutlined}></View>
                ) : (
                  <Image
                    style={[
                      styles.goalsDropdownContainerIcon,
                      { marginTop: -4, width: 26 },
                    ]}
                    source={require("../../assets/icons/Progress_step.png")}
                  />
                )}
              </View>
              {i !== userGoals?.length - 1 && (
                <View
                  style={[
                    styles.stepLine,
                    {
                      alignItems: id > i ? "flex-start" : "flex-end",
                      marginLeft: id > i ? -4 : 0,
                    },
                  ]}
                >
                  {id > i && (
                    <View
                      style={[
                        styles.stepLineFilled,
                        { width: id > i + 1 ? "100%" : "50%" },
                      ]}
                    ></View>
                  )}
                </View>
              )}
            </>
          ))}
        </View>
      </View>
      <CustomTimerComponent navigation={navigation} />
    </View>
  );
};

export default CharacterChatNavbar;
