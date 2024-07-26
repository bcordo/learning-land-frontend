import React from "react";
import { Switch } from "react-native";
import { CustomSwitchProps } from "../../intefaces/componentsInterfaces";

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  trackColor,
  thumbColor,
  style,
  value,
  onValueChange,
  disabled,
}): React.JSX.Element => {
  return (
    <Switch
      trackColor={trackColor}
      thumbColor={thumbColor}
      onValueChange={() => onValueChange()}
      value={value}
      style={style}
      ios_backgroundColor={trackColor.false}
      disabled={disabled}
    />
  );
};

export default CustomSwitch;
