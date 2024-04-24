import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import StatusBarComp from "../../components/StatusBar/statusBar";

function SplashScreen({ navigation }): React.JSX.Element {
  useFocusEffect(() => {
    setTimeout(() => {
      navigation.navigate("CharacterChat");
    }, 2000);
  });

  return (
    <View style={styles.container}>
      <StatusBarComp backgroundColor={"#F58C39"} barStyle={"light-content"} />
      <View style={styles.iconContainer}>
        <Image source={require("../../assets/icons/LandingLogo.png")} />
      </View>
      <View>
        <Text style={styles.onboardingText}>Learning</Text>
        <Text style={styles.onboardingText}>Land </Text>
      </View>
    </View>
  );
}

export default SplashScreen;
