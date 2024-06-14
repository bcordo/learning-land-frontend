import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    defaultFontFamilyBold: {
        fontFamily: "Montserrat-Bold",
      },
    wrapper: {
        width: 40,
        height: 40,
        backgroundColor: "#F1F5F9",
        borderRadius: 20,
        justifyContent: "center",
        shadowColor: "#3282ce9c",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
      },
      wrapper2: {
        width: 37,
        height: 37,
        backgroundColor: "#F1F5F9",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
      },
      wrapper3: {
        width: 27,
        height: 27,
        backgroundColor: "#F1F5F9",
        borderRadius: 100,
        justifyContent: "center",
        shadowColor: "#3282ce9c",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
        alignItems: "center",
      },
    
      timer: {
        fontSize: 8,
        fontWeight: "bold",
        color: "#737373",
      },
})