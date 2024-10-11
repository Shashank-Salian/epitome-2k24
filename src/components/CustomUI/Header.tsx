import Link from 'next/link'
import React from 'react'
import ButtonUI from './ButtonUI'

const Header = () => {
    return (
        <header className='w-full flex justify-between items-center p-4 bg-background/50'>
            <a href="#">
                <h1 className='text-[1.5em] font-beyonders'>LOGO</h1>
            </a>

            <nav className='flex_center gap-6'>
                <Link href="/" className='text-[1.25em]'>Home</Link>
                <Link href="/about" className='text-[1.25em]'>About</Link>
                <Link href="/events" className='text-[1.25em]'>Events</Link>
                <Link href="/commitee" className='text-[1.25em]'>Commitee</Link>

                <Link href="/login" className='ml-4'>
                    <ButtonUI value='LOGIN' />
                </Link>
            </nav>
        </header>
    )
}

export default Header