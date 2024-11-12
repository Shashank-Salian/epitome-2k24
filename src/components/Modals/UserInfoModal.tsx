"use client"
import React, { FormEvent, useState } from 'react'
import Input from '../CustomUI/Input'
import useUserStore from '@/store/useUserStore'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'
import { DatabaseBackupIcon, LoaderCircleIcon } from 'lucide-react'
import useModalStore from '@/store/useModalStore'

const UserInfoModal = () => {
    const [collegeName, setCollegeName] = useState<string>("")
    const [department, setDepartment] = useState<string>("");
    const [phone, setPhone] = useState<string>("")
    const [accomodationRequired, setAccomodationRequired] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { user, setUser } = useUserStore()
    const { closeModal } = useModalStore()

    const HandleUserUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!collegeName || !phone) {
            toast.error("Missing Fields!")
            return
        }

        try {
            setIsLoading(true)
            const res = await fetch("/api/post/update-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: user?.email, collegeName, department, phone, accomodationRequired })
            })

            if (res.status === 201) {
                const data = await res.json()
                toast.success("Profile Updated Successfully!")
                console.log("Update_User_Info:", data)
                setUser(data.user)
                closeModal()
            }
        } catch (err) {
            toast.error("Failed to Update User Details")
        }
    }

    return (
        <div className='flex_center absolute inset-0 w-screen h-screen bg-background/80 overflow-hidden z-[999]'>
            <form
                onSubmit={HandleUserUpdate}
                data-augmented-ui="tl-2-clip-x tr-clip br-2-clip-x bl-clip"
                className="flex justify-between items-center flex-col gap-4 bg-blueGradientAlt min-w-[400px] aspect-square p-4">
                <h1 className='font-oxanium font-bold text-[1.2em] text-center '>User Details</h1>

                <div className="flex_center flex-col gap-4">
                    <Input
                        name='collegeName'
                        label='College Name'
                        placeholder='Enter College Name'
                        value={user?.collegeName || ""}
                        setValue={setCollegeName}
                        required={true}
                    />

                    <Input
                        type="text"
                        label="Department"
                        name="department"
                        placeholder="Enter Department"
                        className="2xl:w-[500px]"
                        setValue={setDepartment}
                        required={true}
                    />

                    <Input
                        label='Phone'
                        type='tel'
                        placeholder='Enter Phone'
                        value={user?.phone || ""}
                        setValue={setPhone}
                        required={true}
                    />

                    <div className="relative w-[350px] py-2">
                        <label className='text-[0.9em] bg-background/0 px-1'>Accomodation</label>

                        <div className="flex gap-2">
                            <input type="checkbox" name="accommodation" className="mr-2" onChange={(e) => setAccomodationRequired(e.target.checked)} />
                            <p className="text-sm text-wrap">
                                Please check this box if your team requires accommodation. We will reach out to you with further details regarding the arrangements.
                            </p>
                        </div>
                    </div>
                </div>

                <Button variant={'secondary'} type='submit' className='clip_Btn flex_center gap-4 px-8 py-2'>
                    {isLoading ?
                        <>
                            <LoaderCircleIcon className='animate-spin' />
                            Updating...
                        </>
                        :
                        <>
                            <DatabaseBackupIcon />
                            Update Profile
                        </>
                    }
                </Button>
            </form>
        </div>
    )
}

export default UserInfoModal