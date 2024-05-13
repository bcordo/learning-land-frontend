import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CharacterChat from "../modules/CharacterChat/CharacterChat";
import LandingPage from "../modules/LandingPage/LandingPage";
import SplashScreen from "../modules/SplashScreen/SplashScreen";
import TimerPaused from "../modules/TimerPaused/TimerPaused";

const Stack = createNativeStackNavigator();

const Navigation = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
