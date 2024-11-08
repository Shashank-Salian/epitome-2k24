import { useState, useEffect } from 'react';

interface GlitchProps {
  text: string;
  glitchChars?: string;
  glitchDuration?: number;
  pauseDuration?: number;
}

function Glitch({ text, glitchChars = "!@#$%^&*()", glitchDuration = 100, pauseDuration = 2000 }: GlitchProps) {
  const [displayedText, setDisplayedText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchEffect = () => {
      if (isGlitching) return;
      setIsGlitching(true);

      const originalText = text.split('');
      const interval = setInterval(() => {
        setDisplayedText(
          originalText.map((char, index) => 
            Math.random() < 0.3 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
          ).join('')
        );
      }, glitchDuration);

      setTimeout(() => {
        clearInterval(interval);
        setDisplayedText(text);
        setIsGlitching(false);
      }, glitchDuration * 10); 
    };

    const timeout = setTimeout(glitchEffect, pauseDuration);
    return () => clearTimeout(timeout);
  }, [text, glitchChars, glitchDuration, pauseDuration, isGlitching]);

  return <span className="inline-block">{displayedText}</span>;
}

export default Glitch;


