import React, { useCallback, useMemo, useState } from 'react'
import { eventRegisterList, EventRegType } from '@/utils/EventList'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CheckCircleIcon, X } from 'lucide-react'
import useEventRegister from '@/store/useEventRegister'
import toast from 'react-hot-toast'

type EventButtonProp = {
    event: EventRegType
}

const EventSelector = () => {
    const { selectedEvents, setDisplayForm, setParticipantsDetails } = useEventRegister()

    // console.log("Events", selectedEvents)
    const handleEventConfirm = () => {
        setParticipantsDetails(selectedEvents || [])
        setDisplayForm(true)
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex justify-between items-center">
                <span className='font-bold text-[1.2em]'>Select Events to Participate</span>
                {/* <Button variant={'secondary'} className='flex_center gap-2 font-bold text-[1.1em]'>
                    <X />
                    Clear
                </Button> */}
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {eventRegisterList.map((event, index) => (
                    <EventButton key={index} event={event} />
                ))}
            </div>

            <div className="flex self-end">
                <Button type='submit' onClick={handleEventConfirm} className='flex_center gap-4 max-w-[500px] text-[1em] text-white font-bold tracking-wide hover:bg-primary'>
                    <CheckCircleIcon />
                    Confirm Selected Events
                </Button>
            </div>
        </div >
    )
}

const EventButton = ({ event }: EventButtonProp) => {
    const { selectedEvents, setSelectedEvents, setDisplayForm } = useEventRegister()

    const isSelected = useMemo(() =>
        selectedEvents?.some(item => event.title === item.title),
        [selectedEvents, event.title]
    )

    const handleEventSelection = useCallback(() => {
        setDisplayForm(false)

        if (isSelected) {
            setSelectedEvents(selectedEvents?.filter(item => item.title !== event.title) || null)
            // setTotalParticipants(totalParticipants - event.participantCount)
        } else {
            // if (totalParticipants > 15 || (totalParticipants + event.participantCount) > 15) {
            //     toast.error("Max 15 Participants Allowed!")
            //     return
            // }
            setSelectedEvents([...(selectedEvents || []), event])
            // setTotalParticipants(totalParticipants + event.participantCount)
        }
    }, [isSelected, selectedEvents, event, setSelectedEvents, setDisplayForm])

    return (
        <Button
            variant={'outline'}
            onClick={handleEventSelection}
            className={cn(
                'flex justify-between items-center gap-4 px-2 py-6 bg-transparent font-bold hover:bg-foreground/40',
                isSelected && "bg-foreground text-background"
            )}
        >
            <div className="flex justify-center items-start flex-col text-start">
                <span>{event.title}</span>
                <span className='text-[0.8em] opacity-80'>{event.category}</span>
            </div>

            <div className='flex_center flex-col'>
                <span className='text-[1.2em] font-bold'>
                    {event.minParticipant == event.maxParticipant ?
                        event.maxParticipant
                        :
                        `${event.minParticipant} - ${event.maxParticipant}`
                    }
                </span>
                <span>Count</span>
            </div>
        </Button>
    )
}

export default React.memo(EventSelector)