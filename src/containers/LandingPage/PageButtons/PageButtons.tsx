"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import useUserStore from "@/store/useUserStore";
import Link from "next/link";
import style from "./PageButtons.module.css";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
const audioFilePath = "/Music/click.wav";

const PageButtons = ({ className }: { className?: string }) => {
  const { status } = useSession()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const soundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (status === "unauthenticated")
      setIsLoggedIn(false)
    else
      setIsLoggedIn(true)
  }, [status])

  const playSound = () => {
    if (soundRef.current) {
      soundRef.current
        .play()
        .catch((error) => console.error("Error playing sound:", error));
    }
  };

  useEffect(() => {
    soundRef.current = new Audio(audioFilePath);
    soundRef.current.preload = "auto";
    soundRef.current.load();
    const elements = document.querySelectorAll(
      `.${style.broch}, .${style.arrow}, .${style.button}`
    );

    const handleEvent = () => {
      playSound();
    };

    elements.forEach((element) => {
      element.addEventListener("mouseenter", handleEvent); // For hover
      element.addEventListener("click", handleEvent); // For click
    });
    return () => {
      elements.forEach((element) => {
        element.removeEventListener("mouseenter", handleEvent);
        element.removeEventListener("click", handleEvent);
      });
    };
  }, []);

  return (
    <div className="flex flex-col gap-x-3 items-center">
      <Link href={isLoggedIn ? "/dashboard" : "/register"}>
        <Button
          className={cn("w-[300px] !bg-background/80", className)}
          data-augmented-ui="bl-clip tr-clip border"
        >
          {isLoggedIn ? "Dashboard" : "Sign Up"}
        </Button>
      </Link>

      <Link href="/challenges">
        <Button
          className={cn("w-[300px] !bg-background/80", className)}
          data-augmented-ui="bl-clip tr-clip border"
        >
          Challenges
        </Button>
      </Link>

      <Link href={isLoggedIn ? "/events" : "/login"}>
        <Button
          className={cn("w-[300px] !bg-background/80", className)}
          data-augmented-ui="bl-clip tr-clip border"
        >
          {isLoggedIn ? "Register" : "Log In"}
        </Button>
      </Link>

      {/* <Button className={className} data-augmented-ui="bl-clip tr-clip border">
        <span>About</span>
      </Button> */}
    </div>
  );
};

export default PageButtons;
