import { useEffect, useState } from "react";
import classes from "./LoadingScree.module.css";

type Props = {
  progress: number;
};

const LoadingScreen = ({ progress }: Props) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length < 3) {
          return (prev += ".");
        }
        return "";
      });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-dvw h-dvh flex justify-center items-center flex-col z-[100] select-none px-2 md:px-0 ${
        classes.container
      } ${progress === 100 ? classes.zoomIn : ""}`}
    >
      <div className="flex">
        <h1 className="font-spaceAge text-5xl lg:text-8xl">LOADING</h1>
        <p className="min-w-20 font-spaceAge text-5xl lg:text-8xl">{dots}</p>
      </div>

      <div className="w-full max-w-xl h-4 rounded-2xl mt-7 bg-slate-500">
        <div
          className="bg-white h-full rounded-2xl"
          style={{ width: `${progress < 1 ? 4 : progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
