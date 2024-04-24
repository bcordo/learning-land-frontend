import React, { Fragment } from "react";
import { Image, Text, View } from "react-native";
import FadedDivider from "../FadedDivider/FadedDivider";
import { styles } from "./styles";
interface FadedDividerTextProps {
  fadedDividerTextColor?: {};
  color: string[];
  showIcon?: boolean;
  text: string;
  idx?: any;
}
const FadedDividerText: React.FC<FadedDividerTextProps> = ({
  fadedDividerTextColor,
  color,
  idx,
  showIcon,
  text,
}): React.JSX.Element => {
  console.log(idx, "idx");
  return (
    <Fragment key={idx}>
      <FadedDivider style={{ marginVertical: 11 }} color={color} />
      <View
        style={[
          styles.fadedDividerTextContainer,
          { justifyContent: showIcon ? "flex-start" : "center" },
        ]}
      >
        {showIcon ? (
          <Image source={require("../../assets/icons/stars.png")} />
        ) : (
          ""
        )}
        <Text style={[styles.fadedDividerText, fadedDividerTextColor]}>
          {text}
        </Text>
      </View>
      <FadedDivider style={{ marginVertical: 11 }} color={color} />
    </Fragment>
  );
};

export default FadedDividerText;
