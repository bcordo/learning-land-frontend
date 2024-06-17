import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

interface CustomSvgProps {
  stroke?: string;
  strokeWidth?: number;
}

const UserSvg: React.FC<CustomSvgProps> = ({
  stroke = "#171717",
  strokeWidth = 1.67,
}) => (
  <Svg width={21} height={20} viewBox="0 0 21 20" fill="none">
    <Path
      d="M13.6111 6.11111C13.6111 7.82933 12.2182 9.22222 10.5 9.22222C8.78177 9.22222 7.38888 7.82933 7.38888 6.11111C7.38888 4.39289 8.78177 3 10.5 3C12.2182 3 13.6111 4.39289 13.6111 6.11111Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.5 11.5556C7.4931 11.5556 5.05554 13.9931 5.05554 17H15.9444C15.9444 13.9931 13.5069 11.5556 10.5 11.5556Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default UserSvg;
