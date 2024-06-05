import React, { useEffect } from "react";
import Navigation from "./src/navigation/Navigation.tsx";
import { LogBox } from "react-native";
import { store } from "./redux/store/store.ts";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
