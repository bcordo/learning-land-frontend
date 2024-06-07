import React, { Fragment } from "react";
import { Text, View } from "react-native";
import FadedDivider from "../FadedDivider/FadedDivider";
import { styles } from "./styles";
import OrangeStars from "../../assets/icons/orange-stars.svg";
import CustomSvgImageComponent from "../CustomComponents/Image";
import { FadedDividerTextProps } from "../../intefaces/componentsInterfaces";

const FadedDividerText: React.FC<FadedDividerTextProps> = ({
  fadedDividerTextColor,
  color,
  idx,
  showIcon,
  text,
}): React.JSX.Element => {
  return (
    <Fragment key={idx}>
      <FadedDivider
        style={{ marginVertical: 11, width: "100%" }}
        color={color}
      />
      <View style={[styles.fadedDividerTextContainer]}>
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
            { marginHorizontal: showIcon ? 10 : 24 },
          ]}
        >
          {text}
        </Text>
      </View>
      <FadedDivider
        style={{ marginVertical: 11, width: "100%" }}
        color={color}
      />
    </Fragment>
  );
};

export default FadedDividerText;
