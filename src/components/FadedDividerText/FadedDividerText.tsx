import React, { Fragment } from "react";
import { Text, View } from "react-native";
import FadedDivider from "../FadedDivider/FadedDivider";
import { styles } from "./styles";
import OrangeStars from "../../assets/icons/orange-stars.svg";
import CustomSvgImageComponent from "../CustomComponents/Image";
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
          <CustomSvgImageComponent
            width={18}
            height={18}
            Component={OrangeStars}
          />
        ) : (
          ""
        )}
        <Text
          style={[
            styles.defaultFontFamily,
            styles.fadedDividerText,
            fadedDividerTextColor,
          ]}
        >
          {text}
        </Text>
      </View>
      <FadedDivider style={{ marginVertical: 11 }} color={color} />
    </Fragment>
  );
};

export default FadedDividerText;
