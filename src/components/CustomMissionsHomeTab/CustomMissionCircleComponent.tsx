import React from "react";
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
import {
  CustomMissionCircleComponentProps,
  SecondaryIconCompProps,
} from "../../intefaces/componentsInterfaces";
import LockIcon from "../../assets/icons/lock-closed.svg";
import MessageIcon from "../../assets/icons/message-orange.svg";

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
  let goalsCompleted =
    (missionData?.number_of_goals_completed / missionData?.user_goals?.length) *
    100;
  return (
    <>
      {["ACTIVE", "NOT_STARTED"].includes(missionData?.mission_state) &&
      currentItemIndex === index ? (
        <View style={[styles.missionListContainer, { height: 110 }]}>
          {item?.secondaryIcon ? <SecondaryIconComponent item={item} /> : null}
          <AnimatedCircularProgress
            size={95}
            width={4}
            fill={goalsCompleted || 0}
            // tintColor="#DD6100"
            tintColor="#F58C39"
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
                  navigation.navigate("MissionStart", {
                    id: extraData?.id,
                  });
                  dispatch(
                    updateMission({
                      ...missionData,
                      index: index + 1,
                    })
                  );
                }}
                style={styles.circularBarRoundBox}
              >
                <CustomSvgImageComponent
                  width={42}
                  height={42}
                  Component={MessageIcon}
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
              Component={LockIcon}
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
