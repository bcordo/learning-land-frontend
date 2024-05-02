import { StyleSheet } from "react-native";

export   const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F58C39',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      width: '100%',
      height: '75%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    onboardingText:{
      color:'#FAFAFA',
      fontSize:52,  
      fontWeight:'800',
      lineHeight: 56, 
      letterSpacing: -1.04,
    },
    logoStyle: {
      flex:1
    }
  });
