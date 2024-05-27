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
  setDifficultyLevel: Function;
  difficultyLevel: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  list,
  renderButton,
  renderItem,
  dropdownStyle,
  setDifficultyLevel,
  difficultyLevel,
}): React.JSX.Element => {
  return (
    <SelectDropdown
      data={list}
      onSelect={(selectedItem) => {
        setDifficultyLevel(selectedItem.title);
      }}
      defaultValue={difficultyLevel}
      renderButton={renderButton}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      dropdownStyle={dropdownStyle}
    />
  );
};

export default CustomDropdown;
