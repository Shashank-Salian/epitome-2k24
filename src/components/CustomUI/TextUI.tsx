"use client"

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

type HackerVariantProps = BaseProps & {
    variant?: "hacker"
};

type Props = GradientVariantProps | NormalVariantProps | HackerVariantProps

const TextUI = (props: Props) => {
    const { text, variant = "normal", className } = props

    // Text Shuffle
    if (variant === "hacker" && typeof window !== "undefined") {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

        document.querySelectorAll(".Hacker_Text").forEach((item) => {
            item.addEventListener("mouseover", (evt) => {
                let iterations = 0

                const interval = setInterval(() => {
                    const target = evt.target as HTMLElement; // Explicitly cast evt.target to HTMLElement
                    if (target) {
                        target.innerText = target.innerText
                            .split("")
                            .map((_, index) => {
                                if (index < iterations) {
                                    return target.dataset.value && target.dataset.value[index];
                                }

                                return letters[Math.floor(Math.random() * 26)];
                            })
                            .join("");

                        if (iterations >= target.innerText.length) {
                            clearInterval(interval);
                        }
                    }

                    iterations += 1 / 2;
                }, 40);
            });
        });
    }

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

    if (variant === "hacker")
        return (
            <div data-value={text} className={cn('Hacker_Text flex_center', className)}>
                {text}
            </div>
        )
}

export default TextUI