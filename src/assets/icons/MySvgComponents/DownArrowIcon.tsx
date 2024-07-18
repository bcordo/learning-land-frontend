import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface ArrowIconProps {
  color?: string;
}

const DownArrowIcon: React.FC<ArrowIconProps> = ({ color = '#7DDFDE' }) => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M12 6.40039L8 10.4004L4 6.40039"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default DownArrowIcon;
