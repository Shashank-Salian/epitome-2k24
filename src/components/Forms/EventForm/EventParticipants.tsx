"use client"
import React from 'react'
import useEventRegister from '@/store/useEventRegister'

const EventParticipants = () => {
    const { participantsList } = useEventRegister()

    if (participantsList.length > 0)
        return (
            <div className='w-full px-8 py-4 rounded-md bg-foreground/80 text-background'>
                <div className="flex justify-between items-center">
                    <h3 className='text-[1.2em] font-bold text-center'>Event Participants</h3>
                    <div className="px-4 py-2 border border-primary rounded">Total Participants : {participantsList.length} / 15</div>
                </div>
                <div className="flex_center flex-col w-full my-4">
                    <div className="w-full flex justify-between items-center text-[1.2em] font-bold bg-background/20 px-4 py-2">
                        <span>Participant</span>
                        <span>Events</span>
                        {/* <span>Fees</span> */}
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

                            {/* <div className="">Rs. 100</div> */}
                        </div>
                    ))}

                    {/* <div className="w-full flex justify-between items-center px-4 py-2">
                        <span className="text-[1.2em] font-bold">Total</span>
                        <span className="text-[1.2em] font-bold">{participantsList.length * 100}</span>
                    </div> */}
                </div>
            </div>
        )
}

export default EventParticipants