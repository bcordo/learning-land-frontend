import React, { useEffect } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { styles } from "./styles";
import StatusBarComp from "../../components/StatusBarComp/StatusBarComp";
import CustomButtom from "../../components/CustomButtom/CustomButtom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useSignUpUserMutation } from "../../../redux/services/signupApi";
import { NavigationInterface } from "../../intefaces/componentsInterfaces";

const LandingPage: React.FC<NavigationInterface> = ({
  navigation,
}): React.JSX.Element => {
  const [signUpApi] = useSignUpUserMutation();

  const generateEmailAndPassword = () => {
    const email = `user_${uuid.v4()}@example.com`;
    const password = uuid.v4();
    return { email, password };
  };
  useEffect(() => {
    const authenticate = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        const { email, password } = generateEmailAndPassword();
        const details = {
          email,
          is_active: true,
          is_superuser: false,
          is_staff: false,
          first_name: "string",
          last_name: "string",
          phone_number: "string",
          age: 0,
          gender: "M",
          description: "string",
          language_level: "A1",
          learning_language: "BG",
          native_language: "BG",
          password,
          hashed_password: password,
        };
        try {
          const response = await signUpApi({ body: details });
          if (response?.data) {
            const { access_token } = response?.data;
            await AsyncStorage.setItem("token", access_token);
            await AsyncStorage.setItem("email", details?.email);
            await AsyncStorage.setItem("password", details?.password);
          }
        } catch (error) {
          console.error("ERROR" + error.response.data);
        }
      }
    };

    authenticate();
  }, []);
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
                  marginBottom: 25,
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
                Personalized education.{" "}
              </Text>
              <Text style={[styles.blackText, styles.defaultFontFamily]}>
                For everyone.
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButtom
              textStyle={[
                styles.getStartedButtonText,
                styles.defaultFontFamilySemiBold,
              ]}
              buttonStyle={styles.getStarted}
              onPress={() => navigation.navigate("HomeTab")}
              buttonTxt={"GET STARTED"}
            />
            {/* <CustomButtom
              textStyle={[
                styles.alreadyHaveAccountButtonText,
                styles.defaultFontFamilySemiBold,
              ]}
              buttonStyle={styles.alreadyHaveAnAccount}
              onPress={() => {}}
              buttonTxt={"I ALREADY HAVE AN ACCOUNT"}
            /> */}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
export default LandingPage;
