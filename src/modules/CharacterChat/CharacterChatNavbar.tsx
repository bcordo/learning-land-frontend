import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import CustomSvgImageComponent from "../../components/CustomComponents/Image";
import ChevronDown from "../../assets/icons/chevronDown.svg";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePauseTimmer,
  updateTime,
} from "../../../redux/slices/timmerSlice";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";

const CharacterChatNavbar = ({ navigation }): React.JSX.Element => {
  const [id, setId] = useState<string>("1");

  const dispatch = useDispatch();

  const data = [
    { id: "1", value: "Order", subVal: "Order a coffee with oat milk" },
    { id: "2", value: "Get her number", subVal: "Get her telephone number" },
    { id: "3", value: "Setup date", subVal: "Setup a date to meet her later" },
  ];

  const { totalSeconds, minutes, seconds, pauseTimmer } = useSelector(
    (state) => state.timmerSlice
  );

  useEffect(() => {
    if (pauseTimmer) return;
    const interval = setInterval(() => {
      if (totalSeconds >= 0) {
        dispatch(
          updateTime({
            minutes: Math.floor(totalSeconds / 60),
            seconds: totalSeconds % 60,
            totalSeconds: totalSeconds - 1,
          })
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [totalSeconds, pauseTimmer]);

  const renderItem = (item) => (
    <View
      style={[
        styles.goalsDropdownSubContainer,
        item.id === data[data.length - 1].id
          ? styles.lastGoalsDropdownSubContainer
          : null,
      ]}
    >
      {id === item.id ? (
        <Image
          style={styles.goalsDropdownContainerIcon}
          source={require("../../assets/icons/Progress_step.png")}
        />
      ) : (
        <View style={styles.stepCircleOutlined}></View>
      )}

      <View>
        <Text style={[styles.defaultFontFamilyBold, styles.goalsValue]}>
          {item.value}
        </Text>
        <Text style={[styles.defaultFontFamily, , styles.goalsValue]}>
          {item.subVal}
        </Text>
      </View>
    </View>
  );
  return (
    <View style={styles.characterNavContainer}>
      <View style={styles.pauseIconContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TimerPausedScreen");
            dispatch(updatePauseTimmer(true));
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
          list={data}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownTxtContainer}>
                <Text style={[styles.orangeText, styles.defaultFontFamily]}>
                  0 of 3 goals
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
          <View style={styles.stepCircle}>
            <View style={styles.stepCircleOutlined}></View>
          </View>
          <View style={styles.stepLine}></View>
          <View style={styles.stepCircle}>
            <View style={styles.stepCircleOutlined}></View>
          </View>
          <View style={styles.stepLine}></View>
          <View style={styles.stepCircleOutlined}></View>
        </View>
      </View>
      <View style={styles.wrapper}>
        <AnimatedCircularProgress
          size={40}
          width={2}
          fill={(5 * 60 - totalSeconds) * (100 / (5 * 60))}
          tintColor="#7DDFDE"
          backgroundColor="#F1F5F9"
          lineCap="round"
          rotation={0}
        >
          {(fill) => (
            <View style={styles.wrapper2}>
              <View style={styles.wrapper3}>
                <Text style={[styles.defaultFontFamilyBold, styles.timer]}>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              </View>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
};

export default CharacterChatNavbar;
