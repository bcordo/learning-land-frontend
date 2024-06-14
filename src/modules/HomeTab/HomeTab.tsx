import React, { useEffect, useRef, useState } from "react";
import StatusBarComp from "../../components/StatusBarComp/StatusBarComp";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import Coffee from "../../assets/icons/coffee.svg";
import CustomSvgImageComponent from "../../components/CustomComponents/Image";
import HomeTabHeader from "../../components/HomeTabHeader/HomeTabHeader";
import DumbleBlackIcon from "../../assets/icons/dumbell-black.svg";
import GlobeIcon from "../../assets/icons/globe-alt-orange.svg";
import UsersIcon from "../../assets/icons/user-group.svg";
import UserIcon from "../../assets/icons/user.svg";
import CustomShimmer from "../../components/CustomShimmer/CustomShimmer";
import { useLazyGetAllWorldsQuery } from "../../../redux/services/worldsApi";
import CustomMissionHomeTabComponent from "../../components/CustomMissionsHomeTab/CustomMissionsHomeTab";
import { NavigationInterface } from "../../intefaces/componentsInterfaces";
import {
  ComponentHeightsObjInterface,
  NumberInterface,
  StringInterface,
  WorldInterface,
} from "../../intefaces/variablesInterfaces";

const HomeTab: React.FC<NavigationInterface> = ({
  navigation,
}): React.JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<StringInterface>("home");
  const [currentItemIndex, setCurrentItemIndex] = useState<NumberInterface>(0);
  const scrollViewRef = useRef<any>(null);
  const [componentHeights, setComponentHeights] =
    useState<ComponentHeightsObjInterface>({});

  const [fetchWorlds, { data: allWorlds, isLoading: fetchingWorlds }] =
    useLazyGetAllWorldsQuery();
  useEffect(() => {
    fetchWorlds("");
  }, []);
  const footerList = [
    { label: "Home", icon: GlobeIcon },
    { label: "Training", icon: DumbleBlackIcon },
    { label: "Multiplayer", icon: UsersIcon },
    { label: "Profile", icon: UserIcon },
  ];

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    const offsetY = contentOffset.y;
    let index = 0;
    let cumulativeHeight = 0;
    while (cumulativeHeight <= offsetY && index < allWorlds.length) {
      cumulativeHeight += componentHeights[index] - 100;
      index++;
    }
    setCurrentItemIndex(index);
  };

  const handleComponentLayout = (
    index: number,
    {
      nativeEvent: {
        layout: { height },
      },
    }: { nativeEvent: { layout: { height: number } } }
  ) => {
    setComponentHeights((prevState) => ({
      ...prevState,
      [index]: height,
    }));
  };

  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      <SafeAreaView style={styles.container}>
        {
          <View style={[styles.container, { paddingHorizontal: 24 }]}>
            <HomeTabHeader />
            {fetchingWorlds ? (
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
                    width: "50%",
                    height: 10,
                    backgroundColor: "#9e9e9e",
                    marginTop: 8,
                  }}
                />
              </>
            ) : (
              <View style={styles.missionDetailsContainer}>
                <CustomSvgImageComponent
                  width={60}
                  height={55}
                  Component={Coffee}
                />

                <View style={styles.missionDetailsTxtContainer}>
                  <Text
                    style={[
                      styles.defaultFontFamilySemiBold,
                      styles.missionDetailsTxt,
                    ]}
                  >
                    {allWorlds &&
                      allWorlds[currentItemIndex ? currentItemIndex - 1 : 0]
                        ?.title}{" "}
                  </Text>

                  {!fetchingWorlds && (
                    <Text
                      style={[
                        styles.defaultFontFamily,
                        styles.missionDetailsTxtSmall,
                      ]}
                    >
                      {(allWorlds &&
                        !fetchingWorlds &&
                        allWorlds[currentItemIndex ? currentItemIndex - 1 : 0]
                          ?.description) ||
                        `Learn to flirt and basic greetings`}
                    </Text>
                  )}
                </View>
              </View>
            )}
            <ScrollView
              scrollEventThrottle={24}
              ref={scrollViewRef}
              onScroll={handleScroll}
            >
              {allWorlds?.map(
                (element: WorldInterface, idx: NumberInterface) => {
                  return (
                    <CustomMissionHomeTabComponent
                      missions={element?.missions}
                      extraData={element}
                      index={idx}
                      navigation={navigation}
                      world_id={element?.id}
                      onLayout={(event) => handleComponentLayout(idx, event)}
                      currentItemIndex={currentItemIndex}
                    />
                  );
                }
              )}
            </ScrollView>
            <View style={styles.missionDetailsFixedFooterContainer}>
              {footerList.map((e, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedItem(e.label)}
                    style={[
                      styles.missionDetailsFixedFooterList,
                      { borderTopWidth: selectedItem === e.label ? 2 : 0 },
                    ]}
                  >
                    <CustomSvgImageComponent
                      width={20}
                      height={20}
                      Component={e.icon}
                    />
                    <Text
                      style={[
                        styles.defaultFontFamily,
                        styles.missionDetailsFixedFooterTxt,
                        {
                          color:
                            selectedItem === e.label ? "#F58C39" : "#171717",
                        },
                      ]}
                    >
                      {e?.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        }
      </SafeAreaView>
    </>
  );
};

export default HomeTab;
