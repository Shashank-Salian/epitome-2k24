import React from 'react'

type Props = {
    text: string,
    fontSize?: string,
    duration?: number
}

const TextWave = ({ text, fontSize = "1rem", duration = 1000 }: Props) => {
    console.log(duration)
    return (
        <div style={{ fontSize }}
            className='w-full flex justify-center items-center'>
            {text.split("").map((letter, index) => (
                <span key={index}>{letter}</span>
            ))
            }
        </div>
    )
}

export default TextWave