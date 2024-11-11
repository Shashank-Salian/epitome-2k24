"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react"; import useUserStore from "@/store/useUserStore";
import Link from "next/link";
import style from "./PageButtons.module.css";
import { cn } from "@/lib/utils";
const audioFilePath = "/Music/click.wav";

const PageButtons = ({ className }: { className?: string }) => {
  const { user } = useUserStore();
  const soundRef = useRef<HTMLAudioElement | null>(null);
  const authBtn = (isLogin = true) => {
    return (
      <Link href={isLogin ? "/login" : "/events"}>
        <Button
          className={cn("w-[300px] !bg-background/80", className)}
          data-augmented-ui="bl-clip tr-clip border"
        >
          {isLogin ? "Log In" : "Register"}
        </Button>
      </Link>
    );
  };

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
    <>
      <Link href={"/register"}>
        <Button
          className={cn("w-[300px] !bg-background/80", className)}
          data-augmented-ui="bl-clip tr-clip border"
        >
          <span>Sign Up</span>
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

      {authBtn(!user)}

      <Button className={cn("w-[300px] !bg-background/80", className)} data-augmented-ui="bl-clip tr-clip border">
        <span>About</span>
      </Button>
    </>
  );
};

export default PageButtons;
