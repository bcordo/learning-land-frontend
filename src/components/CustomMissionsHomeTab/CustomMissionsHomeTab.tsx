import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  DimensionValue,
  View,
} from "react-native";
import FadedDividerMiddleText from "../FadedDividerMiddleText/FadedDividerMiddleText";
import LockIcon from "../../assets/icons/lock-closed.svg";
import GiftIcon from "../../assets/icons/gift.svg";
import MessageIcon from "../../assets/icons/message-orange.svg";
import BaristaIcon from "../../assets/icons/barista.svg";
import Coffee from "../../assets/icons/coffee.svg";
import { useLazyGetUserMissionByMissionIdsQuery } from "../../../redux/services/missions";
import CustomShimmer from "../CustomShimmer/CustomShimmer";
import CustomMissionCircleComponent from "./CustomMissionCircleComponent";
import { ContainerProps } from "../../intefaces/componentsInterfaces";
import {
  MissionItemInterface,
  NumberInterface,
} from "../../intefaces/variablesInterfaces";
import { useDispatch } from "react-redux";
import { updateLoader } from "../../../redux/slices/loaderSlice";
import CustomSvgImageComponent from "../CustomComponents/Image";
import MissionsLoader from "../MissionsLoader/MissionsLoader";

const CustomMissionHomeTabComponent: React.FC<ContainerProps> = ({
  navigation,
  extraData,
  index,
  world_id,
  currentItemIndex,
  missions,
  onLayout,
  loaderSate,
}) => {
  const dispatch = useDispatch();

  const [
    fetchMissionsByMissionIds,
    { data: missionsdata, isLoading, isFetching },
  ] = useLazyGetUserMissionByMissionIdsQuery();
  useEffect(() => {
    const missionsIds: number[] = [];
    missions?.map((e) => missionsIds.push(e?.id));
    if (!world_id) return;
    fetchMissionsByMissionIds({ missionsIds });
  }, [world_id]);
  useEffect(() => {
    dispatch(updateLoader({isLoading,index}));
  }, [isLoading]);
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
  }, [bounceValue, currentItemIndex]);
  return (
    <>
      <FadedDividerMiddleText text={`WORLD ${index + 1}`} />
      {isLoading || isFetching || loaderSate?.[index] ? (
        <>
         <MissionsLoader/>
        </>
      ) : (
        <View onLayout={handleLayout} style={{ paddingTop: 32 }}>
          {generateData(missionsdata?.length).map(
            (item: MissionItemInterface, listIndex) => {
              return (
                <CustomMissionCircleComponent
                  currentItemIndex={currentItemIndex}
                  index={index}
                  listIndex={listIndex}
                  item={item}
                  navigation={navigation}
                  bounceValue={bounceValue}
                  missionData={{
                    ...missions[listIndex],
                    ...missionsdata[listIndex],
                  }}
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
