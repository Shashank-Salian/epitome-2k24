"use client";

import { EventsRayCaster } from "@/threeWorks/Models/EventsModel";
import EventList from "@/utils/EventList";
import { useEffect, useRef, useState } from "react";
import RulesCard from "../RulesCard/RulesCard";

type Props = {
  eventName?: string;
  intersecting?: boolean;
};

/**
 * I know the code here is too bad but i was just debugging like this
 * but now it's too late to fix it.
 */

const Event = ({}: Props) => {
  const [curEventIndex, setCurEventIndex] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const observerRef = useRef<HTMLButtonElement>(null);

  const onNextClick = () => {
    if (EventsRayCaster.transitioning) return;
    EventsRayCaster.moveEvent();
    setCurEventIndex((prev) => (prev + 1) % EventList.length);
  };

  const onPreviousClick = () => {
    if (EventsRayCaster.transitioning) return;
    EventsRayCaster.moveEvent(false);
    setCurEventIndex(
      (prev) => (prev - 1 + EventList.length) % EventList.length
    );
  };

  useEffect(() => {
    const iObserver = new IntersectionObserver((entities) => {
      entities.forEach((entity) => {
        if (entity.isIntersecting) {
          EventsRayCaster.moveEvent(true, true);
        } else {
          EventsRayCaster.removeEvents();
        }
      });
    });
    if (observerRef.current) iObserver.observe(observerRef.current);
  }, []);

  return (
    <>
      <div className="mt-12 w-full lg:w-6/12 lg:max-w-screen-md">
        <h1 className="font-iceland text-6xl font-bold">
          {EventList[curEventIndex].title}
        </h1>
        <h2 className="font-iceland text-3xl font-bold">
          {EventList[curEventIndex].eventName}
        </h2>
        <p className="mt-6 font-oxanium text-2xl">
          {EventList[curEventIndex].description}
        </p>
        <div className="flex justify-end mt-8">
          <button
            className="font-iceland text-2xl border-2 border-[#0048FF] px-9 py-1"
            ref={observerRef}
            onClick={() => setShowRules(true)}
          >
            Challenge Me
          </button>
        </div>

        <div className="flex justify-around mt-8">
          <button
            className="font-iceland text-2xl px-10 py-3"
            onClick={onPreviousClick}
            data-augmented-ui="bl-clip tr-clip border"
          >
            Previous Challenge
          </button>

          <button
            className="font-iceland text-2xl px-9 py-1"
            onClick={onNextClick}
            data-augmented-ui="bl-clip tr-clip border"
          >
            Next Challenge
          </button>
        </div>
      </div>
      {showRules && (
        <RulesCard
          rules={EventList[curEventIndex].rules}
          onCloseClick={() => setShowRules(false)}
        />
      )}
    </>
  );
};

export default Event;
