"use client";

import dynamic from "next/dynamic";

import useLoader from "@/store/useLoader";
import LoadingScreen from "@/threeWorks/components/LoadingScreen/LoadingScreen";

const Events = dynamic(() => import("@/containers/Events/Events"), {
  ssr: false,
});

const Challenge = () => {
  const { isInitialLoad, loadingCompleted, loadingProgress } = useLoader();
  return (
    <>
      {isInitialLoad && !loadingCompleted ? (
        <LoadingScreen progress={loadingProgress} />
      ) : (
        <Events />
      )}
    </>
  );
}

export default Challenge