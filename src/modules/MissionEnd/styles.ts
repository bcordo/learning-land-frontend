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
  mainContainer: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  header: {
    paddingBottom: 30,
  },
  scenarioCompletedTxt: {
    color: "#171717",
    textAlign: "center",
    fontSize: 28,
    letterSpacing: -0.64,
    paddingTop: 20,
  },
  scoreContainer: {
    alignItems: "center",
    position: "relative",
    width: 250,
    height: 250,
  },
  scoretxt: {
    color: "#FFC171",
    fontSize: 18,
    letterSpacing: -0.4,
  },
  scoretxtXL: {
    fontSize: 74,
    letterSpacing: 10,
  },
  scoretxtContainer: {
    alignItems: "center",
    marginTop: -20,
    justifyContent: "center",
  },
  starContainer: {
    position: "absolute",
    bottom: -10,
    flexDirection: "row",
    gap: 8,
    // backgroundColor: "#F1F5F9",
    height: 85,
    alignItems: "flex-end",
    borderRadius: 20,
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
  starBox1: {
    padding: 10,
    height: 60,
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    shadowColor: "#3282ce9c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ rotate: "18deg" }],
  },
  starBox2: {
    marginBottom: -17,
    transform: [{ rotate: "0deg" }],
  },

  starBox3: {
    transform: [{ rotate: "-18deg" }],
  },
  reviewContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
  },
  reviewBox: {
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: "#3282ce9c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#F1F5F9",
    gap: 15,
    alignItems: "center",
    paddingVertical: 15,
  },
  reviewTxt: {
    fontSize: 14,
    color: "#171717",
  },
  reviewScore: {
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.48,
  },
  reviewScoreContainer: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  goalsContainer: {
    paddingTop: 40,
  },
  goalsTxt: {
    fontSize: 18,
    paddingVertical: 10,
    color: "#171717",
  },
  goalsList: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  goalsListTextBold: {
    color: "#171717",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 20,
  },
  goalsListTxt: {
    color: "#737373",
    fontSize: 12,
    fontStyle: "normal",
    lineHeight: 20,
  },
  incorrectPhaseContainer: {
    paddingTop: 40,
    gap: 10,
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
  helpfulPharasesListContainer: {
    paddingHorizontal: 2,
  },
  buttonContainer: {
    width: "100%",
    gap: 10,
    padding:20,
    // paddingBottom: 24,
    // paddingTop: 40,
  },
  getStarted: {
    backgroundColor: "#F58C39",
    width: "100%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  getStartedButtonText: {
    color: "#FAFAFA",
    fontSize: 18,
    lineHeight: 28,
  },
  alreadyHaveAccountButtonText: {
    color: "#F58C39",
    fontSize: 16,
    lineHeight: 24,
  },
  alreadyHaveAnAccount: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#F58C39",
    borderRadius: 20,
    gap: 8,
    flexDirection: "row",
  },
});
