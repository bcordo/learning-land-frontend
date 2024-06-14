import React, { useEffect } from "react";
import { Text, View } from "react-native";
import CustomSvgImageComponent from "../CustomComponents/Image";
import { styles } from "./styles";
import VolumeUp from "../../assets/icons/volume-up.svg";
import Bookmark from "../../assets/icons/bookmark.svg";
import { useLazyGetTranslatedTextQuery } from "../../../redux/services/translate";
import CustomShimmer from "../CustomShimmer/CustomShimmer";
import XSvg from "../../assets/icons/x.svg";
import Tick from "../../assets/icons/check-tick.svg";
import { HelphulPharasesCompProps } from "../../intefaces/componentsInterfaces";

const HelphulPharasesComp: React.FC<HelphulPharasesCompProps> = ({
  title,
  text_language,
  description,
  descriptionColor,
  interaction_type,
  isRight,
  hideDescriptionText,
  showDescriptionIcons,
  isFetching,
}): React.JSX.Element => {
  const [translateText, { data: translatedText, isLoading }] =
    useLazyGetTranslatedTextQuery();

  useEffect(() => {
    if (!title || !text_language || hideDescriptionText || description) return;
    translateText({
      foreign_text: title,
      source_lang: text_language,
      target_lang: "EN-US",
    });
  }, [title, text_language]);

  return (
    <View
      style={{
        alignItems:
          interaction_type === "USER_RESPONSE" ? "flex-end" : "flex-start",
      }}
    >
      <View
        style={[
          styles.helpfulPharasesListItem,
          { width: interaction_type ? "90%" : "100%" },
        ]}
      >
        <CustomSvgImageComponent
          width={18}
          height={18}
          Component={
            interaction_type === "user-response" && isRight
              ? Tick
              : interaction_type === "user-response" && !isRight
              ? XSvg
              : VolumeUp
          }
        />

        <View style={styles.goalsListTextContainer}>
          <View style={styles.tickContainer}>
            {description && showDescriptionIcons ? (
              <CustomSvgImageComponent
                width={18}
                height={18}
                Component={Tick}
              />
            ) : null}
            {isFetching ? (
              <CustomShimmer
                styleProps={{
                  width: "70%",
                  height: 10,
                  backgroundColor: "#9e9e9e",
                }}
              />
            ) : (
              <Text
                style={[
                  styles.defaultFontFamilySemiBold,
                  styles.goalsListTextBold,
                ]}
              >
                {title}
              </Text>
            )}
          </View>
          {description ? (
            showDescriptionIcons ? (
              <View style={[styles.dividerTop, styles.tickContainer]}>
                <CustomSvgImageComponent
                  width={18}
                  height={18}
                  Component={XSvg}
                />
                <Text style={[styles.defaultFontFamily, styles.goalsListTxt]}>
                  {description}
                </Text>
              </View>
            ) : (
              <Text
                style={[
                  descriptionColor
                    ? styles.defaultFontFamilyBold
                    : styles.defaultFontFamily,
                  styles.goalsListTxt,
                  { color: descriptionColor ? descriptionColor : "#737373" },
                ]}
              >
                {description}
              </Text>
            )
          ) : !isFetching && isLoading ? (
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
    </View>
  );
};

export default HelphulPharasesComp;
