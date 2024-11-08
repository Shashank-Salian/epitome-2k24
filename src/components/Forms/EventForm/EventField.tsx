import React, { useState, useEffect } from 'react';
import Input from '@/components/CustomUI/Input';
import useEventRegister from '@/store/useEventRegister';
import { z } from 'zod';
import toast from 'react-hot-toast';

const participantSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name should not exceed 50 characters"),
    phone: z.string().min(10, "Phone number must be atleast 10 digits").max(10, "Phone number must be 10 digits")
});

type Props = {
    eventName: string;
    participants: number;
    index: number;
};

const EventGroup = ({ eventName, participants, index }: Props) => {
    const [participantName, setParticipantName] = useState<string>('');
    const [participantPhone, setParticipantPhone] = useState<string>('');
    const { participantsDetails, setParticipantsDetails } = useEventRegister();

    useEffect(() => {
        if (!participantName || !participantPhone) return

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
            if (participantsDetails && eventIndex && participantsDetails[eventIndex!] && participantsDetails[eventIndex].participants[index]) {
                participantsDetails[eventIndex].participants[index].name = participantName;
                participantsDetails[eventIndex].participants[index].phone = participantPhone;
            }
        }, 1000)

        return () => clearTimeout(debounce)
    }, [participantName, participantPhone])

    return (
        <div className="flex_center flex-col gap-2">
            <Input
                type='text'
                label={`Participant ${index + 1}`}
                name='username'
                placeholder='Enter Name'
                setValue={setParticipantName}
                required={true}
            />

            <Input
                type='tel'
                name='phone'
                placeholder='Enter Phone'
                setValue={setParticipantPhone}
                required={true}
            />
        </div>
    );
};

export default EventGroup;


// useEffect(() => {
//     const delay = setTimeout(() => {
//         if (!participantName || !participantPhone) return;

//         const eventIndex = participantsDetails?.findIndex(event => event.eventTitle === eventName);
//         setCurrEventIndex(eventIndex);
//         let updatedParticipantsDetails: ParticipantsDetailsType[] = [];

//         if (eventIndex && eventIndex !== -1 && participantsDetails) {
//             // Event exists, update the specific participant by index
//             const updatedEvent = { ...participantsDetails[eventIndex] };
//             updatedEvent.participants[index] = {
//                 name: participantName,
//                 phone: participantPhone,
//             };

//             updatedParticipantsDetails = [...participantsDetails];
//             updatedParticipantsDetails[eventIndex] = updatedEvent;
//         } else {
//             // Add a new event with participants
//             const newEvent: ParticipantsDetailsType = {
//                 eventTitle: eventName,
//                 participants: [
//                     { name: participantName, phone: participantPhone },
//                 ],
//             };

//             updatedParticipantsDetails = participantsDetails
//                 ? [...participantsDetails, newEvent]
//                 : [newEvent];
//         }

//         // Set the updated participants details
//         console.log("updatedParticipantsDetails :", updatedParticipantsDetails)
//         setParticipantsDetails?.(updatedParticipantsDetails);
//     }, 1000); // 1-second throttle delay

//     return () => clearTimeout(delay);
// }, [participantName, participantPhone, index, eventName, participantsDetails, setParticipantsDetails]);