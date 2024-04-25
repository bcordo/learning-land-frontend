import React from "react";
import { StatusBar } from "react-native";
interface StatusBarProps {
  backgroundColor: string;
  barStyle: "light-content" | "dark-content";
}
const StatusBarComp: React.FC<StatusBarProps> = ({
  backgroundColor,
  barStyle,
}): React.JSX.Element => {
  return (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={barStyle || "light-content"}
    />
  );
};

export default StatusBarComp;
