import React, { useEffect } from "react";
import Navigation from "./src/navigation/Navigation.tsx";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import { store } from "./redux/store/store.ts";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import { AudioPlayerProvider } from "./src/customHooks/AudioPlayerContext.tsx";
import CustomToast from "./src/components/CustomToast/CustomToast.tsx";
import { WebSocketProvider } from "./src/customHooks/WebSocketContext.tsx";
LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AudioPlayerProvider>
          <WebSocketProvider>
            <Navigation />
            <CustomToast />
          </WebSocketProvider>
        </AudioPlayerProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
