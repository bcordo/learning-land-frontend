import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  userResponseContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: 16,
  },
  profileAlignmnent: {
    flexDirection: 'row-reverse',
  },
  userResponseTxtContainer: {
    width: '90%',
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
    marginBottom: 16,
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
});
