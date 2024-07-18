import React, { useEffect } from "react";
import Navigation from "./src/navigation/Navigation.tsx";
import { LogBox } from "react-native";
import { store } from "./redux/store/store.ts";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
// import { AudioPlayerProvider } from "./src/customHooks/AudioPlayerContext.tsx";
import CustomToast from "./src/components/CustomToast/CustomToast.tsx";
LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      {/* <AudioPlayerProvider> */}
        <Navigation />
        <CustomToast />
      {/* </AudioPlayerProvider> */}
    </Provider>
  );
}

export default App;
