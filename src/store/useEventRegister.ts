import { create } from "zustand"
import { EventRegType } from "@/utils/EventList"

export type ParticipantsListType = {
    name: string,
    phone: string,
    events: {
        eventName: string,
        eventType: string
    }[]
}

export interface EventRegProp {
    selectedEvents: EventRegType[] | [],
    setSelectedEvents: (selectedEvent: EventRegType[] | []) => void,
    participantsDetails: EventRegType[] | [],
    setParticipantsDetails: (selectedEvent: EventRegType[] | []) => void,
    displayForm: boolean,
    setDisplayForm: (toggle: boolean) => void
    totalParticipants: number,
    setTotalParticipants: (value: number) => void
    participantsList: ParticipantsListType[] | [],
    setParticipantsList: (participant: ParticipantsListType[] | []) => void
}

const useEventRegister = create<EventRegProp>((set) => ({
    selectedEvents: [],
    setSelectedEvents: (event: EventRegType[] | []) => set({ selectedEvents: event }),
    participantsDetails: [],
    setParticipantsDetails: (details: EventRegType[] | []) => set({ participantsDetails: details }),
    displayForm: false,
    setDisplayForm: (toggle: boolean) => set({ displayForm: toggle }),
    totalParticipants: 0,
    setTotalParticipants: (value: number) => set({ totalParticipants: value }),
    participantsList: [],
    setParticipantsList: (participant: ParticipantsListType[]) => set({ participantsList: participant }),
}));

export default useEventRegister