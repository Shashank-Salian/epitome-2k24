import { cn } from '@/lib/utils';
import React from 'react'

type BaseProps = {
    text: string,
    className?: string
};

type GradientVariantProps = BaseProps & {
    variant: "gradient",
    gradient: string,
};

type NormalVariantProps = BaseProps & {
    variant?: "normal"
};

type Props = GradientVariantProps | NormalVariantProps;

const TextUI = (props: Props) => {
    const { text, variant = "normal", className } = props

    if (variant === "normal")
        return (
            <div className={cn('flex_center', className)}>
                {text.split("").map((letter, index) => (
                    <span key={index}>{letter}</span>
                ))
                }
            </div>
        )

    if (variant === "gradient" && "gradient" in props)
        return (
            <div className={cn('w-fit mx-auto gradientText', props.gradient, className)}>
                {text}
            </div>
        )
}

export default TextUI