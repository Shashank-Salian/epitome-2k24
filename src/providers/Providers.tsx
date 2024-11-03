"use client"
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import useLoader from "@/store/useLoader"

type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const { setIsInitialLoad } = useLoader()

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    }))

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMounted(true)
            setIsInitialLoad(true)
        }
    }, [setIsInitialLoad])

    if (isMounted)
        return (
            <QueryClientProvider client={queryClient}>
                <SessionProvider refetchOnWindowFocus={true}>
                    {children}
                </SessionProvider>

                <Toaster position="bottom-right" />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        )
}

export default Provider