import { Platform, StyleSheet } from "react-native";

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
    paddingHorizontal: 24,
  },
  characterNavContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 24,
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
    gap: 6,
    justifyContent: "center",
    width: 265,
  },
  pipe: {
    width: 5,
    height: 20,
    backgroundColor: "black",
    borderRadius: 10,
  },
  dropdownContainer: {
    gap: 5,
    width: "80%",
    alignItems: "center",
  },
  orangeText: {
    color: "#F58C39",
    fontSize: 12,
    marginBottom: 2,
  },
  missionTxtContainer: {
    alignItems: "center",
    gap: 6,
  },
  coffeeShopTxt: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    lineHeight: 24,
    letterSpacing: 0,
  },

  missionTxt: {
    fontSize: 14,
    color: "#737373",
    lineHeight: 20,
    paddingBottom: 22,
    letterSpacing: 0,
  },

  fadedDividerTextOrange: {
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
    borderColor: "#d6e2ed",
    borderRadius: 50,
    backgroundColor: "transparent",
  },
  stepperContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  stepLine: {
    width: 45,
    height: 2,
    backgroundColor: "#d6e2ed",
    marginTop: 6,
    alignItems:"flex-end",
  },
  stepLineFilled: {
    width: '50%',
    height: 2,
    backgroundColor: "#F1F5F9",
    shadowColor: "#3282ce9c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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

  goalsDropdownContainerIcon: {
    width: 22,
    height: 22,
   

  },
  goalsValue: {
    color: "#404040",
    fontSize:12
  },
  goalsDropdownSubContainer: {
    padding: 10,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
  },
  lastGoalsDropdownSubContainer: {
    borderBottomWidth: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  timer: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#737373",
  },
  wrapper: {
    width: 40,
    height: 40,
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    justifyContent: "center",
    shadowColor: "#3282ce9c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  wrapper2: {
    width: 37,
    height: 37,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  wrapper3: {
    width: 27,
    height: 27,
    backgroundColor: "#F1F5F9",
    borderRadius: 100,
    justifyContent: "center",
    shadowColor: "#3282ce9c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignItems: "center",
  },
  contentContainer: {
    justifyContent: "space-between",
  },
  dropdownMenuStyle: {
    
    borderWidth: 1,
    borderTopWidth: 1,
    
    borderColor: "#D4D4D4",
    backgroundColor: "#F1F5F9",
    marginTop:4,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.8)",
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 15,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
