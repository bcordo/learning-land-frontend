import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import CustomSvgImageComponent from "../../components/CustomComponents/Image";
import ChevronDown from "../../assets/icons/chevronDown.svg";
import { useDispatch } from "react-redux";
import { updatePauseTimmer } from "../../../redux/slices/timmerSlice";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import { updateUserSettings } from "../../../redux/slices/userSetingsSlice";
import { CharacterChatNavbarProps } from "../../intefaces/componentsInterfaces";
import { NumberInterface } from "../../intefaces/variablesInterfaces";
import CustomTimerComponent from "../../components/CustomTimerComponent/CustomTimerComponent";

const CharacterChatNavbar: React.FC<CharacterChatNavbarProps> = ({
  navigation,
  userSettings,
}): React.JSX.Element => {
  const completedGoals = 0;
  const [id, setId] = useState<NumberInterface>(completedGoals);
  console.log("hell");

  const dispatch = useDispatch();
  const totalGoals = 3;

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
          item.id === data[data.length - 1].id
            ? styles.lastGoalsDropdownSubContainer
            : null,
          { gap: id >= item.id ? 8 : 10 },
        ]}
      >
        {id >= item.id ? (
          <Image
            style={[styles.goalsDropdownContainerIcon, { marginLeft: -5 }]}
            source={require("../../assets/icons/Progress_step.png")}
          />
        ) : (
          <View style={styles.stepCircleOutlined}></View>
        )}

        <View style={{ gap: 5 }}>
          <Text style={[styles.defaultFontFamilySemiBold, styles.goalsValue]}>
            {item.value}
          </Text>
          <Text style={[styles.defaultFontFamily, , styles.goalsValue]}>
            {item.subVal}
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
                  {`  ${id} of ${totalGoals} goals`}
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
          {data.map((e, i) => (
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
              {i !== 2 && (
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
      <CustomTimerComponent />
    </View>
  );
};

export default CharacterChatNavbar;
