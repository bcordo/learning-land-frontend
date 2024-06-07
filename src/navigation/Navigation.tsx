import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CharacterChat from "../modules/CharacterChat/CharacterChat";
import LandingPage from "../modules/LandingPage/LandingPage";
import SplashScreen from "../modules/SplashScreen/SplashScreen";
import TimerPaused from "../modules/TimerPaused/TimerPaused";
import MissionStart from "../modules/MissionStart/MissionStart";
import HelpfulPharasesListContainer from "../components/HelpfulPharasesListContainer/HelpfulPharasesListContainer";
import MissionEnd from "../modules/MissionEnd/MissionEnd";
import HomeTab from "../modules/HomeTab/HomeTab";
import MissionHistory from "../modules/MissionHistory/MissionHistory";

const Stack = createNativeStackNavigator();

const Navigation = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Landing"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CharacterChat"
          component={CharacterChat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TimerPausedScreen"
          component={TimerPaused}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MissionStart"
          component={MissionStart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HelpfulPharases"
          component={HelpfulPharasesListContainer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MissionEnd"
          component={MissionEnd}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeTab"
          component={HomeTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MissionHistory"
          component={MissionHistory}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
