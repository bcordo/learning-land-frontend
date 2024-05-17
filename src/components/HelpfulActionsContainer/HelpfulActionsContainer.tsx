import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface HelpfulActionsContainerProps {
  list: [
    {
      title: string;
      description: string;
      descriptionColor?: string;
      type?: string;
      hideDescriptionText?: boolean;
      isRight: boolean;
      text_language: string;
      showDescriptionIcons?: boolean;
    }
  ];
  renderItem: Function;
  buttonText: string;
  heading: string;
  navigation: any;
  navigationRoute: string;
}

const HelpfulActionsContainer: React.FC<HelpfulActionsContainerProps> = ({
  list,
  renderItem,
  buttonText,
  heading,
  navigation,
  navigationRoute,
}): React.JSX.Element => {
  return (
    <View style={styles.incorrectPhaseContainer}>
      <View style={styles.helpfulPharasesHeader}>
        <Text style={[styles.helpfulPharasesTxt, styles.defaultFontFamilyBold]}>
          {heading}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate(navigationRoute)}>
          <Text style={[styles.seeAllPharasesTxt, styles.defaultFontFamily]}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.helpfulPharasesListContainer}>
        <FlatList data={list} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default HelpfulActionsContainer;
