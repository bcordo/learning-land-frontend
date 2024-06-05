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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F1F5F9",
  },
  textContainer: {
    justifyContent: "flex-end",
  },
  buttonContainer: {
    width: "100%",
    gap: 10,
    marginBottom: 16,
  },
  learningLandText: {
    color: "#F58C39",
    fontSize: 52,
    lineHeight: 56,
    letterSpacing: -1.04,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 75,
  },
  getStarted: {
    backgroundColor: "#F58C39",
    width: "100%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  getStartedButtonText: {
    color: "#FAFAFA",
    fontSize: 18,
  },
  alreadyHaveAccountButtonText: {
    color: "#F58C39",
    fontSize: 16,
  },
  alreadyHaveAnAccount: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#F58C39",
    borderRadius: 20,
  },
  blackText: {
    color: "#171717",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.36,
  },
});
