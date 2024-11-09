import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
interface AudioContextType {
  isMusicOn: boolean;
  setIsMusicOn: React.Dispatch<React.SetStateAction<boolean>>;
}
const AudioContext = createContext<AudioContextType>({
  isMusicOn: false,
  setIsMusicOn: () => {},
});

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMusicOn, setIsMusicOn] = useState<boolean>(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const player = new Audio('../../assets/Music/Chronometry.mp3');
    player.loop = true;
    setAudioPlayer(player);

    return () => {
      if (audioPlayer) audioPlayer.pause();
      setAudioPlayer(null);
    };
  }, []);

  useEffect(() => {
    if (isMusicOn && audioPlayer) {
      audioPlayer.play();
    } else if (audioPlayer) {
      audioPlayer.pause();
    }
  }, [isMusicOn, audioPlayer]);

  return (
    <AudioContext.Provider value={{ isMusicOn, setIsMusicOn }}>
      {children}
    </AudioContext.Provider>
  );
};
export const useAudio = () => {
  console.log("audio")
  return useContext(AudioContext);
};
