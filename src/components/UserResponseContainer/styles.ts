import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  defaultFontFamily:{
    fontFamily: 'Montserrat-Regular',
  },
  defaultFontFamilyBold:{
    fontFamily: 'Montserrat-Bold',
  },
  userResponseContainer: {
    alignItems: 'flex-end',
    marginTop: 16,
  },
  profileAlignmnent: {
    flexDirection: 'row-reverse',
  },
  userResponseTxtContainer: {
    width: '90%',
    marginBottom:6,
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
  },
  userResponseTxt: {
    color: '#171717',
    fontSize: 14,
    lineHeight: 20,
  },
  userResponseTxtOranged: {
    color: '#FF8B67',
  },
  userResponseIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  profileIconContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  profileIcon: {
    width: 29,
    height: 29,
  },
  estherText: {
    color: '#737373',
    fontSize: 14,
    lineHeight:20
  },
});
