import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: "Montserrat-Regular",
  },
  defaultFontFamilyBold: {
    fontFamily: "Montserrat-Bold",
  },
  defaultFontFamilySemiBold: {
    fontFamily: "Montserrat-SemiBold",
  },
  missionListContainer: {
    position: "relative",
    width:'100%',
  },
  circularBarRoundBox: {
    padding: 15,
    borderRadius: 50,
    shadowColor: "#3282ce9c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#F1F5F9",
    elevation: 5,
  },
  tooltipContainer:{
    position: "absolute",
    left: 0,
    top: 0,
    width: 144,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
})