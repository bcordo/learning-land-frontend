import LottieView from "lottie-react-native";
import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

interface ProfileContainerProps {
  profileAlignmnent?: {};
  isTyping?: boolean;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({
  isTyping,
}): React.JSX.Element => {
  return (
    <>
      {isTyping ? (
        <View style={styles.typingBox}>
          <LottieView
            style={{ width: 50, height: 35 }}
            source={require("../../assets/animations/typing.json")}
            autoPlay
            loop
          />
        </View>
      ) : (
        ""
      )}
    </>
  );
};
export default ProfileContainer;
