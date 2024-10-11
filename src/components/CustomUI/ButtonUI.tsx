import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    value: string,
    type?: "button" | "submit" | "reset",
    disabled?: boolean,
    className?: string,

}

const ButtonUI = ({ value, type = "button", disabled = false, className }: Props) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={cn("bg-primary font-beyonders text-white px-10 py-[0.8em] clip_Btn rounded-md", className)}
        >
            {value}
        </button>
    )
}

export default ButtonUI