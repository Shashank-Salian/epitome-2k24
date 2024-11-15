"use client";

import React, { useEffect, useState } from "react";
import { ParticipantsListType } from "@/store/useEventRegister";
import { useRouter } from "next/navigation";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import useUserStore from "@/store/useUserStore";
import RecieptUpload from "./RecieptUpload";

const Payment = () => {
  const [participants, setParticipants] = useState<ParticipantsListType[]>([]);

  const AMOUNT = 1500;
  const ACC_NO = "412902010012342";
  const IFSC = "UBIN0541290";
  //   const UPI_URL = `upi://pay?pa=7619256634@axl&pn=AIMIT EPITOME&cu=INR&am=${AMOUNT}&tn=AIMIT EPITOME IT Fest Registration`;
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user?.participants || user?.participants?.length <= 0) {
      console.log(user?.participants, user?.participants?.length);
      //   router.push("/events");
      return;
    } else setParticipants(user?.participants);
  }, [user, router]);

  const copyText = (text: string) => {
    window.navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="relative w-full h-full mt-8 mb-12 p-8 rounded-lg bg-foreground text-background z-10 backdrop-blur">
      <div className="flex justify-evenly items-start flex-col md:flex-row gap-8 w-full h-full">
        <div className="flex flex-col w-full h-full bg-border p-6 rounded-md">
          <h1 className="text-[1.2em] font-bold">Event Summary</h1>

          <div className="flex_center flex-col w-full my-4">
            <div className="w-full flex justify-between items-center text-[1.2em] font-bold bg-background/20 px-4 py-2 rounded-md">
              <span>Participant</span>
              <span>Events</span>
            </div>

            {participants.map((participant, index) => (
              <div
                key={index}
                className="w-full flex justify-between items-center px-4 py-2 border-b border-background/50"
              >
                <div className="flex flex-col">
                  <span>{participant.name}</span>
                  <span>{participant.phone}</span>
                </div>

                <div className="flex_center gap-4 overflow-hidden flex-wrap">
                  {participant.events.map((event, indx) => (
                    <span key={indx}>{event.eventType}</span>
                  ))}
                </div>
              </div>
            ))}

            <div className="w-full flex justify-between items-center px-4 py-2">
              <span className="text-[1.2em] font-bold">Total</span>
              <span className="text-[1.2em] font-bold">Rs. {AMOUNT}</span>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-px h-full bg-background/50"></div>

        <div className="flex flex-col w-full h-full px-6">
          <h2 className="text-[1.2em] font-bold font-oxanium mb-4">
            You can Bank Transfer the amount to the below details :
          </h2>

          <div className="font-oxanium">
            <h2 className="flex mb-4">
              Account Number :{" "}
              <div className="mx-2 flex" onClick={() => copyText(ACC_NO)}>
                <span className="font-bold cursor-pointer">{ACC_NO}</span>
                <Copy className="cursor-pointer ml-2 p-px" />
              </div>
            </h2>
            <h2 className="flex mb-4">
              IFSC Code :{" "}
              <div className="mx-2 flex" onClick={() => copyText(IFSC)}>
                <span className="font-bold cursor-pointer">{IFSC}</span>
                <Copy className="cursor-pointer ml-2 p-px" />
              </div>
            </h2>
          </div>
        </div>
      </div>

      <RecieptUpload />
    </div>
  );
};

export default Payment;
