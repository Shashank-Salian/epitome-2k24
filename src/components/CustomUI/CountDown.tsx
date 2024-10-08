import React from 'react'

const CountDown = () => {
    return (
        <div className='flex_center gap-6 font-poppins'>
            <div className="flex_center flex-col">
                <div className="flex gap-2 text-2xl">
                    <span className='bg-blue-400 text-white font-bold px-1 rounded-[0.125em]'>2</span>
                    <span className='bg-blue-400 text-white font-bold px-1 rounded-[0.125em]'>0</span>
                </div>
                <span className='text-sm'>DAYS</span>
            </div>

            <div className="flex_center flex-col">
                <div className="flex gap-2 text-2xl">
                    <span className='bg-blue-400 text-white font-bold px-1 rounded-[0.125em]'>2</span>
                    <span className='bg-blue-400 text-white font-bold px-1 rounded-[0.125em]'>0</span>
                </div>
                <span className='text-sm'>Hours</span>
            </div>

            <div className="flex_center flex-col">
                <div className="flex gap-2 text-2xl">
                    <span className='bg-blue-400 text-white font-bold px-1 rounded-[0.125em]'>2</span>
                    <span className='bg-blue-400 text-white font-bold px-1 rounded-[0.125em]'>0</span>
                </div>
                <span className='text-sm'>Minutes</span>
            </div>
        </div>
    )
}

export default CountDown