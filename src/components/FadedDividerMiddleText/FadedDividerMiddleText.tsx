import React from "react";
import { Text, View } from "react-native";
import { LIGHT_BLACK_FADED_COLOR } from "../../assets/constant";
import LinearGradient from "react-native-linear-gradient";

interface FadedDividerMiddleTextProps {
  text: string;
}

const FadedDividerMiddleText: React.FC<FadedDividerMiddleTextProps> = ({
  text,
}): React.JSX.Element => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <LinearGradient
          colors={LIGHT_BLACK_FADED_COLOR}
          start={{ x: 2, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={{ height: 1, width: "100%" }}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          color: "#A3A3A3",
          lineHeight: 20,
          fontFamily: "Montserrat-Regular",
        }}
      >
        {text}
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <LinearGradient
          colors={LIGHT_BLACK_FADED_COLOR}
          start={{ x: 2, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={{
            height: 1,
            width: "100%",
            transform: [{ rotate: "180deg" }],
          }}
        />
      </View>
    </View>
  );
};

export default FadedDividerMiddleText;
