"use client";

import { Button } from "@/components/ui/button";
import useUserStore from "@/store/useUserStore";
import Link from "next/link";

const PageButtons = ({ className }: { className?: string }) => {
  const { user } = useUserStore();

  const authBtn = (isLogin = true) => {
    return (
      <Link href={isLogin ? "/login" : "/events"}>
        <Button
          className={className}
          data-augmented-ui="bl-clip tr-clip border"
        >
          {isLogin ? "Log In" : "Register"}
        </Button>
      </Link>
    );
  };

  return (
    <>
      <Link href={"/register"}>
        <Button
          className={className}
          data-augmented-ui="bl-clip tr-clip border"
        >
          <span>Sign Up</span>
        </Button>
      </Link>

      <Link href={"/challenges"}>
        <Button
          className={className}
          data-augmented-ui="bl-clip tr-clip border"
        >
          Events
        </Button>
      </Link>

      {authBtn(!user)}

      <Button className={className} data-augmented-ui="bl-clip tr-clip border">
        <span>About</span>
      </Button>
    </>
  );
};

export default PageButtons;
