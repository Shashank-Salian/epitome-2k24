"use client";

import "@/threeWorks/index";
import { useEffect } from "react";
import GlobalLoader, { LoadingState } from "../AssetsManager/GlobalLoader";

type Props = {
  onProgress: (prog: number) => void;
};

const ThreeLoader = ({ onProgress }: Props) => {
  useEffect(() => {
    console.log("RUNNING USE EFFECT");
    if (GlobalLoader.loadingState === LoadingState.IDLE) {
      GlobalLoader.onProgressChange = onProgress;

      console.log("USE EFFECT");

      GlobalLoader.loadFirst().then(() =>
        console.log("Finished Loading everything")
      );
    }
    return () => {};
  }, []);

  return <></>;
};

export default ThreeLoader;
