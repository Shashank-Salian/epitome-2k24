"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import useUserStore from "@/store/useUserStore";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, User2Icon } from "lucide-react";
import ButtonUI from "./ButtonUI";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];
const PUBLIC_ROUTES = [...AUTH_ROUTES, "/", "/about", "/committee"];

const PUBLIC_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/", label: "About" },
  //   { href: "/", label: "Committee" },
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

  // Fetch & Update User Store
  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch("/api/post/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session.user.email }),
        });

        if (res.status !== 200) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await res.json();
        console.log("UserData:", userData);
        if (userData && "uid" in userData && user?.uid !== userData.uid) {
          setUser({
            ...userData,
            accessToken: session?.user?.accessToken,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (session?.user?.email) {
      fetchUserData();
    }
  }, [session?.user, user, setUser]);

  return (
    // <Container parentClassName="!h-fit">
    <header
      data-augmented-ui="br-2-clip-y bl-2-clip-y"
      className="sticky w-full top-0 flex justify-between items-center px-10 py-3 bg-background/30 z-10 backdrop-blur-md"
    >
      <Link href="/">
        <img
          src="/Icons/Epitome.png"
          alt="Epitome"
          className="hidden sm:block sm:w-48 md:w-60"
        />
        <h1 className="font-spaceAge text-2xl sm:hidden">Epitome</h1>
      </Link>

      <nav className="flex_center gap-6">
        {status === "authenticated"
          ? PROTECTED_NAV_LINKS.map(({ href, label }) => (
              <Link key={label} href={href} className="text-[1.25em]">
                {label}
              </Link>
            ))
          : PUBLIC_NAV_LINKS.map(({ href, label }) => (
              <Link key={label} href={href} className="text-[1.25em]">
                {label}
              </Link>
            ))}

        {!user?.username ? (
          <Link href="/login" className="">
            <ButtonUI value="LOGIN" className="text-sm px-7" />
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

export default Header;
