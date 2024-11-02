"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import LoadingScreen from "./LoadingScreen/LoadingScreen";

const ThreeLoader = dynamic(() => import("./ThreeLoader"), {
  ssr: false,
});

const ThreeComp = ({ onFinishLoading }: { onFinishLoading: () => void }) => {
  const [loadingState, setLoadingState] = useState(0);
  const [removeLoad, setRemoveLoad] = useState(false);

  const onProgress = (prog: number) => {
    setLoadingState(prog);

    if (prog === 100) {
      setTimeout(() => {
        setRemoveLoad(true);
        onFinishLoading();
      }, 1600);
    }
  };

  return (
    <>
      {removeLoad ? null : <LoadingScreen progress={loadingState} />}
      <div id="three-work" className="fixed top-0 left-0 z-[-10]">
        <ThreeLoader onProgress={onProgress} />
      </div>
    </>
  );
};

export default ThreeComp;
