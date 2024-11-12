"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import useModalStore from '@/store/useModalStore'
import useUserStore from '@/store/useUserStore'
import { LogOutIcon } from 'lucide-react'
import React from 'react'

const Dashboard = () => {
    const { user } = useUserStore()
    const { setShowModal } = useModalStore()

    const PaymentColor = (user?.paymentStatus == "PENDING") ? "bg-red-700" : (user?.paymentStatus == "PROCESSING") ? "bg-yellow-400" : "bg-green-600"

    return (
        <div className=''>
            <div
                data-augmented-ui="tr-clip tl-clip bl-clip br-clip"
                className='bg-background/50 my-8 p-6 rounded'>
                <div className="flex justify-between items-center">
                    <h1 className='font-beyonders text-center'>Team - {user?.collegeName} ({user?.department})</h1>

                    <Button onClick={() => setShowModal("LOGOUT_MODAL")} variant={'destructive'} className="clip_Btn gap-4 px-8 bg-red-800 hover:bg-red-900 font-oxanium">
                        <LogOutIcon size={20} />
                        LOGOUT
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center my-8">
                    <div className="clip_Btn w-fit py-2 px-8 bg-secondary/20">Events Registered : {user?.events.length}</div>
                    <div className="clip_Btn w-fit py-2 px-8 bg-secondary/20">Total Participants : {user?.participants.length}</div>
                    <div className="clip_Btn w-fit py-2 px-8 bg-secondary/20">Team Accomodation : {user?.accomodationRequired ? "YES" : "NO"}</div>
                    <div className={cn("clip_Btn w-fit py-2 px-8 bg-red-700", PaymentColor)}>Payment Status : {user?.paymentStatus}</div>
                </div>

                {user?.participants.length !== 0 &&
                    <div
                        data-augmented-ui="tr-clip tl-clip bl-clip br-clip"
                        className="flex_center flex-col w-full my-4 bg-foreground/10 p-4 rounded-md">
                        <div className="w-full flex justify-between items-center text-[1.2em] font-bold bg-background/20 px-4 py-2 rounded-md">
                            <span>Participant</span>
                            <span>Events</span>
                        </div>

                        {user?.participants.map((participant, index) => (
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
                    </div>}
            </div>

            <p className="font-oxanium text-center">
                * If you encounter any issues with the registration process, please contact at : +91 7619256634
            </p>
        </div>
    )
}

export default Dashboard