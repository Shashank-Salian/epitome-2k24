"use client"

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';

type Props = {
    variant: "normal" | "gradient" | "hacker",
    text: string,
    className?: string,
    background?: string,
};

const TextUI = (props: Props) => {
    const { text, variant = "normal", className } = props;
    const hackerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (variant === "hacker" && hackerRef.current) {
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            const handleMouseOver = (evt: MouseEvent) => {
                let iterations = 0;
                const target = evt.target as HTMLElement;

                if (target) {
                    const interval = setInterval(() => {
                        target.innerText = target.innerText
                            .split("")
                            .map((_, index) => {
                                if (index < iterations) {
                                    return target.dataset.value && target.dataset.value[index];
                                }
                                return letters[Math.floor(Math.random() * 26)];
                            })
                            .join("");

                        if (iterations >= target.dataset.value?.length! ?? 0) {
                            clearInterval(interval);
                        }

                        iterations += 1 / 2;
                    }, 40);
                }
            };

            const hackerElement = hackerRef.current;
            hackerElement.addEventListener("mouseover", handleMouseOver);

            // Cleanup event listener on component unmount
            return () => {
                hackerElement.removeEventListener("mouseover", handleMouseOver);
            };
        }
    }, [variant]);

    if (variant === "normal") {
        return (
            <div className={cn('flex_center', props.background, className)}>
                {text.split("").map((letter, index) => (
                    <span key={index}>{letter}</span>
                ))}
            </div>
        );
    }

    if (variant === "gradient") {
        return (
            <div className={cn('w-fit mx-auto gradientText', props.background, className)}>
                {text}
            </div>
        );
    }

    if (variant === "hacker") {
        return (
            <div ref={hackerRef} data-value={text} className={cn('Hacker_Text flex_center gradientText bg-foreground', props.background, className)}>
                {text}
            </div>
        );
    }

    return null;
};

export default TextUI;
