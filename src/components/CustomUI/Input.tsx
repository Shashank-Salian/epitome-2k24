'use client'
import { useState, SetStateAction, Dispatch, Ref } from "react"
import { AtSignIcon, Building2Icon, EyeIcon, EyeOffIcon, PhoneIcon, User2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputProps {
    label: string,
    type?: "text" | "email" | "password" | "tel",
    name?: "username" | "collegeName" | any,
    placeholder?: string,
    className?: string,
    required?: boolean,
    setValue?: Dispatch<SetStateAction<any>>
}

const Input = ({ label, type = "text", name = "", placeholder, className = "", required = false, setValue }: InputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <div className={cn("relative min-w-[350px]", className)}>
            <label className='text-[0.9em] bg-background/0 px-1'>
                {label}
                {required && <span className="text-red-600">*</span>}
            </label>

            <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1">
                <input
                    type={showPassword ? "text" : type}
                    placeholder={placeholder}
                    required={required}
                    onChange={(e) => setValue && setValue(e.target.value)}
                    pattern={type === "tel" ? "[6789][0-9]{9}" : undefined}
                    className='text-[1em] w-full bg-background/0 px-2 py-1 border-none outline-none placeholder:text-secondary-foreground/70' />

                {type === "password" ?
                    <div className="p-1 w-fit absolute right-2 text-slate-400 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ?
                            <EyeIcon />
                            :
                            <EyeOffIcon />
                        }
                    </div>
                    :
                    type === "email" ?
                        <AtSignIcon size={24} className="absolute right-2 text-slate-400" />
                        :
                        type === "tel" ?
                            <PhoneIcon size={24} className="absolute right-2 text-slate-400" />
                            :
                            name === "username" ?
                                <User2Icon size={24} className="absolute right-2 text-slate-400" />
                                :
                                name === "collegeName" &&
                                <Building2Icon size={24} className="absolute right-2 text-slate-400" />
                }
            </div>
        </div>
    )
}

export default Input