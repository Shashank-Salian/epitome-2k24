"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import useUserStore from "@/store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
// import Container from "@/containers/Container/Container";
// import { getUserByEmail } from "@/app/actions/UserActions";
import { ChevronDown, User2Icon } from 'lucide-react'
import ButtonUI from "./ButtonUI";

const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password"];
const PUBLIC_ROUTES = [...AUTH_ROUTES, "/", "/about", "/commitee"]

const PUBLIC_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/", label: "About" },
  { href: "/", label: "Commitee" },
];
const PROTECTED_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/", label: "About" },
  { href: "/", label: "My Team" },
  { href: "/events", label: "Events" },
];

const Header = () => {
  const { data: session, status } = useSession();
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthRoute = AUTH_ROUTES.includes(pathname);
    const isProtectedRoute = !PUBLIC_ROUTES.includes(pathname);

    if (status === "authenticated" && isAuthRoute) {
      router.push("/dashboard");
    }

    if (status === "unauthenticated" && isProtectedRoute) {
      router.push("/");
    }
  }, [session, status, router, pathname]);

  // User Data Fetching
  const { data: userData } = useQuery({
    queryKey: ["user", session?.user?.email],
    queryFn: async () => {
      if (!session?.user?.email) return null;

      const res = await fetch("/api/post/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.user.email }),
      });

      if (res.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      console.log("UserData:", data);
      return data;
    },
    enabled: !!session?.user?.email,
  });

  // Update User Store
  useEffect(() => {
    if (userData && 'uid' in userData && user?.uid !== userData.uid) {
      setUser({
        ...userData,
        accessToken: session?.user?.accessToken
      });
    }
  }, [userData, session?.user?.accessToken, user, setUser]);

  return (
    // <Container parentClassName="!h-fit">
    <header
      data-augmented-ui="br-2-clip-y bl-2-clip-y"
      className="styleme sticky w-full top-0 flex justify-between items-center px-10 py-3 bg-background/30 z-10 backdrop-blur-md">
      <Link href="/">
        <h1 className="text-[1.5em] font-beyonders">LOGO</h1>
      </Link>

      <nav className="flex_center gap-6">
        {status === "authenticated" ?
          PROTECTED_NAV_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-[1.25em]"
            >
              {label}
            </Link>
          ))
          :
          PUBLIC_NAV_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-[1.25em]"
            >
              {label}
            </Link>
          ))
        }

        {!user?.username ? (
          <Link href="/login" className="ml-4">
            <ButtonUI value="LOGIN" />
          </Link>
        ) : (
          <div className="clip_Btn flex_center gap-4 bg-primary px-2 rounded-md">
            <div className="flex_center rounded-full bg-background/20 p-3">
              <User2Icon size={25} />
            </div>
            <span>Welcome {user.username}!</span>
            <ChevronDown />
          </div>
        )}
      </nav>
    </header>
    // </Container>
  );
};

export default Header