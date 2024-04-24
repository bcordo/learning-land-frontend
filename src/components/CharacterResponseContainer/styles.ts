import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  characterResponseContainer: {
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

  characterResponseText: {
    color: '#171717',
    fontSize: 14,
    lineHeight: 20,
  },

  translateContainer: {
    marginTop: 12,
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
    marginTop: 45,
  },
  text: {
    margin: 10,
  },
  menu: {
    position: 'absolute',
    bottom: -100,
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
    // flex: 1,
    width: 220,
  },
  menuContainer: {
    position: 'relative',
    zIndex: 0,
  },
  menuListItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {},
  profileIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 50,
    height: 50,
  },
  estherText: {
    color: '#737373',
    fontSize: 14,
  },
});
