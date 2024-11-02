"use client";

import { EventsRayCaster } from "@/threeWorks/Models/EventsModel";

type Props = {
  eventName?: string;
};

const Event = (props: Props) => {
  const onNextClick = () => {
    EventsRayCaster.moveNextEvent();
  };

  return (
    <div className="mt-12 max-w-screen-md">
      <h1 className="font-iceland text-6xl font-bold">Rhythmic Resonance</h1>
      <h2 className="font-iceland text-3xl font-bold">Dance Competition</h2>
      <p className="mt-6 font-oxanium text-2xl">
        A simulation of real-world business challenges, where participants
        showcase their management, leadership, and decision-making skills
        through a series of tech-oriented tasks.
      </p>
      <div className="flex justify-end mt-8">
        <button
          className="font-iceland text-2xl border-2 border-[#0048FF] px-9 py-1"
          onClick={onNextClick}
        >
          Challenge Me
        </button>
      </div>
    </div>
  );
};

export default Event;
