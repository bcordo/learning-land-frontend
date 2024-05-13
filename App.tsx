import React from "react";
import Navigation from "./src/navigation/Navigation.tsx";
import { LogBox } from "react-native";
import { store } from "./redux/store/store.ts";
import { Provider } from "react-redux";
LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
