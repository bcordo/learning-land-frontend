import React from "react";
import { Image, Text, View } from "react-native";
import ProfileContainer from "../ProfileContainer/ProfileContainer";
import { styles } from "./styles";
import CustomSvgImageComponent from "../CustomComponents/Image";
import Pencil from "../../assets/icons/pencil.svg";
import Bookmark from "../../assets/icons/bookmark.svg";

interface UserResponseContainerProps {
  message: string;
}
const UserResponseContainer: React.FC<UserResponseContainerProps> = ({
  message,
}): React.JSX.Element => {
  return (
    <View style={styles.userResponseContainer}>
      <View style={[styles.profileIconContainer]}>
        <Image
          style={styles.profileIcon}
          source={require("../../assets/icons/profileAvatar.png")}
        />
        <Text style={[styles.defaultFontFamily, styles.estherText]}>User</Text>
      </View>
      <ProfileContainer profileAlignmnent={styles.profileAlignmnent} />
      <View style={styles.userResponseTxtContainer}>
        <Text style={[styles.defaultFontFamily, styles.userResponseTxt]}>
          {message}
          {/* <Text style={styles.userResponseTxtOranged}>
            This is an incorrect sentence.
          </Text>{" "}
          This is a user response. This is a user response.
          <Text style={styles.userResponseTxtOranged}>
            {" "}
            This is also incorrect.
          </Text> */}
        </Text>
        <View style={styles.userResponseIconsContainer}>
          <CustomSvgImageComponent width={18} height={18} Component={Pencil} />
          <CustomSvgImageComponent
            width={20}
            height={20}
            Component={Bookmark}
          />
        </View>
      </View>
    </View>
  );
};

export default UserResponseContainer;
