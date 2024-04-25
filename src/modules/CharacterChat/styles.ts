import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    width: 50,
    height: 50,
  },
  dropdownTxtContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timer: {
    width: 80,
    height: 80,
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
  },
  orangeText: {
    color: "#F58C39",
    fontSize: 12,
  },
  missionTxtContainer: {
    alignItems: "center",
    gap: 6,
  },
  coffeeShopTxt: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },

  missionTxt: {
    fontSize: 14,
    color: "#737373",
  },

  fadedDividerTextOrange: {
    textAlign: "left",
    color: "#F58C39",
    fontWeight: "600",
  },
  profileIconContainerStyle: {
    marginTop: 10,
  },
  stepCircle: {
    width: 18,
    height: 18,
    borderRadius: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#3282ce9c",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  stepCircleOutlined: {
    width: 19,
    height: 19,
    borderWidth: 3,
    borderColor: "lightgray",
    borderRadius: 50,

    backgroundColor: "#fff",
  },
  stepperContainer: {
    flexDirection: "row",
  },
  stepLine: {
    width: 40,
    height: 4,
    backgroundColor: "#fff",
    shadowColor: "#3282ce9c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 6,
    marginLeft: 1,
    marginRight: 1,
  },
  stepLineHalfFilled: {
    width: 20,
    height: 4,
    backgroundColor: "#fff",
    shadowColor: "#3282ce9c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 6,
    marginLeft: 1,
    marginRight: 1,
  },
  stepLineHalfOutlined: {
    width: 20,
    height: 4,
    backgroundColor: "lightgray",
    shadowColor: "#3282ce9c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 6,
  },
  trySayingInstedContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  trySayingInstedTxt: {
    color: "#737373",
    fontSize: 12,
    lineHeight: 20,
  },
  trySayingInstedTxtBlue: {
    color: "#7DDFDE",
    fontWeight: "500",
  },
  trySayingInstedTxtOrange: {
    color: "#FF8B67",
    fontWeight: "500",
  },
  characterChatButtonsBox: {
    flexDirection: "row",
    gap: 10,
    paddingLeft: 28,
  },
  characterChatButtons: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    borderRadius: 6,
    borderColor: "#D4D4D4",
    borderWidth: 1,
    marginBottom: 10,
  },
  characterChatButtonTxt: {
    color: "#737373",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 20,
  },
  typeMessageContainer: {
    marginTop: 12,
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  plusButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
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
  startRecordButton: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
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
  startToRecordContainer: {
    alignItems: "center",
    gap: 5,
    paddingTop: 12,
  },
  startRecordIcon: {
    width: 42,
    height: 42,
  },
  recordeButton: {
    borderRadius: 50,
  },
  startRecordContainer: {
    gap: 28,
    justifyContent: "center",
  },
  startToRecordTxt: {
    color: "#525252",
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    width: "75%",
    height: 38,
    borderRadius: 20,
    backgroundColor: "#fff",
    fontSize: 14,

    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowOpacity: 0.61,
    paddingHorizontal: 16,
    paddingVertical: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 4,
    color: "#D4D4D4",
    ...Platform.select({
      ios: {
        shadowColor: "#3282ce9c",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
