import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { HelpfulActionsContainerProps } from "../../intefaces/componentsInterfaces";

const HelpfulActionsContainer: React.FC<HelpfulActionsContainerProps> = ({
  list,
  renderItem,
  buttonText,
  heading,
  navigation,
  navigationRoute,
  handleButton,
  buttonTextCheck,
}): React.JSX.Element => {
  return (
    <View style={styles.incorrectPhaseContainer}>
      <View style={styles.helpfulPharasesHeader}>
        <Text
          style={[styles.helpfulPharasesTxt, styles.defaultFontFamilySemiBold]}
        >
          {heading}
        </Text>
        <TouchableOpacity
          onPress={() =>
            handleButton ? handleButton() : navigation.navigate(navigationRoute)
          }
        >
          {buttonTextCheck ? (
            <Text style={[styles.seeAllPharasesTxt, styles.defaultFontFamily]}>
              {buttonText}
            </Text>
          ) : (
            ""
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.helpfulPharasesListContainer}>
        <FlatList data={list} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default HelpfulActionsContainer;
