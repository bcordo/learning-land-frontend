import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const LandingPagge = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.iconContainer}>
          <Text>Icon</Text>
        </View>

        <Text style={styles.learningLandText}>Learning Land</Text>
        <View>
          <Text style={styles.blackText}>Personalized education </Text>
          <Text style={styles.blackText}>For everyone</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.getStarted}
          onPress={() => {
            // Handle button press
          }}
        >
          <Text style={styles.getStartedButtonText}>GET STARTED</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.alreadyHaveAnAccount}
          onPress={() => {
            // Handle button press
          }}
        >
          <Text style={styles.alreadyHaveAccountButtonText}>
            I ALREADY HAVE AN ACCOUNT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LandingPagge;
