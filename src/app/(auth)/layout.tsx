import Header from '@/components/CustomUI/Header';
import React from 'react'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className='w-full h-screen flex_center flex-col px-8'>
            <Header />
            {children}
        </main>
    )
}