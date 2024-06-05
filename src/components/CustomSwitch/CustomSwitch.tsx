import React from "react";
import { Switch } from "react-native";
import {
  updateUserSettingsByType,
  updateUserSettings,
} from "../../../redux/slices/userSetingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserSettingsMutation } from "../../../redux/services/user_settings";

interface CustomSwitchProps {
  trackColor: {
    false: string;
    true: string;
  };
  thumbColor: string;
  value: boolean;
  name: string;
  onValueChange: Function;
  style: { transform: [{ scaleX: number }, { scaleY: number }] };
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  trackColor,
  thumbColor,
  style,
  value,
  onValueChange,
}): React.JSX.Element => {
  return (
    <Switch
      trackColor={trackColor}
      thumbColor={thumbColor}
      onValueChange={() => onValueChange()}
      value={value}
      style={style}
      ios_backgroundColor={trackColor.false}
    />
  );
};

export default CustomSwitch;
