"use client";

import "@/threeWorks/index";
import { useEffect } from "react";
import GlobalLoader, { LoadingState } from "../AssetsManager/GlobalLoader";
// import useLoader from "@/store/useLoader";

type Props = {
  onProgress: (prog: number) => void;
};

const ThreeLoader = ({ onProgress }: Props) => {
  // const {updateLoadingProgress} = useLoader()

  useEffect(() => {
    if (GlobalLoader.loadingState === LoadingState.IDLE) {
      GlobalLoader.onProgressChange = onProgress;

      GlobalLoader.loadFirst().then(() =>
        console.log("Finished Loading everything")
      );
    }
    return () => {};
  }, [onProgress]);

  return <></>;
};

export default ThreeLoader;
