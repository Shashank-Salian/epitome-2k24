import { create } from "zustand"


export interface LoaderProps {
    loadingProgress: number,
    loadingCompleted: boolean,
    isInitialLoad: boolean,
    updateLoadingProgress: (progress: number) => void,
    setLoadingCompleted: (state: boolean) => void,
    setIsInitialLoad: (state: boolean) => void,
}

const useLoader = create<LoaderProps>((set) => ({
    loadingProgress: 0,
    loadingCompleted: false,
    isInitialLoad: false,
    updateLoadingProgress: (progress: number) => set({ loadingProgress: progress }),
    setLoadingCompleted: (state: boolean) => set({ loadingCompleted: state }),
    setIsInitialLoad: (state: boolean) => set({ isInitialLoad: state }),
}))

export default useLoader