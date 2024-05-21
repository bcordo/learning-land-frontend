import React, { useState } from "react";
import StatusBarComp from "../../components/StatusBarComp/StatusBarComp";
import {
  FlatList,
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
import FadedDividerMiddleText from "../../components/FadedDividerMiddleText/FadedDividerMiddleText";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import LockIcon from "../../assets/icons/lock-closed.svg";
import GiftIcon from "../../assets/icons/gift.svg";
import DumbelIcon from "../../assets/icons/dumbell-gray.svg";
import MessageIcon from "../../assets/icons/message-orange.svg";
import BaristaIcon from "../../assets/icons/barista.svg";
import DumbleBlackIcon from "../../assets/icons/dumbell-black.svg";
import GlobeIcon from "../../assets/icons/globe-alt-orange.svg";
import UsersIcon from "../../assets/icons/user-group.svg";
import UserIcon from "../../assets/icons/user.svg";
import Tooltip from "react-native-walkthrough-tooltip";
import Navigation from "../../navigation/Navigation";

interface HomeTabProps {
  navigation: any;
}

const Container = ({ item, toolTipVisible, setToolTipVisible, navigation }) => (
  <>
    {item.currentltActive ? (
      <View style={[styles.missionListContainer, { height: 110 }]}>
        {item?.secondaryIcon ? (
          <View
            style={{
              position: "absolute",
              left: `${item.position === "8" ? 85 : 15}%`,

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
        ) : null}

        <AnimatedCircularProgress
          size={100}
          width={4}
          fill={50}
          tintColor="#DD6100"
          backgroundColor="lightgray"
          lineCap="round"
          rotation={0}
          style={{
            position: "absolute",
            left: `${item.position}%`,
            top: 0,
            transform: [{ translateX: -item.position }],
          }}
        >
          {(fill) => (
            <Tooltip
              contentStyle={styles.tooltip}
              isVisible={toolTipVisible}
              content={
                <Text
                  style={[styles.defaultFontFamilySemiBold, styles.tooltipTxt]}
                >
                  CONTINUE
                </Text>
              }
              placement="top"
              onClose={() => setToolTipVisible(false)}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MissionStart");
                  // setToolTipVisible(true);
                }}
                style={styles.circularBarRoundBox}
              >
                <CustomSvgImageComponent
                  width={42}
                  height={42}
                  Component={item.icon}
                />
              </TouchableOpacity>
            </Tooltip>
          )}
        </AnimatedCircularProgress>
      </View>
    ) : (
      <View style={[styles.missionListContainer, { height: 90 }]}>
        {item?.secondaryIcon ? (
          <View
            style={{
              position: "absolute",
              left: `${item.position === "8" ? 85 : 15}%`,
              top: 0,
              transform: [
                { translateX: -`${item.position === "8" ? 85 : 15}` },
              ],
            }}
          >
            <CustomSvgImageComponent
              width={110}
              height={110}
              Component={item.secondaryIcon}
            />
          </View>
        ) : null}
        <View
          style={[
            styles.circularBarRoundBox,
            {
              position: "absolute",
              left: `${item.position}%`,
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
const list = [
  {
    position: "50",
    currentltActive: true,
    icon: MessageIcon,
  },
  {
    position: "77",
    currentltActive: false,
    icon: LockIcon,
  },
  {
    position: "95",
    icon: GiftIcon,
    secondaryIcon: Coffee,
  },
  {
    position: "77",
    currentltActive: false,
    icon: LockIcon,
  },
  {
    position: "50",
    currentltActive: false,
    icon: LockIcon,
  },
  {
    position: "27",
    currentltActive: false,
    icon: DumbelIcon,
  },
  {
    position: "8",
    currentltActive: false,
    icon: LockIcon,
    secondaryIcon: BaristaIcon,
  },
  {
    position: "27",
    currentltActive: false,
    icon: LockIcon,
  },
  {
    position: "50",
    currentltActive: false,
    icon: GiftIcon,
  },
];
const HomeTab: React.FC<HomeTabProps> = ({ navigation }): React.JSX.Element => {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("home");
  console.log(selectedItem, "selectedItem");
  const renderItem = ({ item }) => {
    return (
      <Container
        item={item}
        toolTipVisible={toolTipVisible}
        setToolTipVisible={setToolTipVisible}
        navigation={navigation}
      />
    );
  };

  const footerList = [
    { label: "home", icon: GlobeIcon },
    { label: "tranning", icon: DumbleBlackIcon },
    { label: "multiplayer", icon: UsersIcon },
    { label: "profile", icon: UserIcon },
  ];

  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <HomeTabHeader />
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
                World 1: The coffee shop{" "}
              </Text>
              <Text
                style={[
                  styles.defaultFontFamily,
                  styles.missionDetailsTxtSmall,
                ]}
              >
                Learn to flirt and basic greetings
              </Text>
            </View>
          </View>
          <ScrollView>
            <FadedDividerMiddleText text={"WORLD 1"} />
            <View style={{ paddingTop: 32 }}>
              <FlatList data={list} renderItem={renderItem} />
            </View>
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
                        color: selectedItem === e.label ? "#F58C39" : "#171717",
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
      </SafeAreaView>
    </>
  );
};

export default HomeTab;
