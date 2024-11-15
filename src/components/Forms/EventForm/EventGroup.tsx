"use client";
import React, { useState } from "react";
import EventField from "./EventField";
import useEventRegister from "@/store/useEventRegister";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  eventName: string;
  eventCategory: string;
  minParticipant: number;
  maxParticipant: number;
};

const EventGroup = ({ eventName, eventCategory, minParticipant, maxParticipant }: Props) => {
  const [participantCount, setParticipantCount] =
    useState<number>(minParticipant);

  const IncrementParticipant = () => {
    if (participantCount >= maxParticipant) {
      toast.error("Max Event Participants : " + maxParticipant);
      return;
    }

    setParticipantCount((prev) => prev + 1);
  };
  const DecrementParticipant = () => {
    if (participantCount <= minParticipant) {
      toast.error("Min Event Participants : " + minParticipant);
      return;
    }

    setParticipantCount((prev) => prev - 1);
  };

  return (
    <div
      data-augmented-ui="tl-clip tr-2-clip-x br-clip bl-2-clip-x border"
      className="relative flex flex-col gap-4 p-6 bg-background/20 w-full"
    >
      <div className="flex justify-between items-center gap-4">
        <div className="flex justify-center items-start flex-col">
          <span className="text-[1.2em] font-bold">{eventName}</span>
          <span className="text-[0.8em] opacity-80">{eventCategory}</span>
        </div>

        {minParticipant !== maxParticipant && (
          <div className="flex_center bg-foreground text-background rounded-md">
            <Button
              type="button"
              variant={"secondary"}
              size={"icon"}
              onClick={DecrementParticipant}
            >
              <Minus />
            </Button>
            <div className="w-10 aspect-square flex_center border-r border-l border-background/30">
              {participantCount}
            </div>
            <Button
              type="button"
              variant={"secondary"}
              size={"icon"}
              onClick={IncrementParticipant}
            >
              <Plus />
            </Button>
          </div>
        )}
      </div>

      {Array.from({ length: participantCount }).map((_, index) => (
        <EventField key={index} index={index} eventName={eventName} />
      ))}
    </div>
  );
};

export default EventGroup;
