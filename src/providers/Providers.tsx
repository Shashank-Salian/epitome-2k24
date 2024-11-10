"use client"
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import useLoader from "@/store/useLoader"
import { EdgeStoreProvider } from '../lib/edgestore';

type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const { setIsInitialLoad } = useLoader()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMounted(true)
            setIsInitialLoad(true)
        }
    }, [setIsInitialLoad])

    if (isMounted)
        return (
            <>
                <SessionProvider refetchOnWindowFocus={true}>
                    <EdgeStoreProvider>
                        {children}
                    </EdgeStoreProvider>
                </SessionProvider>

                <Toaster position="bottom-right" />
            </>
        )
}

export default Provider