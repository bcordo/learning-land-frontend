import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: "Montserrat-Regular",
  },
  defaultFontFamilyBold: {
    fontFamily: "Montserrat-Bold",
  },
  container: {
    width: "100%",
    justifyContent: "flex-end",
    height: "100%",
    backgroundColor: "#F1F5F9",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  addActionButtonContainer: {
    alignItems: "center",
    marginTop:30
  },
  addActionButton: {
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 20,
  },
  addActionButtonTxt: {
    color: "#FAFAFA",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 24,
  },
  addActionContainer:{
    flexDirection:'row',
    gap:6,
    alignItems:'center',
    paddingVertical:10,
    borderBottomWidth:1,
    borderBottomColor:'#E5E5E5'
  },
  addActionTxt:{
    color:'#404040',
    fontSize:16,
    lineHeight:24
  },
  addActionTxtTitle:{
    color:'#404040',
    width:'100%',
    fontSize:12,
    lineHeight:20,
    paddingHorizontal:10,

  },
  input:{
    width:'85%',
    backgroundColor:'#FFFFFF',
    paddingHorizontal:8,
    paddingVertical:12,
    borderRadius:20,
    shadowColor: "#3282ce9c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:15
  }
});
