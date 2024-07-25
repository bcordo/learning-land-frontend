import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const CircularLoader = () => {
  const spinValue = new Animated.Value(0);

  // Setup animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  // Interpolate beginning and end values (0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg width="50" height="50" viewBox="0 0 100 100">
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#F58C39" stopOpacity="1" />
              <Stop offset="100%" stopColor="rgba(245, 140, 57, 0)" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#grad)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset="0"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircularLoader;
