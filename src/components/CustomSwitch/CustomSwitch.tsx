import React, { useState } from "react";
import { Switch } from "react-native";

interface CustomSwitchProps {
  trackColor: {
    false: string;
    true: string;
  };
  thumbColor: string;
  ios_backgroundColor: string;
  style: { transform: [{ scaleX: number }, { scaleY: number }] };
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  trackColor,
  thumbColor,
  ios_backgroundColor,
  style,
}): React.JSX.Element => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev);
  };
  return (
    <Switch
      trackColor={trackColor}
      thumbColor={thumbColor}
      ios_backgroundColor={ios_backgroundColor}
      onValueChange={toggleSwitch}
      value={isEnabled}
      style={style}
    />
  );
};

export default CustomSwitch;
