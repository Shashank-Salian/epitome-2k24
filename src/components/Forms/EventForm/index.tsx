"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "../../ui/button";
import { Loader2Icon, SendIcon } from "lucide-react";
import EventGroup from "./EventGroup";
import Masonry, { ResponsiveMasonry } from "@wowblvck/react-responsive-masonry";
import EventSelector from "./EventSelector";
import useEventRegister, { ParticipantsListType } from "@/store/useEventRegister";
import toast from "react-hot-toast";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import EventParticipants from "./EventParticipants";

const EventForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const { selectedEvents, displayForm, participantsDetails, participantsList, setParticipantsList, setDisplayForm } = useEventRegister();
  const { user, setUser } = useUserStore();
  const router = useRouter();

  const HandleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("HandleRegister", participantsDetails);

    if (participantsList.length > 15) {
      toast.error("Max 15 Participants Allowed!");
      return;
    }

    let isValid = true;
    participantsList.some((participant) => {
      if (participant.name.length <= 0 || (participant.phone && participant.phone.length <= 0)) {
        toast.error("All Fields are Required!");
        isValid = false;
        return false
      }
    });

    if (!isValid) return;
    console.log("Event Participants : ", { participantsDetails, participantsList });

    const SubmitToastID = toast.loading("Submitting Registration...");
    try {
      const res = await fetch("/api/post/event-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user?.email, participantsDetails, participantsList }),
      });

      const data = await res.json();
      console.log("Event Reg:", data);

      if (res?.status === 201) {
        setUser(data.user);
        toast.success("Event Registrations Submitted!", {
          id: SubmitToastID,
        });

        router.push("/payment");
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        id: SubmitToastID,
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Confirm Participants List
  const HandleParticipantsList = () => {
    let isValid = true;
    participantsDetails.map((event) => ({
      participants: event.participants.some((p) => {
        if (p.name.length <= 0 || p.phone.length <= 0) {
          isValid = false;
          return
        }
      }),
    }));

    if (!isValid) {
      toast.error("Enter All Fields!");
      return;
    }

    let hasInvalidParticipants = false;
    // Check is IT Manager & Treasure Hunt participants are participating in any other events
    let itManagerParticipant: string = ""
    let videographyParticipant: string = ""
    let treasureHuntParticipant: string[] = []
    participantsDetails.some((event) => {
      if (event.category == "IT Manager") {
        itManagerParticipant = event.participants[0].phone
      }
      if (event.category == "Videography") {
        videographyParticipant = event.participants[0].phone
      }
      if (event.category == "Treasure Hunt") {
        treasureHuntParticipant = event.participants.map(participant => participant.phone)
      }
    });

    participantsDetails.map(event => {
      if (event.category !== "IT Manager" && event.category !== "Treasure Hunt") {
        event.participants.some(participant => {
          if (participant.phone == itManagerParticipant) {
            toast.error("IT Manager participant cannot participate in other events!")
            hasInvalidParticipants = true
            return false
          }

          if (participant.phone == videographyParticipant) {
            toast.error("Videography participant cannot participate in other events!")
            hasInvalidParticipants = true
            return false
          }

          if (treasureHuntParticipant.includes(participant.phone)) {
            toast.error("Treasure Hunt participants cannot participate in other events!")
            hasInvalidParticipants = true
            return false
          }
        })
      }
    })

    if (hasInvalidParticipants) {
      return;
    }

    setDisplayForm(false);
    const updatedParticipantsList: ParticipantsListType[] = [];

    participantsDetails.forEach((event) => {
      event.participants.forEach((p) => {
        const existingParticipantIndex = updatedParticipantsList.findIndex(
          (participant) => participant.phone === p.phone
        );

        if (existingParticipantIndex !== -1) {
          updatedParticipantsList[existingParticipantIndex].events.push({
            eventName: event.title,
            eventType: event.category,
          });
        } else {
          updatedParticipantsList.push({
            name: p.name,
            phone: p.phone,
            events: [
              {
                eventName: event.title,
                eventType: event.category,
              },
            ],
          });
        }
      });
    });

    console.log({ updatedParticipantsList });

    if (updatedParticipantsList.length > 15) {
      toast.error("Max 15 participants allowed!");
      return;
    }

    setParticipantsList(updatedParticipantsList);
    setShowSubmit(true);
  };

  return (
    <div className="flex_center flex-col w-full p-4 h-full bg-background/20 rounded-md backdrop-blur-md font-oxanium">
      <EventSelector />
      <form onSubmit={(e) => HandleRegister(e)} className="w-full h-full flex_center flex-col gap-6 pb-10">
        {displayForm && (
          <>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 820: 2, 1300: 3 }}
              className="w-full"
            >
              <Masonry gutter="1rem" columnsCount={3}>
                {selectedEvents?.map((event, index) => (
                  <EventGroup
                    key={index}
                    eventName={event.title}
                    eventCategory={event.category}
                    minParticipant={event.minParticipant}
                    maxParticipant={event.maxParticipant}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>

            <Button
              type="button"
              onClick={HandleParticipantsList}
              className="flex_center gap-4 max-w-[500px] text-[1em] text-white font-bold tracking-wide hover:bg-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <SendIcon />
              )}
              Confirm Participants
            </Button>
          </>
        )}

        <EventParticipants />

        {showSubmit && (
          <Button
            type="submit"
            className="flex_center gap-4 max-w-[500px] text-[1em] text-white font-bold tracking-wide hover:bg-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <SendIcon />
            )}
            Submit Registration
          </Button>
        )}
      </form>
    </div>
  );
};

export default EventForm;
