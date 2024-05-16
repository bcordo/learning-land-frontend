import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: "Montserrat-Regular",
  },
  defaultFontFamilyBold: {
    fontFamily: "Montserrat-Bold",
  },
  container: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  header: {
    paddingBottom: 30,
  },
  pharasesTxtContainer: {
    gap: 5,
    paddingBottom:20
  },
  pharasesTitle: {
    color: "#171717",
    fontSize: 36,
    fontStyle: "normal",
    lineHeight: 44,
    letterSpacing: -0.72,
  },
  pharasesSubTitle: {
    color: "#737373",
    fontSize: 12,
    fontStyle: "normal",
    lineHeight: 20,
  },
  inputContainer:{
    width:'100%',
    backgroundColor:'#FFFFFF',
    padding:15,
    borderRadius:20,
    gap:12,
    shadowColor: "#3282ce9c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection:'row',
    alignItems:'center',
    marginBottom:30
  },
  input:{
    height:20,
    width:'80%'
  },
  helpfulPharasesListContainer: {
    paddingHorizontal: 2,
    height:'69%'
    
  
  },
});
