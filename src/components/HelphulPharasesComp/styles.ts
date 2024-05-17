import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    defaultFontFamily: {
        fontFamily: "Montserrat-Regular",
      },
      defaultFontFamilyBold: {
        fontFamily: "Montserrat-Bold",
      },
      helpfulPharasesListItem: {
        
        flexDirection: "row",
        gap: 20,
        marginHorizontal:2,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 20,
        backgroundColor: "#F1F5F9",
        shadowColor: "#3282ce9c",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 15,
      },
      goalsListTxt: {
        color: "#737373",
        fontSize: 12,
        fontStyle: "normal",
        lineHeight: 20,
      },
      goalsListTextBold: {
        color: "#171717",
        fontSize: 14,
        fontStyle: "normal",
        lineHeight: 20,
      },
      goalsListTextContainer:{
        width:'72%'
      },
      dividerTop:{
        width:'100%',
        borderTopWidth:1,
        borderTopColor:'#D4D4D4',
        marginTop:2,
        paddingTop:2
      },
      tickContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:5
      }
})