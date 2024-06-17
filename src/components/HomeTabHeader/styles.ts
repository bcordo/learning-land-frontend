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
  homeTabHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom:14
  },
  homeTabHeaderLeft: {
    flexDirection: "row",
    gap: 10,
  },
  homeTabScoreBox: {
    flexDirection: "row",
    padding: 10,
    gap: 4,
    alignItems: "center",

    borderRadius: 10,
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
  searchIconWrapper:{
    height:45,
    width:45,
    borderRadius: 10,
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
  ScoreTxt: {
    color:'#737373',
    fontSize:15,
    lineHeight: 20,
letterSpacing: -0.24,
  },
});
