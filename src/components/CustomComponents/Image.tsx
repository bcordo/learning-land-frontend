import React from "react";
import { CustomSvgImageComponentInterface } from "../../intefaces/componentsInterfaces";

const CustomSvgImageComponent: React.FC<CustomSvgImageComponentInterface> = ({
  Component,
  width,
  height,
}): React.JSX.Element => {
  return <Component width={width} height={height} />;
};
export default CustomSvgImageComponent;
