"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import ButtonUI from './ButtonUI'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const LandingHeader = () => {
    return (
        <header className='sticky top-0 w-full flex justify-between items-center px-4 py-3 bg-background/50 z-10'>
            <a href="#">
                <h1 className='text-[1.5em] font-beyonders'>LOGO</h1>
            </a>

            <nav className='flex_center gap-6'>
                <Link href="/" className='text-[1.25em]'>Home</Link>
                <Link href="/" className='text-[1.25em]'>About</Link>
                <Link href="/" className='text-[1.25em]'>Events</Link>
                <Link href="/" className='text-[1.25em]'>Commitee</Link>

                <Link href="/login" className='ml-4'>
                    <ButtonUI value='LOGIN' />
                </Link>
            </nav>
        </header>
    )
}

export const Header = () => {
    // const { data: session, status } = useSession()
    // const router = useRouter()

    // useEffect(() => {
    //     if (status === "unauthenticated")
    //         router.push("/")
    // }, [status, router])

    return (
        <header className='sticky top-0 w-full flex justify-between items-center px-4 py-3 bg-background/50 z-10'>
            <a href="#">
                <h1 className='text-[1.5em] font-beyonders'>LOGO</h1>
            </a>

            <nav className='flex_center gap-6'>
                <Link href="/" className='text-[1.25em]'>Home</Link>
                <Link href="/" className='text-[1.25em]'>About</Link>
                <Link href="/" className='text-[1.25em]'>Events</Link>
                <Link href="/" className='text-[1.25em]'>Commitee</Link>

                <Link href="/login" className='ml-4'>
                    <ButtonUI value='LOGIN' />
                </Link>
            </nav>
        </header>
    )
}
