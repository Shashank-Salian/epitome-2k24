"use client"
import React, { FormEvent } from 'react'
import { Button } from '../../ui/button'
import { CheckCircleIcon, Loader2Icon } from 'lucide-react'
import EventGroup from './EventGroup'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import EventSelector from './EventSelector'
import useEventRegister from '@/store/useEventRegister'
import toast from 'react-hot-toast'
import useUserStore from '@/store/useUserStore'

const EventForm = () => {
    const { selectedEvents } = useEventRegister()
    const { participantsDetails } = useEventRegister()
    const { user } = useUserStore()

    const HandleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Throw error if Empty inputs
        console.log(participantsDetails)
        let isValid = true
        participantsDetails.some(event => {
            event.participants.some(participant => {
                if (participant.name.length <= 0 || (participant.phone && participant.phone.length <= 0)) {
                    toast.error("All Fields are Required!")
                    isValid = false
                    return
                }
            })
            setTimeout(() => { }, 10000)
        })

        if (!isValid) return
        console.log("Event Participants : ", participantsDetails)

        const res = await fetch("/api/post/event-register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user?.email, participantsDetails }),
        });

        const data = await res.json()
        console.log("Event Reg:", data)
    }

    const isLoading = false

    return (
        <div className='flex_center flex-col w-full h-full bg-background/30 rounded-md'>
            <EventSelector />

            <form onSubmit={(e) => HandleRegister(e)} className='w-full h-full p-8 flex_center flex-col gap-6'>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }} className='w-full'>
                    <Masonry gutter='2em' >
                        {selectedEvents?.map((event, index) => (
                            <EventGroup
                                key={index}
                                eventName={event.title}
                                participants={event.participantCount} />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>

                {participantsDetails && <Button type='submit' className='flex_center gap-4 max-w-[500px] text-[1em] text-white font-bold tracking-wide hover:bg-primary' disabled={isLoading}>
                    {isLoading ?
                        <Loader2Icon className='animate-spin' />
                        : <CheckCircleIcon />
                    }
                    Complete Registration
                </Button>}
            </form>
        </div>
    )
}

export default EventForm