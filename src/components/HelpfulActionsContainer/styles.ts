import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: "Montserrat-Regular",
  },
  defaultFontFamilyBold: {
    fontFamily: "Montserrat-Bold",
  },
  incorrectPhaseContainer:{
    paddingTop:40,
    gap:10
  },
  helpfulPharasesHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingBottom: 10,
  },
  seeAllPharasesTxt: {
    paddingVertical: 10,
    color: "#F58C39",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 20,
  },
  helpfulPharasesTxt: {
    color: "#171717",
    fontSize: 18,
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: -0.36,
  },
  helpfulPharasesListContainer:{
    paddingHorizontal:2
  },
})