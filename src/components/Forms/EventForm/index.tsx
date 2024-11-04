"use client"
import React, { FormEvent, useState } from 'react'
import Input from '../../CustomUI/Input'
import { Button } from '../../ui/button'
import { CheckCircleIcon, Loader2Icon, UserPlusIcon } from 'lucide-react'
import EventGroup from './EventGroup'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import EventSelector from './EventSelector'
import { eventRegisterList, EventRegType } from '@/utils/EventList'
import useEventRegister from '@/store/useEventRegister'



const EventForm = () => {
    const { selectedEvents } = useEventRegister()

    function HandleRegister(event: FormEvent<HTMLFormElement>): void {
        throw new Error('Function not implemented.')
    }



    const isLoading = false

    return (
        <div className='flex_center flex-col w-full h-full bg-background/30 rounded-md'>
            <EventSelector />

            <form onSubmit={HandleRegister} className='w-full h-full p-8 flex_center flex-col'>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }} className='w-full'>
                    <Masonry gutter='2em' >
                        {selectedEvents?.map((event, index) => (
                            <EventGroup key={index} eventName={event.title} participants={event.participants} />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>

                <Button type='submit' className='flex_center gap-4 max-w-[500px] text-[1em] text-white font-bold tracking-wide hover:bg-primary' disabled={isLoading}>
                    {isLoading ?
                        <Loader2Icon className='animate-spin' />
                        : <CheckCircleIcon />
                    }
                    Complete Registration
                </Button>
            </form>
        </div>
    )
}

export default EventForm