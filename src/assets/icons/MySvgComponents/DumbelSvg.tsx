import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Rect } from "react-native-svg";

interface DumbelSvgProps {
  stroke?: string;
  width?: number;
  height?: number;
}

const DumbelSvg: React.FC<DumbelSvgProps> = ({
  stroke = "#171717",
  width = 21,
  height = 20,
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 21 20" fill="none" {...props}>
    <Rect
      x={2.5609}
      y={11.0938}
      width={3.75912}
      height={8.26693}
      rx={1.25}
      transform="rotate(-45 2.5609 11.0938)"
      stroke={stroke}
      strokeWidth={1.5}
    />
    <Rect
      x={8.93603}
      y={4.71875}
      width={3.75912}
      height={8.26693}
      rx={1.25}
      transform="rotate(-45 8.93603 4.71875)"
      stroke={stroke}
      strokeWidth={1.5}
    />
    <Rect
      x={7.34167}
      y={10.5625}
      width={5.26172}
      height={2.25651}
      rx={1.12826}
      transform="rotate(-45 7.34167 10.5625)"
      stroke={stroke}
      strokeWidth={1.5}
    />
    <Rect
      x={2.90833}
      y={13.7227}
      width={1.12695}
      height={4.13216}
      rx={0.563477}
      transform="rotate(-45 2.90833 13.7227)"
      stroke={stroke}
      strokeWidth={1.12695}
    />
    <Rect
      x={13.0456}
      y={3.65625}
      width={1.30212}
      height={3.95699}
      rx={0.651061}
      transform="rotate(-45 13.0456 3.65625)"
      stroke={stroke}
      strokeWidth={1.30212}
    />
  </Svg>
);

export default DumbelSvg;
