"use client";

import dynamic from "next/dynamic";

import Header from "@/components/CustomUI/Header";
// import Events from "@/containers/Events/Events";
import ThreeComp from "@/threeWorks/components/ThreeComp";
import { useState } from "react";
import NoSSR from "@/components/NoSSR/NoSSR";

const Events = dynamic(() => import("@/containers/Events/Events"), {
  ssr: false,
});

export default function Home() {
  const [finishedLoading, setFinishedLoading] = useState(false);

  return (
    <>
      {finishedLoading ? (
        <main className="w-full">
          <Header />
          <Events />
        </main>
      ) : null}
      <ThreeComp onFinishLoading={() => setFinishedLoading(true)} />
    </>
  );
}
