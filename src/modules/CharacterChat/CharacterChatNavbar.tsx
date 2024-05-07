import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import CustomSvgImageComponent from "../../components/CustomComponents/Image";
import ChevronDown from "../../assets/icons/chevronDown.svg";

const CharacterChatNavbar = (): React.JSX.Element => {
  const [id, setId] = useState<string>("1");
  const [showGoals, setShowGoals] = useState<boolean>(false);
  const data = [
    { id: "1", value: "Order", subVal: "Order a coffee with oat milk" },
    { id: "2", value: "Get her number", subVal: "Get her telephone number" },
    { id: "3", value: "Setup date", subVal: "Setup a date to meet her later" },
  ];

  const renderItem = ({ item }) => (
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
        <Image
          style={styles.pauseIcon}
          source={require("../../assets/icons/pauseIcon.png")}
        />
      </View>

      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownTxtContainer}
          onPress={() => setShowGoals((prev) => !prev)}
        >
          <Text style={[styles.orangeText, styles.defaultFontFamily]}>
            0 of 3 goals
          </Text>
          <CustomSvgImageComponent
            width={16}
            height={16}
            Component={ChevronDown}
          />
        </TouchableOpacity>
        {showGoals ? (
          <View style={styles.goalsDropdownContainer}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        ) : null}
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
      <Image
        style={styles.timer}
        source={require("../../assets/icons/timer.png")}
      />
    </View>
  );
};

export default CharacterChatNavbar;
