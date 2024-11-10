"use client"
import React, { useState, useEffect } from 'react';
import Input from '@/components/CustomUI/Input';
import useEventRegister from '@/store/useEventRegister';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { EventRegType } from '@/utils/EventList';

const participantSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name should not exceed 50 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits").max(10, "Phone number must be 10 digits")
});

type Props = {
    eventName: string;
    index: number;
};

const EventGroup = ({ eventName, index }: Props) => {
    const [participantName, setParticipantName] = useState<string>('');
    const [participantPhone, setParticipantPhone] = useState<string>('');
    const { participantsDetails, setParticipantsDetails } = useEventRegister();

    useEffect(() => {
        if (!participantName || !participantPhone) return;

        let updatedParticipantsDetails: EventRegType[] | undefined;
        const debounce = setTimeout(() => {
            const validationResult = participantSchema.safeParse({
                name: participantName,
                phone: participantPhone,
            });

            if (!validationResult.success) {
                toast.error(validationResult.error.errors[0].message);
                return;
            }

            const eventIndex = participantsDetails?.findIndex(event => event.title === eventName);
            if (eventIndex !== -1 && participantsDetails) {
                updatedParticipantsDetails = [...participantsDetails];
                updatedParticipantsDetails[eventIndex].participants[index] = {
                    name: participantName,
                    phone: participantPhone,
                };
                console.log({ updatedParticipantsDetails })
            }
        }, 1000);

        if (updatedParticipantsDetails) {
            setParticipantsDetails(updatedParticipantsDetails);
        }

        return () => clearTimeout(debounce);
    }, [participantName, participantPhone, eventName, index, participantsDetails, setParticipantsDetails]);

    return (
        <div className="flex_center flex-col gap-2">
            <Input
                type='text'
                label={`Participant ${index + 1}`}
                name='username'
                placeholder='Enter Name'
                setValue={setParticipantName}
                className='border-foreground'
                required={true}
            />

            <Input
                type='tel'
                name='phone'
                placeholder='Enter Phone'
                setValue={setParticipantPhone}
                className='border-foreground'
                required={true}
            />
        </div>
    );
};

export default EventGroup;
