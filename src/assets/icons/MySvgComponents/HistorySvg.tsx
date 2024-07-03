import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

type IconProps = {
  color?: string;
};

const HistorySvg: React.FC<IconProps> = ({ color = '#525252' }) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <ClipPath id="clip0">
        <Rect width="20" height="20" rx="6" fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip0)">
      <Path 
        d="M10.8334 2.5C8.84425 2.5 6.9366 3.29018 5.53007 4.6967C4.12355 6.10322 3.33337 8.01088 3.33337 10H0.833374L4.07504 13.2417L4.13337 13.3583L7.50004 10H5.00004C5.00004 6.775 7.60837 4.16667 10.8334 4.16667C14.0584 4.16667 16.6667 6.775 16.6667 10C16.6667 13.225 14.0584 15.8333 10.8334 15.8333C9.22504 15.8333 7.76671 15.175 6.71671 14.1167L5.53337 15.3C6.22789 15.9983 7.05378 16.5523 7.96343 16.9299C8.87307 17.3075 9.84847 17.5012 10.8334 17.5C12.8225 17.5 14.7302 16.7098 16.1367 15.3033C17.5432 13.8968 18.3334 11.9891 18.3334 10C18.3334 8.01088 17.5432 6.10322 16.1367 4.6967C14.7302 3.29018 12.8225 2.5 10.8334 2.5ZM10 6.66667V10.8333L13.5667 12.95L14.1667 11.9417L11.25 10.2083V6.66667H10Z" 
        fill={color}
      />
    </G>
  </Svg>
);

export default HistorySvg;
