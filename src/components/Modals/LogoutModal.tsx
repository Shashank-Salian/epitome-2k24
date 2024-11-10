"use client"
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOutIcon, X } from 'lucide-react'
import useModalStore from "@/store/useModalStore"
import useUserStore from "@/store/useUserStore"

const LogoutModal = () => {
    const { closeModal } = useModalStore()
    const { clearUser } = useUserStore()
    const router = useRouter()

    const HandleLogout = async () => {
        try {
            signOut({
                callbackUrl: "/",
                redirect: false
            })
            clearUser()
            closeModal()

            router.push("/")
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    return (
        <div className='flex_center absolute inset-0 w-screen h-screen bg-background/80 overflow-hidden z-[999]'>
            <div
                data-augmented-ui="tl-2-clip-x tr-clip br-2-clip-x bl-clip"
                className="flex justify-around items-center flex-col gap-4 bg-blueGradientAlt min-w-[400px] p-4 py-10">
                <h1 className='font-oxanium font-bold text-[1.2em] text-center '>Confirm Logout?</h1>

                <div className="flex justify-between items-end gap-8 w-[20em] h-[5em]">
                    <Button variant="secondary" onClick={() => closeModal()} className='flex_center gap-2 w-full'>
                        <X size={20} />
                        <span>Cancel</span>
                    </Button>

                    <Button variant="destructive" onClick={HandleLogout} className='flex_center gap-2 w-full text-white'>
                        <LogOutIcon size={20} />
                        <span>Logout</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LogoutModal