import React, { useCallback, useMemo, useState } from 'react'
import { eventRegisterList, EventRegType } from '@/utils/EventList'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import useEventRegister from '@/store/useEventRegister'

type EventButtonProp = {
    event: EventRegType
}

const EventSelector = () => {
    const { selectedEvents } = useEventRegister()

    console.log("Events", selectedEvents)

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex justify-between items-center">
                <span className='font-bold text-[1.2em]'>Select Events to Participate</span>
                {/* <Button variant={'secondary'} className='flex_center gap-2 font-bold text-[1.1em]'>
                    <X />
                    Clear
                </Button> */}
            </div>

            <div className='grid grid-cols-6 gap-4'>
                {eventRegisterList.map((event, index) => (
                    <EventButton key={index} event={event} />
                ))}
            </div>
        </div>
    )
}

const EventButton = ({ event }: EventButtonProp) => {
    const { selectedEvents, setSelectedEvents } = useEventRegister()

    const isSelected = useMemo(() =>
        selectedEvents?.some(item => event.title === item.title),
        [selectedEvents, event.title]
    )

    const handleEventSelection = useCallback(() => {
        if (isSelected) {
            setSelectedEvents(selectedEvents?.filter(item => item.title !== event.title) || null)
        } else {
            setSelectedEvents([...(selectedEvents || []), event])
        }
    }, [isSelected, selectedEvents, event, setSelectedEvents])

    return (
        <Button
            variant={'outline'}
            onClick={handleEventSelection}
            className={cn(
                'flex justify-center items-start flex-col text-start px-2 py-6 bg-transparent font-bold hover:bg-foreground/40',
                isSelected && "bg-foreground text-background"
            )}
        >
            <span>{event.title}</span>
            <span className='text-[0.8em] opacity-80'>{event.category}</span>
        </Button>
    )
}

export default React.memo(EventSelector)