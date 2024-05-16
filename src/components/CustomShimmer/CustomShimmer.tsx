import React from "react";

import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

interface CustomShimmerProps {
  styleProps: {};
}

const CustomShimmer: React.FC<CustomShimmerProps> = ({
  styleProps,
}): React.JSX.Element => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  return <ShimmerPlaceHolder style={{ ...styleProps }}></ShimmerPlaceHolder>;
};

export default CustomShimmer;
