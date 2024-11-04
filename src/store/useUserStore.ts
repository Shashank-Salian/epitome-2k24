import { create } from "zustand"

export interface UserEventTypes {
    eventName: string,
    participants: {
        name: string,
        phone: number
    }[]
}

export interface UserTypes {
    uid: string,
    username: string,
    collegeName: string,
    email: string,
    phone: number | null,
    picture: string | null,
    events: UserEventTypes[],
    accessToken: string,
    isVerified: Date | '',
    createdAt: Date | ''
}

export interface UserStoreProps {
    user: UserTypes | null,
    setUser: (user: UserTypes) => void,
    clearUser: () => void,
}

const useUserStore = create<UserStoreProps>((set) => ({
    user: null,
    setUser: (userSession: UserTypes) => set({ user: userSession }),
    clearUser: () => set({ user: null })
}))

export default useUserStore