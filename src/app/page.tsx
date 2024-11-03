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

export default function Home() {
  const { loadingCompleted, loadingProgress } = useLoader()
  // console.log("LoadingState", { loadingCompleted, loadingProgress })

  return (
    <>
      {loadingCompleted ? (
        <main className="w-full">
          <Header />
          <Events />
        </main>
      )
        :
        <LoadingScreen progress={loadingProgress} />
      }
      <ThreeComp />
    </>
  );
}
