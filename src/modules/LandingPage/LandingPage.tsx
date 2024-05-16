import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import StatusBarComp from "../../components/StatusBarComp/StatusBarComp";

interface LandingPageProps {
  navigation: any;
}

const LandingPage: React.FC<LandingPageProps> = ({
  navigation,
}): React.JSX.Element => {
  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <View style={styles.iconContainer}>
              <Image
                style={{
                  width: 106,
                  height: 112,
                  marginBottom: 40,
                }}
                source={require("../../assets/icons/landing-page-logo.png")}
              />
            </View>

            <Text
              style={[styles.learningLandText, styles.defaultFontFamilyBold]}
            >
              Learning
            </Text>
            <Text
              style={[styles.learningLandText, styles.defaultFontFamilyBold]}
            >
              Land
            </Text>
            <View style={{ marginTop: 8 }}>
              <Text style={[styles.blackText, styles.defaultFontFamily]}>
                Personalized education{" "}
              </Text>
              <Text style={[styles.blackText, styles.defaultFontFamily]}>
                For everyone
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.getStarted}
              onPress={() => navigation.navigate("MissionStart")}
            >
              <Text
                style={[
                  styles.getStartedButtonText,
                  styles.defaultFontFamilyBold,
                ]}
              >
                GET STARTED
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.alreadyHaveAnAccount}
              onPress={() => {}}
            >
              <Text
                style={[
                  styles.alreadyHaveAccountButtonText,
                  styles.defaultFontFamilyBold,
                ]}
              >
                I ALREADY HAVE AN ACCOUNT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
export default LandingPage;
