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
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  topContainer:{
    paddingHorizontal: 10,
    width:'100%',
    height:70,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  drawerHeader:{
    flexDirection: "row",
    justifyContent: "flex-end",
    width:'100%'
  },
  missiontxtContainer: {
    alignItems: "center",
    gap: 5,
    paddingBottom: 30,
  },
  missionTxt: {
    color: "#737373",
    fontSize: 14,
    fontStyle: "normal",
  },
  coffeeShopTxtContainer: {
    width: "50%",
  },

  coffeeShopTxt: {
    color: "#171717",
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.48,
    textAlign: "center",
  },
  dividerContainer: {
    gap: 28,
    paddingBottom: 30,
  },
  dividerTxtContainer: {
    paddingHorizontal: 50,
    gap: 6,
  },
  dividerTxt: {
    color: "#171717",
    fontSize: 16,
    lineHeight: 24,
  },
  goalsContainer: {
    paddingBottom: 40,
  },
  goalstxt: {
    color: "#171717",
    fontSize: 18,
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: -0.36,
    paddingVertical: 10,
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

  helpfulPharasesContainer: {
    paddingVertical: 10,
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

  startButton: {
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F58C39",
    borderRadius: 20,
    flexDirection: "row",
    marginTop: 15,
  },
  startTxt: {
    color: "#FAFAFA",
    fontSize: 18,
    fontStyle: "normal",
    lineHeight: 28,
  },

  missionHistoryContaier: {
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    padding: 25,
  },
  missionHistorySubContaier: {
    width: "100%",
  },
  scenarioHistoryContainer: {
    flexDirection: "row",
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    paddingHorizontal: 17,
    paddingVertical: 15,
    gap: 10,
  },
  scenarioHistoryTxt: {
    fontSize: 16,
  },
  missionHistoryDetailsListContainer: {
    flexDirection: "row",
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: "center",
  },
  missionDate: {
    fontSize: 12,
    color: "#171717",
  },
  missionDateContainer:{
    width:'35%',
    flexWrap: 'wrap',
    gap:6
  },
  missionStatusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 24,
  },
  missionStatusTxt: {
    fontSize: 9,
  },
  progressBarParent: {
    width: '25%',
    height: 15,
    backgroundColor: "#C9D9E8",
   borderRadius:24,
    overflow: "hidden", 
    shadowColor: '#3282ce9c',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#F1F5F9",
    borderTopRightRadius:24,
    borderBottomEndRadius:24,
    shadowColor: '#3282ce9c',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems:'center',
    justifyContent:'center'
  },
  progressText:{
    color:'#FFC171',
    fontSize:10
  },
  scoreContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:6,
flexWrap:'wrap',
width:'50%',
justifyContent:'center'
  },
  scoreSubContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:4,
    minWidth:'10%',
  },
  scoreTxt:{
    fontSize:12
  }
});
