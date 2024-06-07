import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import FadedDividerMiddleText from "../FadedDividerMiddleText/FadedDividerMiddleText";
import LockIcon from "../../assets/icons/lock-closed.svg";
import GiftIcon from "../../assets/icons/gift.svg";
import MessageIcon from "../../assets/icons/message-orange.svg";
import BaristaIcon from "../../assets/icons/barista.svg";
import Coffee from "../../assets/icons/coffee.svg";
import { useLazyGetMissionByWorldIdQuery } from "../../../redux/services/missions";
import CustomShimmer from "../CustomShimmer/CustomShimmer";
import CustomMissionCircleComponent from "./CustomMissionCircleComponent";
import { ContainerProps } from "../../intefaces/componentsInterfaces";
import {
  MissionItemInterface,
  NumberInterface,
} from "../../intefaces/variablesInterfaces";

const CustomMissionHomeTabComponent: React.FC<ContainerProps> = ({
  navigation,
  extraData,
  index,
  world_id,
  currentItemIndex,
  onLayout,
}) => {
  const [fetchMissionsByWorldId, { data: missionData, isLoading }] =
    useLazyGetMissionByWorldIdQuery();

  useEffect(() => {
    if (!world_id) return;
    fetchMissionsByWorldId({ id: world_id });
  }, [world_id]);

  const bounceValue = useRef(new Animated.Value(0)).current;

  function generateData(length: NumberInterface) {
    const data = [];
    const positions = ["50", "77", "95", "77", "50", "27", "8", "27"];

    for (let i = 0; i < length; i++) {
      const position = positions[i % positions.length];
      const currentltActive = i === 0;
      const icon = i === 0 ? MessageIcon : LockIcon;
      const newItem: MissionItemInterface = { position, currentltActive, icon };

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
            (item: MissionItemInterface, listIndex) => {
              return (
                <CustomMissionCircleComponent
                  currentItemIndex={currentItemIndex}
                  index={index}
                  listIndex={listIndex}
                  item={item}
                  navigation={navigation}
                  bounceValue={bounceValue}
                  missionData={missionData}
                  extraData={extraData}
                />
              );
            }
          )}
        </View>
      )}
    </>
  );
};
export default CustomMissionHomeTabComponent;
