"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

import "@/threeWorks/index";
import GlobalLoader, { LoadingState } from "../AssetsManager/GlobalLoader";
import { SpaceShip } from "../Models/SpaceShip";

type Props = {
  onProgress: (prog: number) => void;
};

const ThreeLoader = ({ onProgress }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (GlobalLoader.loadingState === LoadingState.IDLE) {
      GlobalLoader.onProgressChange = onProgress;

      GlobalLoader.loadFirst().then(() => {
        if (pathname === "/") {
          SpaceShip.add();

          return () => SpaceShip.remove();
        }

        if (pathname === "/challenges") {
          SpaceShip.remove();
          return;
        }
        console.log("Finished Loading everything");
      });
    }

    if (GlobalLoader.loadingState === LoadingState.LOADED) {
      if (pathname === "/") {
        SpaceShip.add();

        return () => {
          SpaceShip.remove();
        };
      }

      SpaceShip.remove();
    }
    return () => {};
  }, [onProgress, pathname]);

  return <></>;
};

export default ThreeLoader;
