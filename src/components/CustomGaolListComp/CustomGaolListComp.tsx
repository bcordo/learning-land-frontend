import React from "react";
import { View, Text } from "react-native";
import CustomSvgImageComponent from "../CustomComponents/Image";
import { styles } from "./styles";
import CustomShimmer from "../CustomShimmer/CustomShimmer";

interface CustomGoalListComponentProps {
  icon: any;
  title: string;
  description: string;
  isFetching: boolean;
}

const CustomGoalListComponent: React.FC<CustomGoalListComponentProps> = ({
  icon,
  title,
  description,
  isFetching,
}): React.JSX.Element => {
  return (
    <View style={styles.goalsList}>
      <CustomSvgImageComponent width={20} height={20} Component={icon} />
      <View>
        {isFetching ? (
          <CustomShimmer
            styleProps={{
              width: "100%",
              height: 10,
              backgroundColor: "#9e9e9e",
            }}
          />
        ) : (
          <>
            <Text
              style={[
                styles.defaultFontFamilySemiBold,
                styles.goalsListTextBold,
              ]}
            >
              {title}
            </Text>
            <Text style={[styles.defaultFontFamily, styles.goalsListTxt]}>
              {description}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default CustomGoalListComponent;
