"use client";

import dynamic from "next/dynamic";

const ThreeLoader = dynamic(() => import("./ThreeLoader"), {
  ssr: false,
});

const ThreeComp = () => {
  return (
    <div id="three-work" className="fixed top-0 left-0">
      <ThreeLoader />
    </div>
  );
};

export default ThreeComp;
