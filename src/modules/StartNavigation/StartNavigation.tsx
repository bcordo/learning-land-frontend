import React, { useEffect } from "react";
import { styles } from "./style";
import StatusBarComp from "../../components/StatusBarComp/StatusBarComp";
import { NavigationInterface } from "../../intefaces/componentsInterfaces";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StartNavigation: React.FC<NavigationInterface> = ({
  navigation,
}): React.JSX.Element => {
    const tokenCheck=async ()=>{
        const token = await AsyncStorage.getItem("access_token");
        if(token){
            navigation.navigate("HomeTab");
        }else{
            navigation.navigate("Landing");
        }
    }
  useEffect(()=>{
   tokenCheck()

  },[])
  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      {/* <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator
                  size="large"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 200,
                  }}
                  color={"#F58C39"}
                />
              </View> */}
    </>
  );
};
export default StartNavigation;
