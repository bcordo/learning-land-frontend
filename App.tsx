import React from "react";
import Navigation from "./src/navigation/Navigation.tsx";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();

function App(): React.JSX.Element {
  return <Navigation />;
}

export default App;
