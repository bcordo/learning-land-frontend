import React from "react";
import { View, Text } from "react-native";
import CustomSvgImageComponent from "../CustomComponents/Image";
import { styles } from "./styles";

interface CustomGoalListComponentProps {
  icon: any;
  title: string;
  description: string;
}

const CustomGoalListComponent: React.FC<CustomGoalListComponentProps> = ({
  icon,
  title,
  description,
}): React.JSX.Element => {
  return (
    <View style={styles.goalsList}>
      <CustomSvgImageComponent width={20} height={20} Component={icon} />
      <View>
        <Text style={[styles.defaultFontFamilyBold, styles.goalsListTextBold]}>
          {title}
        </Text>
        <Text style={[styles.defaultFontFamily, styles.goalsListTxt]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default CustomGoalListComponent;
