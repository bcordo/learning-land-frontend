import { useEffect, useRef, useState } from "react";
import {
  Animated,
  DimensionValue,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomSvgImageComponent from "../CustomComponents/Image";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { updateMission } from "../../../redux/slices/missionSlice";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import FadedDividerMiddleText from "../FadedDividerMiddleText/FadedDividerMiddleText";
import LockIcon from "../../assets/icons/lock-closed.svg";
import GiftIcon from "../../assets/icons/gift.svg";
import MessageIcon from "../../assets/icons/message-orange.svg";
import BaristaIcon from "../../assets/icons/barista.svg";
import Coffee from "../../assets/icons/coffee.svg";
import { useLazyGetMissionByWorldIdQuery } from "../../../redux/services/missions";
import CustomShimmer from "../CustomShimmer/CustomShimmer";

interface ContainerProps {
  navigation: any;
  extraData: any;
  index: number;
  currentItemIndex: number;
  world_id: number;
  onLayout?: (event: any) => void;
}

const CustomMissionHomeTabComponent: React.FC<ContainerProps> = ({
  navigation,
  extraData,
  index,
  world_id,
  currentItemIndex,
  onLayout,
}) => {
  const dispatch = useDispatch();

  const [fetchMissionsByWorldId, { data: missionData, isLoading }] =
    useLazyGetMissionByWorldIdQuery();

  useEffect(() => {
    if (!world_id) return;
    fetchMissionsByWorldId({ id: world_id });
  }, [world_id]);

  const bounceValue = useRef(new Animated.Value(0)).current;

  interface ItemInterface {
    position: string;
    currentltActive: boolean;
    icon: any;
    secondaryIcon?: any;
  }

  function generateData(length: number) {
    const data = [];
    const positions = ["50", "77", "95", "77", "50", "27", "8", "27"];

    for (let i = 0; i < length; i++) {
      const position = positions[i % positions.length];
      const currentltActive = i === 0;
      const icon = i === 0 ? MessageIcon : LockIcon;
      const newItem: ItemInterface = { position, currentltActive, icon };

      if (newItem.position === "95" || newItem.position === "8") {
        newItem.secondaryIcon =
          newItem.position === "95" ? Coffee : BaristaIcon;
        newItem.icon = GiftIcon;
      }
      data.push(newItem);
    }
    return data;
  }
  const handleLayout = (event: any) => {
    onLayout && onLayout(event);
  };
  useEffect(() => {
    if (isLoading || currentItemIndex !== index) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceValue, currentItemIndex, isLoading]);
  return (
    <>
      <FadedDividerMiddleText text={`WORLD ${index + 1}`} />
      {isLoading ? (
        <>
          <CustomShimmer
            styleProps={{
              width: "80%",
              height: 10,
              backgroundColor: "#9e9e9e",
              marginTop: 12,
            }}
          />
          <CustomShimmer
            styleProps={{
              width: "60%",
              height: 10,
              backgroundColor: "#9e9e9e",
              marginTop: 8,
              marginBottom: 12,
            }}
          />
        </>
      ) : (
        <View onLayout={handleLayout} style={{ paddingTop: 32 }}>
          {generateData(missionData?.length).map(
            (item: ItemInterface, listIndex) => {
              return (
                <>
                  {(currentItemIndex === index + 1 || currentItemIndex === 0) &&
                  listIndex === 0 ? (
                    // item.currentltActive
                    <View
                      style={[styles.missionListContainer, { height: 110 }]}
                    >
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
                      {item?.secondaryIcon ? (
                        <SecondaryIconComponent item={item} />
                      ) : null}
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
            }
          )}
        </View>
      )}
    </>
  );
};
export default CustomMissionHomeTabComponent;

interface SecondaryIconCompProps {
  item: any;
}

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
