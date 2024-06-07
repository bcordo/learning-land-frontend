import React from "react";
import { StatusBar, StatusBarProps } from "react-native";

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
