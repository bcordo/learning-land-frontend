import React from "react";
interface CustomSvgImageComponentInterface {
  Component: React.ComponentType<any>;
  width: number;
  height: number;
}
const CustomSvgImageComponent: React.FC<CustomSvgImageComponentInterface> = ({
  Component,
  width,
  height,
}): React.JSX.Element => {
  return <Component width={width} height={height} />;
};
export default CustomSvgImageComponent;
