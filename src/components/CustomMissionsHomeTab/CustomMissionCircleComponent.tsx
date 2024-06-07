import React, { useEffect } from "react";
import {
  Animated,
  DimensionValue,
  Image,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import CustomSvgImageComponent from "../CustomComponents/Image";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { updateMission } from "../../../redux/slices/missionSlice";
import { useLazyGetUserMissionByMissionIdQuery } from "../../../redux/services/missions";
import {
  CustomMissionCircleComponentProps,
  SecondaryIconCompProps,
} from "../../intefaces/componentsInterfaces";

const CustomMissionCircleComponent: React.FC<
  CustomMissionCircleComponentProps
> = ({
  currentItemIndex,
  index,
  listIndex,
  item,
  navigation,
  bounceValue,
  missionData,
  extraData,
}) => {
  const dispatch = useDispatch();

  const [getchMissionByMissionId] = useLazyGetUserMissionByMissionIdQuery();

  useEffect(() => {
    if (!missionData[listIndex]?.id) return;
    getchMissionByMissionId({ id: missionData[listIndex]?.id });
  }, [missionData]);
  return (
    <>
      {(currentItemIndex === index + 1 || currentItemIndex === 0) &&
      listIndex === 0 ? (
        // item.currentltActive
        <View style={[styles.missionListContainer, { height: 110 }]}>
          <AnimatedCircularProgress
            size={95}
            width={4}
            fill={0}
            tintColor="#DD6100"
            backgroundColor="#d6e2ed"
            lineCap="round"
            rotation={0}
            style={{
              position: "absolute",
              left: `${item.position}%` as DimensionValue,
              top: 0,
              transform: [{ translateX: -item.position }],
            }}
          >
            {(fill) => (
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    updateMission({
                      ...missionData[listIndex],
                      index: index + 1,
                    })
                  );
                  navigation.navigate("MissionStart", {
                    id: extraData?.id,
                  });
                }}
                style={styles.circularBarRoundBox}
              >
                <CustomSvgImageComponent
                  width={42}
                  height={42}
                  Component={item.icon}
                />
              </TouchableOpacity>
            )}
          </AnimatedCircularProgress>

          <Animated.View
            style={{
              position: "absolute",
              top: -42,
              left: `${+item.position - 7}%`,
              transform: [
                {
                  translateY: bounceValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20],
                  }),
                },
                { translateX: -item.position },
              ],
            }}
          >
            <View style={{ position: "relative" }}>
              <View style={[styles.tooltipContainer]}>
                <Text
                  style={[
                    styles.defaultFontFamilySemiBold,
                    { color: "#F58C39", fontSize: 16 },
                  ]}
                >
                  {listIndex ? "CONTINUE" : "START HERE"}
                </Text>
              </View>

              <Image
                style={{ width: 144, height: 59 }}
                source={require("../../assets/icons/tooltip-image.png")}
              />
            </View>
          </Animated.View>
        </View>
      ) : (
        <View style={[styles.missionListContainer, { height: 90 }]}>
          {item?.secondaryIcon ? <SecondaryIconComponent item={item} /> : null}
          <View
            style={[
              styles.circularBarRoundBox,
              {
                position: "absolute",
                left: `${item.position}%` as DimensionValue,
                top: 0,
                transform: [{ translateX: -item.position }],
              },
            ]}
          >
            <CustomSvgImageComponent
              width={42}
              height={42}
              Component={item.icon}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default CustomMissionCircleComponent;

const SecondaryIconComponent: React.FC<SecondaryIconCompProps> = ({
  item,
}): React.JSX.Element => {
  return (
    <View
      style={{
        position: "absolute",
        left: `${item.position === "8" ? 85 : 15}%`,
        top: -15,
        transform: [
          {
            translateX: -`${item.position === "8" ? 85 : 15}`,
          },
        ],
      }}
    >
      <CustomSvgImageComponent
        width={110}
        height={110}
        Component={item.secondaryIcon}
      />
    </View>
  );
};
