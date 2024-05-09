import React from "react";
import { styles } from "./styles";
import FadedDivider from "../FadedDivider/FadedDivider";
import { Text, TouchableOpacity, View } from "react-native";
import CustomSvgImageComponent from "../CustomComponents/Image";
import Stars from "../../assets/icons/stars.svg";
import Bookmark from "../../assets/icons/bookmark.svg";
import CircleDot from "../../assets/icons/circle-dot.svg";

interface assistantCorrectionProps {
  text: string;
}
const AssistantCorrection: React.FC<assistantCorrectionProps> = ({
  text,
}): React.JSX.Element => {
  return (
    <>
      <FadedDivider
        style={{ marginVertical: 11 }}
        color={[
          "rgba(255, 255, 255, 0)",
          "rgba(0, 0, 0, 0.5)",
          "rgba(255, 255, 255, 0)",
        ]}
      />
      <View style={styles.trySayingInstedContainer}>
        <CustomSvgImageComponent width={18} height={18} Component={Stars} />
        <View style={{ width: "92%" }}>
          <Text style={[styles.defaultFontFamily, styles.trySayingInstedTxt]}>
            {text}
          </Text>
        </View>
      </View>
      <View style={styles.characterChatButtonsBox}>
        <TouchableOpacity
          style={styles.characterChatButtons}
          onPress={() => {}}
        >
          <CustomSvgImageComponent
            width={18}
            height={18}
            Component={CircleDot}
          />
          <Text
            style={[
              styles.defaultFontFamilyBold,
              styles.characterChatButtonTxt,
            ]}
          >
            Explain to me
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.characterChatButtons}
          onPress={() => {}}
        >
          <CustomSvgImageComponent
            width={18}
            height={18}
            Component={Bookmark}
          />
          <Text
            style={[
              styles.defaultFontFamilyBold,
              styles.characterChatButtonTxt,
            ]}
          >
            Add to core phrases
          </Text>
        </TouchableOpacity>
      </View>
      <FadedDivider
        style={{ marginVertical: 11 }}
        color={[
          "rgba(255, 255, 255, 0)",
          "rgba(0, 0, 0, 0.5)",
          "rgba(255, 255, 255, 0)",
        ]}
      />
    </>
  );
};

export default AssistantCorrection;
