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
})