import React, { useEffect } from "react";
import { Text, View } from "react-native";
import CustomSvgImageComponent from "../CustomComponents/Image";
import { styles } from "./styles";
import VolumeUp from "../../assets/icons/volume-up.svg";
import Bookmark from "../../assets/icons/bookmark.svg";
import { useLazyGetTranslatedTextQuery } from "../../../redux/services/translate";
import CustomShimmer from "../CustomShimmer/CustomShimmer";

interface HelphulPharasesCompProps {
  title: string;
  text_language: string;
}

const HelphulPharasesComp: React.FC<HelphulPharasesCompProps> = ({
  title,
  text_language,
}): React.JSX.Element => {
  const [translateText, { data: translatedText, error, isLoading }] =
    useLazyGetTranslatedTextQuery();
  useEffect(() => {
    if (!title) return;
    translateText({
      foreign_text: title,
      source_lang: text_language,
      target_lang: "EN-US",
    });
  }, [title]);

  return (
    <View style={styles.helpfulPharasesListItem}>
      <CustomSvgImageComponent width={18} height={18} Component={VolumeUp} />
      <View style={styles.goalsListTextContainer}>
        <Text style={[styles.defaultFontFamilyBold, styles.goalsListTextBold]}>
          {title}
        </Text>
        {isLoading ? (
          <CustomShimmer
            styleProps={{
              width: "80%",
              height: 10,
              backgroundColor: "#9e9e9e",
              marginTop: 5,
            }}
          />
        ) : (
          <Text style={[styles.defaultFontFamily, styles.goalsListTxt]}>
            {translatedText?.text}
          </Text>
        )}
      </View>
      <CustomSvgImageComponent width={20} height={20} Component={Bookmark} />
    </View>
  );
};

export default HelphulPharasesComp;
