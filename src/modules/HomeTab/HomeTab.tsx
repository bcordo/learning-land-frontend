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
import MissionsLoader from "../../components/MissionsLoader/MissionsLoader";

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
    while (cumulativeHeight <= offsetY && index < allWorlds?.length) {
      cumulativeHeight += componentHeights?.[index];
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
  const colors = [
    { backgroundColor: '#FFD6B6',titleColor:'#DD6100',descriptionColor:'#F58C39' },
    { backgroundColor: '#7DDFDE',titleColor:'#00A4A2',descriptionColor:'#00A09E' },
    { backgroundColor: '#FF8B67',titleColor:'red',descriptionColor:'' },
    { backgroundColor: '#1077C2',titleColor:'red',descriptionColor:'' },
    { backgroundColor: '#FFC171',titleColor:'red',descriptionColor:'' }
  ]
 let headerColors= colors[currentItemIndex?currentItemIndex % colors?.length:0];
  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      <SafeAreaView style={styles.container}>
        {
          <View style={[styles.container, { paddingHorizontal: 24 }]}>
            <HomeTabHeader />
            {fetchingWorlds ? (
              <>
               <ScrollView
              scrollEventThrottle={24}
              ref={scrollViewRef}
              onScroll={handleScroll}
              showsVerticalScrollIndicator={false}
            >
                <View style={styles.loaderContainer}>
                  <CustomShimmer styleProps={{height:100,width:'100%',borderRadius:20,}}/>
                  <View style={{marginTop:15}}>

                  <MissionsLoader/>
                  </View>

                </View>
                </ScrollView>
              </>
            ) : (
              <View style={[styles.missionDetailsContainer,{backgroundColor:headerColors?.backgroundColor}]}>
                <CustomSvgImageComponent
                  width={60}
                  height={55}
                  Component={Coffee}
                />

                <View style={styles.missionDetailsTxtContainer}>
                  <Text
                    style={[
                      styles.defaultFontFamilySemiBold,
                      styles.missionDetailsTxt,{color:headerColors?.titleColor}
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
                        {color:headerColors?.descriptionColor}
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
