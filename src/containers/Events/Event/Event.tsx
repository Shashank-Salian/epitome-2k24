"use client";

import { EventsRayCaster } from "@/threeWorks/Models/EventsModel";
import EventList from "@/utils/EventList";
import { useEffect, useRef, useState } from "react";

type Props = {
  eventName?: string;
  intersecting?: boolean;
};

const Event = ({ intersecting }: Props) => {
  const [curEventIndex, setCurEventIndex] = useState(0);
  const doneAdding = useRef(false);

  const onNextClick = () => {
    EventsRayCaster.moveEvent();
    setCurEventIndex((prev) => (prev + 1) % EventList.length);
  };

  const onPreviousClick = () => {
    EventsRayCaster.moveEvent(false);
    setCurEventIndex(
      (prev) => (prev - 1 + EventList.length) % EventList.length
    );
  };

  useEffect(() => {
    if (intersecting && !doneAdding.current) {
      doneAdding.current = true;
      EventsRayCaster.moveEvent();
    }
  }, [intersecting]);

  return (
    <div className="mt-12 w-6/12 max-w-screen-md">
      <h1 className="font-iceland text-6xl font-bold">
        {EventList[curEventIndex].title}
      </h1>
      <h2 className="font-iceland text-3xl font-bold">
        {EventList[curEventIndex].eventName}
      </h2>
      <p className="mt-6 font-oxanium text-2xl">
        A simulation of real-world business challenges, where participants
        showcase their management, leadership, and decision-making skills
        through a series of tech-oriented tasks.
      </p>
      <div className="flex justify-end mt-8">
        <button className="font-iceland text-2xl border-2 border-[#0048FF] px-9 py-1">
          Challenge Me
        </button>
      </div>

      <div className="flex justify-around mt-8">
        <button
          className="font-iceland text-2xl border-2 border-[#0048FF] px-9 py-1"
          onClick={onPreviousClick}
        >
          Previous Challenge
        </button>

        <button
          className="font-iceland text-2xl border-2 border-[#0048FF] px-9 py-1"
          onClick={onNextClick}
        >
          Next Challenge
        </button>
      </div>
    </div>
  );
};

export default Event;
