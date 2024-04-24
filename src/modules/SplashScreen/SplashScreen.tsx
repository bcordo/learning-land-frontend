import { useFocusEffect } from "@react-navigation/native";
import type { PropsWithChildren } from "react";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function SplashScreen({ navigation }): React.JSX.Element {
  useFocusEffect(() => {
    setTimeout(() => {
      navigation.navigate("CharacterChat");
    }, 2000);
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text>Icon</Text>
      </View>
      <Text style={styles.onboardingText}>Learning Land</Text>
    </View>
  );
}

export default SplashScreen;
