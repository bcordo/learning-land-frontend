import React from "react";
import { Image, Text, View } from "react-native";
import ProfileContainer from "../ProfileContainer/ProfileContainer";
import { styles } from "./styles";

interface UserResponseContainerProps {}
const UserResponseContainer: React.FC<
  UserResponseContainerProps
> = (): React.JSX.Element => {
  return (
    <View style={styles.userResponseContainer}>
      <ProfileContainer profileAlignmnent={styles.profileAlignmnent} />
      <View style={styles.userResponseTxtContainer}>
        <Text style={styles.userResponseTxt}>
          <Text style={styles.userResponseTxtOranged}>
            This is an incorrect sentence.
          </Text>{" "}
          This is a user response. This is a user response.
          <Text style={styles.userResponseTxtOranged}>
            {" "}
            This is also incorrect.
          </Text>
        </Text>
        <View style={styles.userResponseIconsContainer}>
          <Image source={require("../../assets/icons/pencil.png")} />
          <Image source={require("../../assets/icons/bookmark.png")} />
        </View>
      </View>
    </View>
  );
};

export default UserResponseContainer;
