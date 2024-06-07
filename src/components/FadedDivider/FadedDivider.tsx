import React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "./styles";
import { FadedDividerProps } from "../../intefaces/componentsInterfaces";

const FadedDivider: React.FC<FadedDividerProps> = ({
  style,
  color,
}): React.JSX.Element => {
  return (
    <View style={[styles.fadedDivider, style]}>
      <LinearGradient
        colors={color}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      />
    </View>
  );
};

export default FadedDivider;
