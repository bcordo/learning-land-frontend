import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  trySayingInstedContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  defaultFontFamily: {
    fontFamily: "Montserrat-Regular",
  },
  defaultFontFamilyBold: {
    fontFamily: "Montserrat-Bold",
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
    lineHeight: 20,
  },
});
