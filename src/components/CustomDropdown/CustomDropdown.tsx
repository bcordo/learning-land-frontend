import React, { ReactNode } from "react";
import SelectDropdown from "react-native-select-dropdown";

interface RenderItemFunction {
  (item: {}, index?: number, isSelected?: boolean): JSX.Element;
}
interface CustomDropdownProps {
  list: {}[];
  renderButton: (selectedItem: any, isOpened: boolean) => ReactNode;
  renderItem: RenderItemFunction;
  dropdownStyle: {};
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  list,
  renderButton,
  renderItem,
  dropdownStyle,
}): React.JSX.Element => {
  return (
    <SelectDropdown
      data={list}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      renderButton={renderButton}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      dropdownStyle={dropdownStyle}
    />
  );
};

export default CustomDropdown;
