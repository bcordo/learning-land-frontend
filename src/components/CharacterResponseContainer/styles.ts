import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  defaultFontFamily:{
    fontFamily: 'Montserrat-Regular',
  },
  defaultFontFamilyBold:{
    fontFamily: 'Montserrat-Bold',
  },
  characterResponseContainer: {
    width: '90%',
    marginLeft:2,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    justifyContent: 'center',
    shadowColor: '#3282ce9c',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 20,
    marginBottom: 20,
  },
  characterResponseText: {
    color: '#171717',
    fontSize: 14,
    lineHeight: 20,
    marginBottom:20
  },

  translateContainer: {
   
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  translateRightContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#D4D4D4',
    marginVertical: 15,
  },
  translationText: {
    color: '#737373',
    fontSize: 12,
    lineHeight: 20,
  },
  quotedText: {
    fontStyle: 'italic',
    color: ' #737373',
    fontSize: 12,
  },
  aiTyping: {
    marginTop:12
  },
  text: {
    margin: 10,
  },
  menu: {
    position: 'absolute',
    bottom: -205,
    right: 0,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: '#3282ce9c',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    zIndex: 1,
    width: 220,
  },
  menuContainer: {
    position: 'relative',
   
  },
  menuListItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,
    borderColor:'#E5E5E5',
  
  },
  

  profileIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 29,
    height: 29,
  },
  estherText: {
    color: '#737373',
    fontSize: 14,
    lineHeight:20,
    letterSpacing:0
  },
  dropdownMenuStyle:{
borderRadius:10,
borderWidth:1,
borderColor:'#D4D4D4'
  },
  dropdownTxtContainer:{
    width:190,
    alignItems:'flex-end',
  }
});
