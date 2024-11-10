import { useState, useEffect } from "react";

interface TypewriterProps {
  texts: string[];
  speed: number;
  deleteSpeed: number;
  stopOnFinish?: boolean;
  afterRemove?: () => void;
}

function Typewriter({
  texts,
  speed,
  deleteSpeed,
  stopOnFinish,
  afterRemove,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (stopOnFinish && isDeleting) return;

    if (textIndex < texts.length) {
      if (!isDeleting && currentIndex < texts[textIndex].length) {
        const timeout = setTimeout(() => {
          setDisplayedText(
            (prevText) => prevText + texts[textIndex][currentIndex]
          );
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else if (isDeleting && currentIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText((prevText) => prevText.slice(0, -1));
          setCurrentIndex((prevIndex) => prevIndex - 1);
        }, deleteSpeed);
        return () => clearTimeout(timeout);
      } else if (currentIndex === 0 && isDeleting) {
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        if (afterRemove) afterRemove();
      } else if (currentIndex === texts[textIndex].length && !isDeleting) {
        setTimeout(() => setIsDeleting(true), 1000);
      }
    }
  }, [
    currentIndex,
    textIndex,
    isDeleting,
    speed,
    deleteSpeed,
    texts,
    stopOnFinish,
    afterRemove
  ]);

  // useEffect(() => {
  //   setDisplayedText("");
  //   setCurrentIndex(0);
  //   setTextIndex(0);
  //   setIsDeleting(false);
  // }, [texts]);

  return <span>{displayedText}</span>;
}

export default Typewriter;
