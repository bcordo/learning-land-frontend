import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

const CharacterChatNavbar = (): React.JSX.Element => {
  return (
    <View style={styles.characterNavContainer}>
      <Image
        style={styles.pauseIcon}
        source={require("../../assets/icons/pauseIcon.png")}
      />

      <View style={styles.dropdownContainer}>
        <View style={styles.dropdownTxtContainer}>
          <Text style={styles.orangeText}>2 of 3 goals</Text>
          <Image source={require("../../assets/icons/chevronDown.png")} />
        </View>
        <View style={styles.stepperContainer}>
          <View style={styles.stepCircle}>
            <Image source={require("../../assets/icons/check.png")} />
          </View>
          <View style={styles.stepLine}></View>
          <View style={styles.stepCircle}>
            <Image source={require("../../assets/icons/check.png")} />
          </View>
          <View style={styles.stepLineHalfFilled}></View>
          <View style={styles.stepLineHalfOutlined}></View>
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
