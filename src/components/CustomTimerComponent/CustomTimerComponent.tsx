import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useDispatch, useSelector } from "react-redux";
import { TimerSliceInterface } from "../../intefaces/variablesInterfaces";
import { updateTime } from "../../../redux/slices/timmerSlice";
import { styles } from "./styles";
import { NavigationInterface } from "../../intefaces/componentsInterfaces";
import { AudioPlayerContext } from "../../customHooks/AudioPlayerContext";

const CustomTimerComponent: React.FC<NavigationInterface> = ({
  navigation,
  handleGoEndScreen,
}) => {
  const audioPlayerContext = useContext(AudioPlayerContext);
  const { initialTotalSeconds, totalSeconds, minutes, seconds, pauseTimmer } =
    useSelector(
      (state: { timmerSlice: TimerSliceInterface }) => state.timmerSlice
    );
  const dispatch = useDispatch();
  useEffect(() => {
    if (pauseTimmer) return;
    const interval = setInterval(() => {
      if (totalSeconds <= 0) {
        navigation.navigate("MissionEnd");
        audioPlayerContext?.stopAudio();
        handleGoEndScreen();
      }
      if (totalSeconds >= 0) {
        dispatch(
          updateTime({
            minutes: Math.floor(totalSeconds / 60),
            seconds: totalSeconds % 60,
            totalSeconds: totalSeconds - 1,
          })
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [totalSeconds, pauseTimmer]);

  const progressFill =
    ((initialTotalSeconds - totalSeconds) / initialTotalSeconds) * 100;

  return (
    <View style={styles.wrapper}>
      <AnimatedCircularProgress
        size={40}
        width={2}
        fill={progressFill}
        tintColor="#7DDFDE"
        backgroundColor="#F1F5F9"
        lineCap="round"
        rotation={0}
      >
        {(fill) => (
          <View style={styles.wrapper2}>
            <View style={styles.wrapper3}>
              <Text style={[styles.defaultFontFamilyBold, styles.timer]}>
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </Text>
            </View>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default CustomTimerComponent;
