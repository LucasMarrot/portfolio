import React, { createContext, useContext, useState, useEffect } from "react";
import backgroundMusicByLidrima from "../assets/sounds/backgroundMusicByLidrima.mp3";

type SoundContextType = {
  isSoundEnabled: boolean;
  toggleSound: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [backgroundMusic] = useState(new Audio(backgroundMusicByLidrima));

  useEffect(() => {
    backgroundMusic.loop = true;

    return () => {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, [backgroundMusic]);

  useEffect(() => {
    if (isSoundEnabled) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  }, [isSoundEnabled, backgroundMusic]);

  const toggleSound = () => {
    setIsSoundEnabled((prev) => !prev);
  };

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
