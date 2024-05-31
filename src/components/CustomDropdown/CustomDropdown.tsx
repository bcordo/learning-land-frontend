import React, { ReactNode } from "react";
import SelectDropdown from "react-native-select-dropdown";

interface RenderItemFunction {
  (item: {}, index?: number, isSelected?: boolean): JSX.Element;
}
interface CustomDropdownProps {
  list: {}[];
  renderButton: (selectedItem: any, isOpened: boolean) => ReactNode;
  renderItem: () => RenderItemFunction;
  dropdownStyle: {};
  onSelect?: Function;
  dropdownOverlayColor?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  list,
  renderButton,
  renderItem,
  dropdownStyle,
  onSelect,
  dropdownOverlayColor,
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
    />
  );
};

export default CustomDropdown;
