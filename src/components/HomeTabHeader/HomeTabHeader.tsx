import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import FireIcon from "../../assets/icons/fire.svg";
import MessageIcon from "../../assets/icons/message-gray.svg";
import CircleIcon from "../../assets/icons/dotCircleBoldGray.svg";
import CustomSvgImageComponent from "../../components/CustomComponents/Image";
import { HomeTabHeaderProps } from "../../intefaces/componentsInterfaces";

const HomeTabHeader: React.FC<HomeTabHeaderProps> = (): React.JSX.Element => {
  return (
    <View style={styles.homeTabHeader}>
      <View style={styles.homeTabHeaderLeft}>
        <View style={styles.homeTabScoreBox}>
          <CustomSvgImageComponent
            width={22}
            height={22}
            Component={FireIcon}
          />
          <Text style={[styles.defaultFontFamilySemiBold, styles.ScoreTxt]}>
            12
          </Text>
        </View>
        <View style={styles.homeTabScoreBox}>
          <CustomSvgImageComponent
            width={22}
            height={22}
            Component={MessageIcon}
          />
          <Text style={[styles.defaultFontFamilySemiBold, styles.ScoreTxt]}>
            12
          </Text>
        </View>
      </View>
      <View style={styles.homeTabScoreBox}>
        <CustomSvgImageComponent
          width={27}
          height={28}
          Component={CircleIcon}
        />
      </View>
    </View>
  );
};

export default HomeTabHeader;
