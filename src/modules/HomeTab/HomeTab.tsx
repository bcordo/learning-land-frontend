import React, { useEffect, useRef, useState } from "react";
import StatusBarComp from "../../components/StatusBarComp/StatusBarComp";
import {
  ActivityIndicator,
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
import HomeFooter from "../../assets/icons/MySvgComponents/HomeFooter";
import DumbelSvg from "../../assets/icons/MySvgComponents/DumbelSvg";
import GroupSvg from "../../assets/icons/MySvgComponents/GroupSvg";
import UserSvg from "../../assets/icons/MySvgComponents/UserSvg";
import { useSelector } from "react-redux";

const HomeTab: React.FC<NavigationInterface> = ({
  navigation,
}): React.JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<StringInterface>("Home");
  const [currentItemIndex, setCurrentItemIndex] = useState<NumberInterface>(0);
  const scrollViewRef = useRef<any>(null);
  const [componentHeights, setComponentHeights] =
    useState<ComponentHeightsObjInterface>({});
  const loading = useSelector(
    (state: { loaderSlice: any }) => state.loaderSlice
  );
  const [fetchWorlds, { data: allWorlds, isLoading: fetchingWorlds }] =
    useLazyGetAllWorldsQuery();
  useEffect(() => {
    fetchWorlds("");
  }, []);

  const footerList = [
    { label: "Home", IconComponent: HomeFooter },
    { label: "Training", IconComponent: DumbelSvg },
    { label: "Multiplayer", IconComponent: GroupSvg },
    { label: "Profile", IconComponent: UserSvg },
  ];

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    const offsetY = contentOffset.y;
    let index = 0;
    let cumulativeHeight = 0;
    while (cumulativeHeight <= offsetY && index < allWorlds.length) {
      cumulativeHeight += componentHeights[index];
      index++;
    }
    if (index <= 0) index = 1;
    setCurrentItemIndex(index - 1);
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
                <View style={styles.loaderContainer}>
                  <ActivityIndicator
                    size="large"
                    style={styles.loader}
                    color={"#F58C39"}
                  />
                </View>
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
                      allWorlds[currentItemIndex ? currentItemIndex : 0]
                        ?.title}{" "}
                  </Text>

                  {!fetchingWorlds && (
                    <Text
                      style={[
                        styles.defaultFontFamily,
                        styles.missionDetailsTxtSmall,
                      ]}
                    >
                      {allWorlds &&
                        !fetchingWorlds &&
                        allWorlds[currentItemIndex ? currentItemIndex : 0]
                          ?.description}
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
                      loaderSate={loading?.worldLoader}
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
                      {
                        borderTopWidth:
                          selectedItem.toLocaleLowerCase() ===
                          e.label.toLocaleLowerCase()
                            ? 2
                            : 0,
                      },
                    ]}
                  >
                    <e.IconComponent
                      stroke={
                        selectedItem.toLocaleLowerCase() ===
                        e.label.toLocaleLowerCase()
                          ? "#F58C39"
                          : "#171717"
                      }
                    />
                    <Text
                      style={[
                        styles.defaultFontFamily,
                        styles.missionDetailsFixedFooterTxt,
                        {
                          color:
                            selectedItem.toLocaleLowerCase() ===
                            e.label.toLocaleLowerCase()
                              ? "#F58C39"
                              : "#171717",
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
