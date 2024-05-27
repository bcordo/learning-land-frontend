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
    width: "100%",
    height: "100%",
    paddingTop: 32,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 25,
  },
  timerPausedTxtContainer: {
    height: 63,
    justifyContent: "center",
  },
  timerPausedTxt: {
    color: "#525252",
    fontSize: 32,
    letterSpacing: -0.64,
  },
    buttonBox: {
    width: 67,
    height: 67,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 11,
    shadowColor: "#3282ce9c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
    buttonBoxtxt: {
    alignItems: "center",
    gap: 6,
  },
  stoptxt: {
    color: "#A3A3A3",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 30,
    marginTop: 20,
  },
  optionBox: {
    flexDirection: "row",
    gap: 12,
    alignItems:'center'
  },
  optionContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  optionSubTitle: {
    color: "#525252",
    fontSize: 12,
    lineHeight: 20,
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 57,
  },
  dropdownButtonStyle: {
    width: 100,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  dropdownButtonStyle2: {
    width: 50,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9F5F5",
    borderRadius: 24,
  },
  dropdownButtonTxtStyle: {
    color: "#7DDFDE",
    fontSize: 11,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 40,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
  modalText: {
    marginBottom: 24,
    textAlign: "center",
  },
  modalButtonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalConfirmButton: {
    backgroundColor: "#F58C39",

    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalConfirmButtonCancel: {
    backgroundColor: "#737373",

    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  getStartedButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  getStartedButtonTextCancel: {
    color: "#fff",
    fontSize: 12,
  },
});
