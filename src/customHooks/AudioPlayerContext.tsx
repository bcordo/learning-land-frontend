import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';
import { BASE_URL } from '../assets/constant';
import Toast from 'react-native-toast-message';

interface AudioPlayerContextProps {
  isPlaying: boolean;
  speakText: (text?: string,websokectCheck?:boolean|any) => Promise<void>;
  stopAudio: () => void;
  setIsPlaying:()=>void;
}
const handleError = () => {
  try {
    throw new Error('Simulated error');
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Something went wrong!',
      text2: 'Please try again later.',
      position: 'top',
    });
  }
};
const AudioPlayerContext = createContext<AudioPlayerContextProps | undefined>(undefined);

interface AudioPlayerProviderProps {
  children: ReactNode;
}

const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({ children }) => {
  const navigation:any = useNavigation();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);

  const speakText = async (text: string,websokectCheck:boolean|any): Promise<void> => {
    if (isPlaying) return;
    if(websokectCheck&& navigation?.getCurrentRoute()?.name !== 'CharacterChat') return

    setIsPlaying(true);
    try {
      const response = await RNFetchBlob.fetch(
        'POST',
        `${BASE_URL}/api/v1/utils/text_to_speech/?text=${encodeURIComponent(text)}&voice=alloy`,
        {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      );
      if (response.info().status === 200) {
        const base64Data = response.base64();
        await playAudioChunk(base64Data);
      } else {
        console.error('Text-to-speech error:', response.info().status);
        setIsPlaying(false);
        handleError()
      }
    } catch (error) {
      console.error('Text-to-speech error:', error);
      setIsPlaying(false);
      handleError()
    }
  };

  const playAudioChunk = async (audioChunk: string): Promise<void> => {
    const audioFilePath = `${RNFetchBlob.fs.dirs.CacheDir}/audio.mp3`;

    try {
      await RNFetchBlob.fs.writeFile(audioFilePath, audioChunk, 'base64');

      const sound = new Sound(audioFilePath, '', (error) => {
        if (error) {
          console.error('Error loading sound:', error);
          setIsPlaying(false);
          handleError()
          return;
        }
        setCurrentSound(sound);
        sound.play((success) => {
          setIsPlaying(false);
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.error('Error playing sound');
          }
          sound.release();
        });
      });
    } catch (error) {
      setIsPlaying(false);
      handleError()
      console.error('Error playing audio:', error);
    }
  };

  const stopAndReleaseAudio = () => {
    if (currentSound) {
      currentSound.stop(() => {
        currentSound.release();
        setCurrentSound(null);
        setIsPlaying(false);
      });
    }
  };

  const stopAudio = () => {
    stopAndReleaseAudio();
  };

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      stopAndReleaseAudio();
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation, currentSound]);

  return (
    <AudioPlayerContext.Provider value={{ isPlaying, speakText, stopAudio,setIsPlaying }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export { AudioPlayerProvider, AudioPlayerContext };
