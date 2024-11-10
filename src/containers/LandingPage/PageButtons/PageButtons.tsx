"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const PageButtons = ({ className }: { className?: string }) => {
  return (
    <>
      <Button className={className} data-augmented-ui="bl-clip tr-clip border">
        <span>Registration</span>
      </Button>

      <Link href={"/challenges"}>
        <Button
          className={className}
          data-augmented-ui="bl-clip tr-clip border"
        >
          Events
        </Button>
      </Link>

      <Link href={"/login"}>
        <Button
          className={className}
          data-augmented-ui="bl-clip tr-clip border"
        >
          Log In
        </Button>
      </Link>

      <Button className={className} data-augmented-ui="bl-clip tr-clip border">
        <span>About</span>
      </Button>
    </>
  );
};

export default PageButtons;
