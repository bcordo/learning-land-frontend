import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  defaultFontFamily:{
    fontFamily: 'Montserrat-Regular',
  },
  defaultFontFamilyBold:{
    fontFamily: 'Montserrat-Bold',
  },
    startRecordContainer: {
        gap: 22,
        justifyContent: "center",
      },
      startToRecordContainer: {
        alignItems: "center",
        gap: 5,
        paddingTop: 28,
      },
      startToRecordTxt: {
        color: "#525252",
        fontSize: 12,
        lineHeight: 20,
      },
      blackXContainer:{
        height:32,
        width:32,
        borderColor:'#525252',
        borderWidth:4,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center'
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

  emptyBtn:{
    width: 36,
    height: 36,
  
    backgroundColor: "transparent",

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
  recordeButton: {
    borderRadius: 50,
  },
  
})