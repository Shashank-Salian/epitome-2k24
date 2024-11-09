"use client"

// import { eventPayment } from '@/app/actions/PaymentActions'
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import useEventRegister from '@/store/useEventRegister'
import useUserStore from '@/store/useUserStore'
import { useRouter } from 'next/navigation'
// import axios from 'axios'
import QRCode from "react-qr-code"
import { generateUPIURL } from '@/app/actions/PaymentActions'
import toast from 'react-hot-toast'
import { CircleSlash, LoaderCircleIcon } from 'lucide-react'
import Image from 'next/image'
import GPayLogo from "@/assets/SVGs/gpay.svg"
import UPILogo from "@/assets/SVGs/upi.svg"

const Payment = () => {
    const [UPI_URL, setUPI_URL] = useState<string>('')
    const { user } = useUserStore()
    const { participantsList } = useEventRegister()
    const router = useRouter()

    const fetchUPICode = useCallback(async () => {
        try {
            if (participantsList.length <= 0) {
                router.push("/events");
                throw new Error("Invalid Data List");
            }

            console.log({ participantsList });

            // Fetch UPI URL
            const upiURL = await generateUPIURL({ participantsList });
            setUPI_URL(upiURL);

        } catch (error) {
            toast.error("Failed to Generate UPI");
            console.error("Generate UPI : ", error);
        }
    }, [participantsList, router]);

    useEffect(() => {
        if (participantsList.length > 0) {
            fetchUPICode();
        }
    }, [participantsList, fetchUPICode]);

    // const eventRegistration = async () => {
    // const res = await eventPayment(paymentData)
    // const res = await axios.post('api/post/payment', paymentData)
    // console.log("Payment_Response : ", res)
    // }

    return (
        <div className='relative flex justify-evenly items-start flex-col md:flex-row gap-8 w-full h-full mt-8 p-8 rounded-lg bg-foreground text-background z-10 backdrop-blur'>
            <div className="flex flex-col w-full h-full bg-border p-6 rounded-md">
                <h1 className='text-[1.2em] font-bold'>Event Summary</h1>

                <div className="flex_center flex-col w-full my-4">
                    <div className="w-full flex justify-between items-center text-[1.2em] font-bold bg-background/20 px-4 py-2">
                        <span>Participant</span>
                        <span>Events</span>
                        <span>Fees</span>
                    </div>

                    {participantsList.map((participant, index) => (
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

                            <div className="">Rs. 100</div>
                        </div>
                    ))}

                    <div className="w-full flex justify-between items-center px-4 py-2">
                        <span className="text-[1.2em] font-bold">Total</span>
                        <span className="text-[1.2em] font-bold">Rs. {participantsList.length * 100}</span>
                    </div>
                </div>
            </div>

            {/* Separator */}
            <div className="w-px h-full bg-background/50"></div>

            <div className="flex flex-col w-full h-full px-6">
                <h2 className='text-[1.2em] font-bold'>Payment</h2>

                <div className="flex_center flex-col gap-4 mb-10">
                    <span>Scan QR</span>
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

                <a
                    href={UPI_URL}
                    className="clip_Btn flex_center gap-4 bg-border px-4 py-2 mx-auto w-fit">
                    <Image src={GPayLogo} alt='GPayLogo' width={30} height={30} />
                    <Image src={UPILogo} alt='UPILogo' width={40} height={40} />
                    <span>Pay via UPI Apps</span>
                </a>
            </div>
        </div>
    )
}

export default Payment