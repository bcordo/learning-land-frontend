import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface HomeFooterProps extends SvgProps {
  stroke?: string;
}

const HomeFooter: React.FC<HomeFooterProps> = ({ stroke, ...props }) => (
  <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" {...props}>
    <Path
      d="M17.5 10C17.5 13.866 14.366 17 10.5 17M17.5 10C17.5 6.13401 14.366 3 10.5 3M17.5 10H3.5M10.5 17C6.63401 17 3.5 13.866 3.5 10M10.5 17C11.7887 17 12.8333 13.866 12.8333 10C12.8333 6.13401 11.7887 3 10.5 3M10.5 17C9.21134 17 8.16667 13.866 8.16667 10C8.16667 6.13401 9.21134 3 10.5 3M3.5 10C3.5 6.13401 6.63401 3 10.5 3"
      stroke={stroke || "#171717"}
      strokeWidth={1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default HomeFooter;
