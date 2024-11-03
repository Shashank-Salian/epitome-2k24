import { create } from "zustand"


export interface LoaderProps {
    loadingProgress: number,
    loadingCompleted: boolean,
    updateLoadingProgress: (progress: number) => void,
    setLoadingCompleted: (state: boolean) => void,
}

const useLoader = create<LoaderProps>((set) => ({
    loadingProgress: 0,
    loadingCompleted: false,
    updateLoadingProgress: (progress: number) => set({ loadingProgress: progress }),
    setLoadingCompleted: (state: boolean) => set({ loadingCompleted: state }),
}))

export default useLoader