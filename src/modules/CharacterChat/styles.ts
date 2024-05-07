import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: "Montserrat-Regular",
  },
  defaultFontFamilyBold: {
    fontFamily: "Montserrat-Bold",
  },
  mainContainer: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  characterChatContainer: {
    width: "auto",
    margin: 0,
  },
  characterChatContainerHeight: {
    height: "60%",
    minHeight: "60%",
    paddingHorizontal: 24,
  },
  characterNavContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  pauseIcon: {
    shadowColor: "#3282ce9c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    width: 25,
    height: 25,
  },
  pauseIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  dropdownTxtContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
   
  },
  timer: {
    width: 50,
    height: 50,
    lineHeight: 20,
  },
  pipe: {
    width: 5,
    height: 20,
    backgroundColor: "black",
    borderRadius: 10,
  },
  dropdownContainer: {
    alignItems: "center",
    gap: 5,
    paddingLeft: 20,
    position: "relative",
  },
  orangeText: {
    color: "#F58C39",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    marginBottom: 2,
  },
  missionTxtContainer: {
    alignItems: "center",
    gap: 6,
  },
  coffeeShopTxt: {
    fontSize: 16,
    paddingTop: 12,
    fontWeight: "500",
    color: "#000000",
    lineHeight: 24,
    letterSpacing: 0,
  },

  missionTxt: {
    fontSize: 14,
    color: "#737373",
    lineHeight: 20,
    letterSpacing: 0,
  },

  fadedDividerTextOrange: {
    textAlign: "left",
    color: "#F58C39",
    fontFamily: "Montserrat-Bold",
  },
  profileIconContainerStyle: {
    marginTop: 10,
  },
  stepCircle: {
    alignItems: "center",
  },
  stepCircleOutlined: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: "#becdd7",
    borderRadius: 50,

    backgroundColor: "transparent",
  },
  stepperContainer: {
    flexDirection: "row",
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: "#becdd7",
    shadowColor: "#3282ce9c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 6,
  },
  stepLineHalfFilled: {
    width: 20,
    height: 4,
    backgroundColor: "#becdd7",
    shadowColor: "#3282ce9c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 6.5,
    marginLeft: 1,
    marginRight: 1,
  },
  stepLineHalfOutlined: {
    width: 20,
    height: 4,
    backgroundColor: "#becdd7",
    shadowColor: "#3282ce9c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 6,
  },

  startRecordIcon: {
    width: 42,
    height: 42,
  },

  shufflingImagesArr: {
    flexDirection: "row",
    width: 110,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  EllipseStartRecord: {
    width: 36,
    height: 36,
  },
  goalsDropdownContainer: {
    position: "absolute",
    width: 265,
    backgroundColor: "#F1F5F9",
    zIndex: 1,
    top:20  ,
    borderWidth:1,
    borderColor:'#D4D4D4',
    borderRadius:10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 15,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  goalsDropdownContainerIcon:{
    width:22,
    height:22,
    
  },
  goalsValue:{
color:'#404040'
  },
  goalsDropdownSubContainer:{
    padding:10,
    gap:10,
    flexDirection:'row',
    alignItems:'center',
    borderBottomColor:"#E5E5E5",
    borderBottomWidth:1
  },
  lastGoalsDropdownSubContainer:{
    borderBottomWidth:0
  }
});
