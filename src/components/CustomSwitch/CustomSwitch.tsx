import React, { useState } from "react";
import { Switch } from "react-native";

interface CustomSwitchProps {
  trackColor: {
    false: string;
    true: string;
  };
  thumbColor: string;
  value: boolean;
  style: { transform: [{ scaleX: number }, { scaleY: number }] };
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  trackColor,
  thumbColor,
  style,
  value,
}): React.JSX.Element => {
  return (
    <Switch
      trackColor={trackColor}
      thumbColor={thumbColor}
      // onValueChange={toggleSwitch}
      value={value}
      style={style}
      ios_backgroundColor={trackColor.false}
    />
  );
};

export default CustomSwitch;
