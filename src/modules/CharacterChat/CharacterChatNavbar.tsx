import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import CustomSvgImageComponent from "../../components/CustomComponents/Image";
import ChevronDown from "../../assets/icons/chevronDown.svg";

const CharacterChatNavbar = (): React.JSX.Element => {
  return (
    <View style={styles.characterNavContainer}>
      <View style={styles.pauseIconContainer}>
        <Image
          style={styles.pauseIcon}
          source={require("../../assets/icons/pauseIcon.png")}
        />
      </View>

      <View style={styles.dropdownContainer}>
        <View style={styles.dropdownTxtContainer}>
          <Text style={styles.orangeText}>0 of 3 goals</Text>
          <CustomSvgImageComponent
            width={16}
            height={16}
            Component={ChevronDown}
          />
        </View>
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
