// CustomToast.tsx
import React, { forwardRef } from 'react';
import Toast from 'react-native-toast-message';

const CustomToast = forwardRef((props, ref) => {
  return <Toast ref={ref} {...props} topOffset={70} />;
});

export default CustomToast;
