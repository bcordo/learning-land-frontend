import React from "react";
import { Text, TouchableOpacity } from "react-native";
import CustomSvgImageComponent from "../CustomComponents/Image";
import { CustomButtomProps } from "../../intefaces/componentsInterfaces";

const CustomButtom: React.FC<CustomButtomProps> = ({
  textStyle,
  buttonStyle,
  onPress,
  buttonTxt,
  icon,
}): React.JSX.Element => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={() => onPress()}>
      {icon ? (
        <CustomSvgImageComponent width={22} height={22} Component={icon} />
      ) : null}
      <Text style={textStyle}>{buttonTxt}</Text>
    </TouchableOpacity>
  );
};

export default CustomButtom;
