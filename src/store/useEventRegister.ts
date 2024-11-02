import { create } from "zustand"
import { EventRegType } from "@/utils/EventList"

export interface EventRegProp {
    selectedEvents: EventRegType[] | null,
    setSelectedEvents: (selectedEvent: EventRegType[] | null) => void,
    clearSelection: () => void,
}

const useEventRegister = create<EventRegProp>((set) => ({
    selectedEvents: null,
    setSelectedEvents: (event: EventRegType[] | null) => set({ selectedEvents: event }),
    clearSelection: () => set({ selectedEvents: null })
}))

export default useEventRegister