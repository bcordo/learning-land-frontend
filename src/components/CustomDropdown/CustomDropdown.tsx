import React, { ReactNode } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { CustomDropdownProps } from "../../intefaces/componentsInterfaces";

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  list,
  renderButton,
  renderItem,
  dropdownStyle,
  onSelect,
  dropdownOverlayColor,
  disabled
}): React.JSX.Element => {
  return (
    <SelectDropdown
      data={list}
      dropdownOverlayColor={dropdownOverlayColor || "transparent"}
      onSelect={onSelect}
      renderButton={renderButton}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      dropdownStyle={{ ...dropdownStyle }}
      disabled={disabled}
    />
  );
};

export default CustomDropdown;
