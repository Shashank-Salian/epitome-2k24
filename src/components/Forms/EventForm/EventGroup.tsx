"use client"
import React from 'react';
import EventField from './EventField';
import useEventRegister from '@/store/useEventRegister';

type Props = {
    eventName: string;
    participants: number;
};

const EventGroup = ({ eventName, participants }: Props) => {
    return (
        <div
            data-augmented-ui="tl-clip tr-2-clip-x br-clip bl-2-clip-x"
            className='relative flex flex-col gap-4 bg-blueGradientAlt p-6'>
            <span>{eventName}</span>

            {Array.from({ length: participants }).map((_, index) => (
                <EventField key={index} index={index} eventName={eventName} />
            ))}
        </div>
    );
};

export default EventGroup;