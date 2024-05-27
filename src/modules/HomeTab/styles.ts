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
  container: {
    backgroundColor: "#F1F5F9",
    width: "100%",
    height: "100%",
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  missionDetailsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#FFD6B6",
    borderRadius: 20,
    marginBottom: 10,
  },
  missionDetailsTxtContainer: {
    gap: 4,
  },
  missionDetailsTxt: {
    fontSize: 16,
    lineHeight: 24,
    color: "#F58C39",
  },
  missionDetailsTxtSmall: {
    fontSize: 12,
    lineHeight: 20,
    color: "#F58C39",
  },
  missionListContainer: {
    position: "relative",
  },
  circularBarRoundBox: {
    padding: 17,
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
  missionDetailsFixedFooterContainer: {
    width: "100%",
    height: 70,

    shadowColor: "#3282ce9c",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#F1F5F9",
    elevation: 5,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  missionDetailsFixedFooterTxt: {
    color: "#F58C39",
    paddingTop: 4,
    fontSize:12
  },
  missionDetailsFixedFooterList: {
    borderTopWidth: 2,
    borderTopColor: "#F58C39",
    paddingTop: 10,
    alignItems: "center",
  },
  tooltipTxt:{
    color: "#F58C39",
    fontSize:16
  },
  tooltip:{
    backgroundColor: "#F1F5F9",
    paddingHorizontal:28,
    alignItems:'center',
    paddingVertical:12,
    textAlign:'center',
    borderRadius:15
  },
  tooltipParentStyle:{

    shadowColor: "#3282ce9c",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }

});
