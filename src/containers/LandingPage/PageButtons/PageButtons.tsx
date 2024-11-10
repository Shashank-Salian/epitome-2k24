"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import style from "./PageButtons.module.css";
import Link from "next/link";
const audioFilePath = "/Music/click.wav";

const PageButtons = () => {
  const soundRef = useRef<HTMLAudioElement | null>(null);
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
      <Button
        className={style.button}
        data-augmented-ui="bl-clip tr-clip border"
      >
        <span>Registration</span>
      </Button>

      <Link href={"/challenges"}>
        <Button
          className={style.button}
          data-augmented-ui="bl-clip tr-clip border"
        >
          Events
        </Button>
      </Link>

      <Link href={"/login"}>
        <Button
          className={style.button}
          data-augmented-ui="bl-clip tr-clip border"
        >
          Log In
        </Button>
      </Link>

      <Button
        className={style.button}
        data-augmented-ui="bl-clip tr-clip border"
      >
        <span>About</span>
      </Button>
    </>
  );
};

export default PageButtons;
