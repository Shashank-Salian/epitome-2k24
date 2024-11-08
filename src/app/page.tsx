"use client";

import dynamic from "next/dynamic";

import Header from "@/components/CustomUI/Header";
// import Events from "@/containers/Events/Events";
import ThreeComp from "@/threeWorks/components/ThreeComp";
import { useState } from "react";
import NoSSR from "@/components/NoSSR/NoSSR";
import useLoader from "@/store/useLoader";
import LoadingScreen from "@/threeWorks/components/LoadingScreen/LoadingScreen";

const Events = dynamic(() => import("@/containers/Events/Events"), {
  ssr: false,
});
const LandingPage = dynamic(
  () => import("@/containers/LandingPage/LandingPage"),
  {
    ssr: false,
  }
);

export default function Home() {
  const { loadingCompleted, loadingProgress, isInitialLoad } = useLoader();
  // console.log("LoadingState", { loadingCompleted, loadingProgress })

  return (
    <>
      {/* {isInitialLoad && !loadingCompleted ? (
        <LoadingScreen progress={loadingProgress} />
      ) : ( */}
      <main className="w-full" style={{ scrollSnapType: "y mandatory" }}>
        {/* <LandingHeader /> */}
        <LandingPage />
        {/* <Events /> */}
      </main>
      {/* )}
      <ThreeComp /> */}
    </>
  );
}
