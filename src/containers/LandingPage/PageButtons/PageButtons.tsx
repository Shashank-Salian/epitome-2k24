"use client";

import { Button } from "@/components/ui/button";

import style from "./PageButtons.module.css";
import Link from "next/link";

const PageButtons = () => {
  return (
    <>
      <Button
        className={style.button}
        data-augmented-ui="bl-clip tr-clip border"
      >
        <span>Registration</span>
      </Button>

      <Link href="/challenges">
        <Button
          className={style.button}
          data-augmented-ui="bl-clip tr-clip border"
        >
          Events
        </Button>
      </Link>

      <Link href="/login">
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
