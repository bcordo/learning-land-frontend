import React from 'react'
import { MissionItemInterface, NumberInterface } from '../../intefaces/variablesInterfaces';
import { DimensionValue, View } from 'react-native';
import MessageIcon from "../../assets/icons/message-orange.svg";
import LockIcon from "../../assets/icons/lock-closed.svg";
import Coffee from "../../assets/icons/coffee.svg";
import BaristaIcon from "../../assets/icons/barista.svg";
import GiftIcon from "../../assets/icons/gift.svg";

import CustomShimmer from '../CustomShimmer/CustomShimmer';

const MissionsLoader = () => {
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
  return (
    <>
       {generateData(10).map((item: any, index: NumberInterface) => {
            return (
              <>
                <View
                  style={[{ height: 110, position: "relative", width: "100%" }]}
                >
                  {
                    <>
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
                      ></View>
                    </>
                  }
                  <CustomShimmer
                    styleProps={{
                      width: 70,
                      height: 70,
                      backgroundColor: "#9e9e9e",
                      marginTop: 8,
                      marginBottom: 12,
                      borderRadius: 60,
                      position: "absolute",
                      left: `${item?.position}%` as DimensionValue,
                      top: 0,
                      transform: [{ translateX: -item?.position }],
                    }}
                  />
                  {item?.secondaryIcon ? (
                    <>
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
                        <CustomShimmer
                          styleProps={{
                            width: 70,
                            height: 100,
                            backgroundColor: "#9e9e9e",
                            marginTop: 8,
                            marginBottom: 12,
                          }}
                        />
                      </View>
                    </>
                  ) : null}
                </View>
              </>
            );
          })}
    </>
  )
}

export default MissionsLoader
