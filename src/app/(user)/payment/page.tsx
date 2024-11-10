"use client"

import React, { useEffect, useState } from 'react'
import { ParticipantsListType } from '@/store/useEventRegister'
import { useRouter } from 'next/navigation'
import QRCode from "react-qr-code"
import { LoaderCircleIcon } from 'lucide-react'
import Image from 'next/image'
import GPayLogo from "@/assets/SVGs/gpay.svg"
import UPILogo from "@/assets/SVGs/upi.svg"
import toast from "react-hot-toast"
import useUserStore from '@/store/useUserStore'

const Payment = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [participants, setParticipants] = useState<ParticipantsListType[]>([])

    const AMOUNT = 1500
    const UPI_URL = `upi://pay?pa=7619256634@axl&pn=AIMIT EPITOME&cu=INR&am=${AMOUNT}&tn=AIMIT EPITOME IT Fest Registration`
    const { user } = useUserStore()
    const router = useRouter()

    useEffect(() => {
        if (!user?.participants || user?.participants?.length <= 0) {
            console.log(user?.participants, user?.participants?.length)
            router.push("/events");
            // throw new Error("Invalid Data List");
        } else
            setParticipants(user?.participants)

        const device = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        setIsMobile(device)
    }, [user, router]);

    const HandlePayment = () => {
        if (isMobile)
            window.location.href = UPI_URL;
        else
            toast.error("UPI application not found!.");
    }

    return (
        <div className='relative flex justify-evenly items-start flex-col md:flex-row gap-8 w-full h-full mt-8 p-8 rounded-lg bg-foreground text-background z-10 backdrop-blur'>
            <div className="flex flex-col w-full h-full bg-border p-6 rounded-md">
                <h1 className='text-[1.2em] font-bold'>Event Summary</h1>

                <div className="flex_center flex-col w-full my-4">
                    <div className="w-full flex justify-between items-center text-[1.2em] font-bold bg-background/20 px-4 py-2">
                        <span>Participant</span>
                        <span>Events</span>
                    </div>

                    {participants.map((participant, index) => (
                        <div key={index} className="w-full flex justify-between items-center px-4 py-2 border-b border-background/50">
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
                <h2 className='text-[1.2em] font-bold text-center mb-2'>Scan QR</h2>

                <div className="flex_center flex-col gap-4 mb-10">
                    {!UPI_URL ?
                        <div className="flex_center bg-border w-[256px] aspect-square rounded-md">
                            <LoaderCircleIcon className='animate-spin' />
                        </div>
                        :
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "250px", width: "100%" }}
                            value={UPI_URL}
                            viewBox={`0 0 256 256`}
                        />
                    }
                </div>

                <button
                    onClick={HandlePayment}
                    className="clip_Btn flex_center gap-4 bg-border px-4 py-2 mx-auto w-fit">
                    <Image src={GPayLogo} alt='GPayLogo' width={30} height={30} />
                    <Image src={UPILogo} alt='UPILogo' width={40} height={40} />
                    <span>Pay via UPI Apps</span>
                </button>
            </div>
        </div>
    )
}

export default Payment