"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useUserStore, { UserTypes } from "@/store/useUserStore";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, User2Icon } from "lucide-react";
import ButtonUI from "./ButtonUI";
import EpitomeLogo from "@/assets/Images/Epitome.png";
import useModalStore from "@/store/useModalStore";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];
const PUBLIC_ROUTES = [
  ...AUTH_ROUTES,
  "/",
  "/about",
  "/committee",
  "/challenges",
];

const PUBLIC_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/challenges", label: "Challenges" },
];
const PROTECTED_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/challenges", label: "Challenges" },
  { href: "/events", label: "Events" },
];

const Header = () => {
  const { data: session, status } = useSession();
  const { user, setUser } = useUserStore();
  const { setShowModal } = useModalStore();
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

        const userData: UserTypes = await res.json();
        console.log("UserData:", userData);
        if (userData && "uid" in userData && user?.uid !== userData.uid) {
          setUser({
            ...userData,
            accessToken: session?.user?.accessToken,
          });
        }
        if (!userData?.collegeName || !userData?.phone) {
          setShowModal("USER_INFO_MODAL");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (session?.user?.email) {
      fetchUserData();
    }
  }, [session?.user, user, setUser, setShowModal]);

  return (
    // <Container parentClassName="!h-fit">
    <header
      data-augmented-ui="br-2-clip-y bl-2-clip-y"
      className="sticky w-full top-0 flex justify-between items-center flex-col sm:flex-row px-10 py-3 bg-background/30 z-10 backdrop-blur-md font-oxanium"
    >
      <Link href="/">
        <Image
          src={EpitomeLogo}
          width={EpitomeLogo.width}
          height={EpitomeLogo.height}
          alt="Epitome"
          className="hidden sm:block sm:w-44"
        />
        <h1 className="font-spaceAge text-2xl sm:hidden">Epitome</h1>
      </Link>

      <nav className="flex_center gap-6 mt-6 sm:mt-0">
        {status === "authenticated"
          ? PROTECTED_NAV_LINKS.map(({ href, label }) => (
              <Link key={label} href={href} className="md:text-[1.25em]">
                {label}
              </Link>
            ))
          : PUBLIC_NAV_LINKS.map(({ href, label }) => (
              <Link key={label} href={href} className="md:text-[1.25em]">
                {label}
              </Link>
            ))}

        {status == "unauthenticated" ? (
          <Link
            href={pathname == "/login" ? "/register" : "/login"}
            className=""
          >
            <ButtonUI
              value={pathname == "/login" ? "Register" : "Login"}
              className="text-sm tracking-widest px-7"
            />
          </Link>
        ) : (
          <div className="clip_Btn flex_center gap-4 bg-primary px-4 py-1 rounded-md">
            {user?.picture ? (
              <div className="flex_center rounded-full bg-background/20 overflow-hidden">
                <Image
                  src={user?.picture}
                  width={40}
                  height={40}
                  className="object-cover"
                  alt="User_Profile"
                />
              </div>
            ) : (
              <User2Icon size={25} />
            )}
            <span className="font-oxanium">{user?.username}</span>
          </div>
        )}
      </nav>
    </header>
    // </Container>
  );
};

export default Header;
