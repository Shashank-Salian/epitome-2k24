'use client'
import { useState, SetStateAction, Dispatch, Ref } from "react"
import { AtSignIcon, BookOpen, Building2Icon, EyeIcon, EyeOffIcon, PhoneIcon, User2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputProps {
    label?: string,
    type?: "text" | "email" | "password" | "tel" | "number",
    name?: "username" | "collegeName" | any,
    placeholder?: string,
    parentClassName?: string,
    className?: string,
    inputClassName?: string,
    required?: boolean,
    value?: string | number,
    setValue?: Dispatch<SetStateAction<any>>,
    ref?: Ref<HTMLInputElement>,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const Input = ({ label, type = "text", name = "", placeholder, parentClassName = "", className = "", inputClassName = "", required = false, value, setValue, ref, onChange }: InputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <div className={cn("relative min-w-[350px]", parentClassName)}>
            {label && <label className='text-[0.9em] bg-background/0 px-1'>
                {label}
                {required && <span className="text-[1.2em] text-red-600"> ★</span>}
            </label>}

            <div className={cn("flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1", className)}>
                <input
                    type={showPassword ? "text" : type}
                    placeholder={placeholder}
                    required={required}
                    defaultValue={value || ""}
                    onChange={onChange ? onChange : (e) => setValue && setValue(e.target.value)}
                    pattern={type === "tel" ? "[6789][0-9]{9}" : undefined}
                    ref={ref}
                    className={cn('text-[1em] w-full bg-background/0 px-2 py-1 border-none outline-none placeholder:text-secondary/80', inputClassName)} />

                {type === "password" ?
                    <div className="p-1 w-fit absolute right-2 text-secondary cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ?
                            <EyeIcon />
                            :
                            <EyeOffIcon />
                        }
                    </div>
                    :
                    type === "email" ?
                        <AtSignIcon size={24} className="absolute right-2 text-secondary" />
                        :
                        type === "tel" ?
                            <PhoneIcon size={24} className="absolute right-2 text-secondary" />
                            :
                            name === "username" ?
                                <User2Icon size={24} className="absolute right-2 text-secondary" />
                                :
                                name === "collegeName" ?
                                    <Building2Icon size={24} className="absolute right-2 text-secondary" />
                                    : name === "department" &&
                                    <BookOpen size={24} className="absolute right-2 text-secondary" />
                }
            </div>
        </div>
    )
}

export default Input