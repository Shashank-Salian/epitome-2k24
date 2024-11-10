"use client";

import React, { useState, useEffect, useRef } from "react";

const ToggleUI = () => {
  const [isOn, setIsOn] = useState(true); // Default to 'on'
  const audioRef = useRef<HTMLAudioElement>(
    new Audio("/Music/Chronometry.mp3")
  );

  useEffect(() => {
    audioRef.current.volume = 0;
    audioRef.current.autoplay = true;

    const playAudio = async () => {
      try {
        await audioRef.current.play(); // Play the audio
        fadeIn(audioRef.current); // Apply fade-in effect
        audioRef.current.loop = true;
      } catch (error) {
        console.error("Audio playback error:", error);
      }
    };

    const playEvent = () => {
      playAudio();
      document.removeEventListener("click", playEvent);
    };

    document.addEventListener("click", playEvent);

    return () => {
      document.addEventListener("click", playEvent);
    };
  }, []);

  const fadeIn = (audio: HTMLAudioElement) => {
    const fadeInDuration = 1000;
    let volume = 0;

    const fadeInInterval = setInterval(() => {
      if (audio && volume < 0.4) {
        volume = Math.min(0.4, volume + 0.1);
        audio.volume = volume;
      } else {
        clearInterval(fadeInInterval);
      }
    }, fadeInDuration / 10);
  };

  const fadeOut = (audio: HTMLAudioElement) => {
    const fadeOutDuration = 1000;
    let volume = audio.volume;

    const fadeOutInterval = setInterval(() => {
      if (audio && volume > 0) {
        volume = Math.max(0, volume - 0.1);
        audio.volume = volume;
      } else {
        clearInterval(fadeOutInterval);
        audio.pause();
      }
    }, fadeOutDuration / 10);
    console.log(fadeOutInterval);
  };

  const handleToggle = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setIsOn((prevState) => {
      if (prevState) {
        fadeOut(audio);
      } else {
        audio.volume = 0;
        audio
          .play()
          .catch((error) => console.error("Audio playback error:", error));
        fadeIn(audio);
      }
      return !prevState;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 md:mt-6 absolute bottom-1 right-2 font-spaceAge">
      <div className="text-white font-semibold text-sm md:text-lg">Music</div>
      <div
        className={`relative inline-block w-16 h-10 md:w-20 md:h-12 rounded-full cursor-pointer transition-all ${
          isOn
            ? "bg-gradient-to-r from-green-400 to-blue-500 shadow-glow"
            : "bg-gray-600"
        }`}
        onClick={handleToggle}
      >
        <div
          style={{ right: `${isOn ? "0.25rem" : "calc(50% - 0.25rem)"}` }}
          className={`absolute top-1 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-xl transition-all duration-300`}
        ></div>
      </div>
      <div className="flex justify-center space-x-6 w-full">
        <span
          className={`text-white text-sm transition-opacity duration-300 ${
            isOn ? "opacity-0" : "opacity-100"
          }`}
        >
          OFF
        </span>
        <span
          className={`text-white text-sm transition-opacity duration-300 ${
            isOn ? "opacity-100" : "opacity-0"
          }`}
        >
          ON
        </span>
      </div>
    </div>
  );
};

export default ToggleUI;
