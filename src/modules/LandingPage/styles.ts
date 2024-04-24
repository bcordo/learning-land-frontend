import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    width: '50%',
    height: '50%',
    justifyContent: 'flex-end',
    gap: 12,
  },
  buttonContainer: {
    width: '90%',
    gap: 6,
    marginBottom: 16,
  },
  learningLandText: {
    color: 'orange',
    fontSize: 42,
    fontWeight: 'bold',
  },
  iconContainer: {
    alignItems: 'center',
  },
  getStarted: {
    backgroundColor: 'orange',
    width: '100%',
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  alreadyHaveAccountButtonText: {
    color: 'orange',
    fontWeight: '500',
  },
  alreadyHaveAnAccount: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 42,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 20,
  },
  blackText: {
    color: '#000',
  },
});
