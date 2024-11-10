import { create } from "zustand"

export interface ModalProps {
    showModal: "USER_INFO_MODAL" | "LOGOUT_MODAL" | null,
    setShowModal: (id: "USER_INFO_MODAL" | "LOGOUT_MODAL" | null) => void,
    closeModal: () => void,
}

const useModalStore = create<ModalProps>((set) => ({
    showModal: null,
    setShowModal: (id: "USER_INFO_MODAL" | "LOGOUT_MODAL" | null) => set({ showModal: id }),
    closeModal: () => set({ showModal: null }),
}))

export default useModalStore