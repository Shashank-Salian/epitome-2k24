"use client"
import { useEffect, useRef } from 'react'

const Cursor = () => {
    const cursorRef = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        const handleMouseMove = (evt: MouseEvent) => {
            if (window.innerWidth < 1024) return
            if (!cursorRef.current) return

            const rect = cursorRef.current.getBoundingClientRect();
            const x = (evt.clientX - rect.width / 2) + 8;
            const y = (evt.clientY - rect.height / 2) + 8;

            const keyframes = [
                { transform: `translate3d(${x}px, ${y}px, 0)` },
            ];

            cursorRef.current.animate(keyframes, {
                duration: 0,
                easing: 'ease-in-out',
                fill: 'forwards',
            });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const styles = {
        a: {
            fill: 'url(#g1)',
        },
        b: {
            fill: 'url(#g2)',
        },
        c: {
            fill: 'url(#g3)',
        },
        d: {
            fill: 'url(#g4)',
        },
    };


    return (
        <div className="w-full h-screen absolute inset-0 pointer-events-none z-[99999]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                version="1.2"
                viewBox="0 0 322 503"
                id='Custom_Cursor'
                style={{ backfaceVisibility: "hidden" }}
                className='pointer-events-none will-change-transform'
                ref={cursorRef}
            >
                <defs>
                    <linearGradient id="P" gradientUnits="userSpaceOnUse" />
                    <linearGradient id="g1" x2="1" href="#P" gradientTransform="matrix(54.225,93.92,-93.857,54.188,192.91,225.713)">
                        <stop stopColor="#9effff" />
                        <stop offset="1" stopColor="#0ff" />
                    </linearGradient>
                    <linearGradient id="g2" x2="1" href="#P"
                        gradientTransform="matrix(297.997,516.147,-309.159,178.493,414.864,-239.423)">
                        <stop stopColor="#67dbff" />
                        <stop offset="1" stopColor="#0068de" />
                    </linearGradient>
                    <linearGradient id="g3" x2="1" href="#P"
                        gradientTransform="matrix(64.77,112.184,-110.908,64.033,162.551,103.79)">
                        <stop stopColor="#f8fc86" />
                        <stop offset="1" stopColor="#edce20" />
                    </linearGradient>
                    <linearGradient id="g4" x2="1" href="#P"
                        gradientTransform="matrix(22.879,39.628,-39.631,22.881,269.081,420.341)">
                        <stop stopColor="#f8fc86" />
                        <stop offset="1" stopColor="#edce20" />
                    </linearGradient>
                </defs>

                <path
                    fillRule="evenodd"
                    d="M212.4 294.6c.7 5.2.3 10.4-1 15.5-1.3 5-3.6 9.7-6.8 13.8-3.1 4-7 7.5-11.7 10.2v.1c-4.7 2.6-9.6 4.3-14.7 4.9-5.2.7-10.4.4-15.4-1-5-1.3-9.7-3.6-13.9-6.8-4-3.1-7.5-7-10.2-11.7-2.7-4.7-4.3-9.7-5-14.6-.7-5.2-.3-10.5 1-15.5 1.4-5 3.7-9.8 6.9-13.9 3-4 6.9-7.5 11.6-10.2 4.7-2.7 9.7-4.3 14.7-5 5.1-.7 10.4-.3 15.4 1.1 5.1 1.3 9.8 3.6 13.9 6.8 4 3 7.5 7 10.2 11.7 2.7 4.6 4.4 9.6 5 14.6zm-58.2.1c-1.3 4.9-.7 10.2 2 14.8 2.7 4.7 7 7.8 11.8 9.1 4.8 1.3 10.1.8 14.8-1.9 4.7-2.7 7.8-7 9.1-11.9 1.3-4.8.8-10.1-1.9-14.8-2.7-4.6-7.1-7.8-11.9-9.1-4.8-1.3-10.1-.7-14.8 2-4.7 2.7-7.8 7-9.1 11.8z"
                    className="a"
                    style={styles.a}
                ></path>
                <path
                    fillRule="evenodd"
                    d="M0 .1l244.1 162.7-50.5 87.4q-3.2-1.3-6.6-2.3c-6.8-1.8-13.9-2.2-21-1.3-6.7.9-13.5 3.1-19.8 6.7-6.2 3.6-11.5 8.3-15.7 13.8-4.3 5.7-7.5 12.1-9.3 18.8q-.9 3.4-1.3 6.9h-101zm71.9 272.7h32.5c5.9-15 16.7-28.2 31.8-36.9 15-8.7 31.9-11.5 47.8-9.1l16.2-28.1-139-92.7zm249.8-58.1l-14.8 55.2-61.7-41.1-14.4 25q3.3 4.3 6.1 9.1c10.2 17.6 12.3 37.8 7.4 56-2.6 9.7-7.1 18.8-13.5 26.8l31.8 55.1c16.9.6 33.1 9.7 42.1 25.4 14.1 24.3 5.7 55.4-18.6 69.5-24.4 14-55.5 5.7-69.5-18.6-9.1-15.7-8.8-34.3-1-49.2l-31.8-55.1c-10.1 1.5-20.2.9-29.9-1.7-18.3-4.9-34.6-16.7-44.8-34.4q-2.8-4.8-4.8-9.9h-29l4.8 74.1-55.2-14.8-5.1-79.3h100c.9 6.8 3.1 13.6 6.7 19.8 3.6 6.3 8.4 11.6 13.8 15.7 5.6 4.4 12 7.5 18.8 9.3 6.8 1.8 13.9 2.3 20.9 1.4 4.6-.6 9.1-1.8 13.5-3.6l46.1 79.8c-10.2 9.5-12.9 25.2-5.6 37.8 8.5 14.7 27.3 19.7 42 11.2s19.8-27.3 11.3-42c-7.3-12.6-22.2-18.1-35.6-14l-46-79.8c3.7-2.9 7-6.2 9.8-9.9 4.4-5.7 7.5-12.1 9.3-18.8 1.8-6.7 2.3-13.8 1.4-20.9-.9-6.8-3.1-13.6-6.7-19.8-3.6-6.3-8.4-11.6-13.8-15.7l-.1-.1 50-86.6z"
                    className="b"
                    style={styles.b}
                ></path>
                <path
                    d="M85.6 148.2l6.5 101c8.2-13.2 19.6-24.2 33.2-32.1 13.7-7.9 28.9-12.2 44.4-12.7z"
                    className="c"
                    style={styles.c}
                ></path>
                <path
                    d="M252.3 437.1c8-4.6 18.3-1.9 22.9 6.1 4.6 8 1.9 18.3-6.1 22.9-8 4.6-18.3 1.9-22.9-6.1-4.6-8-1.9-18.3 6.1-22.9z"
                    className="d"
                    style={styles.d}
                ></path>
            </svg>
        </div>
    )
}

export default Cursor