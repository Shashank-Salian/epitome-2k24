import React, { useState, useEffect } from 'react';

const CountDown = () => {
    const targetDate = new Date('November 21, 2024 00:00:00').getTime();


    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            if (distance < 0) {
                clearInterval(interval);
            } else 
            {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

                setTimeLeft({ days, hours, minutes });
            }
        }, 1000);

        return () => clearInterval(interval); 
    }, [targetDate]);
    const daysFirstDigit = String(timeLeft.days).padStart(2, '0')[0];
    const daysSecondDigit = String(timeLeft.days).padStart(2, '0')[1];

    const hoursFirstDigit = String(timeLeft.hours).padStart(2, '0')[0];
    const hoursSecondDigit = String(timeLeft.hours).padStart(2, '0')[1];

    const minutesFirstDigit = String(timeLeft.minutes).padStart(2, '0')[0];
    const minutesSecondDigit = String(timeLeft.minutes).padStart(2, '0')[1];

    return (
        <div className='flex_center gap-6 font-poppins '>
            {/* Days */}
            <div className="flex_center flex-col">
                <div className="flex gap-2 text-2xl">
                    <span className='bg-blue-400 text-white font-bold px-1 rounded-[0.125em]'>{daysFirstDigit}</span>
                    <span className='bg-blue-400 text-white font-bold px-1 rounded-[0.125em]'>{daysSecondDigit}</span>
                </div>
                <span className='text-sm'>DAYS</span>
            </div>

            {/* Hours */}
            <div className="flex_center flex-col">
                <div className="flex gap-2 text-2xl">
                    <span className='bg-blue-400 text-white font-bold px-1 rounded-[0.125em]'>{hoursFirstDigit}</span>
                    <span className='bg-blue-400 text-white font-bold px-1 rounded-[0.125em]'>{hoursSecondDigit}</span>
                </div>
                <span className='text-sm'>HOURS</span>
            </div>

            {/* Minutes */}
            <div className="flex_center flex-col">
                <div className="flex gap-2 text-2xl">
                    <span className='bg-blue-400 text-white font-bold px-1 rounded-[0.125em]'>{minutesFirstDigit}</span>
                    <span className='bg-blue-400 text-white font-bold px-1 rounded-[0.125em]'>{minutesSecondDigit}</span>
                </div>
                <span className='text-sm'>MINUTES</span>
            </div>
        </div>
    );
}

export default CountDown;
