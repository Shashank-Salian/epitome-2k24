"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useUserStore, { UserTypes } from "@/store/useUserStore";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, User2Icon } from "lucide-react";
import ButtonUI from "./ButtonUI";
import EpitomeLogo from "@/assets/Images/Epitome.png";
import useModalStore from "@/store/useModalStore";
import Burger from "./Burger";
import { cn } from "@/lib/utils";

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
  { href: "/dashboard", label: "Dashboard" },
  { href: "/challenges", label: "Challenges" },
  { href: "/events", label: "Events" },
];

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

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
    // <div className="w-full flex_center">
    <header
      data-augmented-ui="br-2-clip-y bl-2-clip-y"
      className={cn(
        "!sticky min-w-full top-0 flex justify-between items-center z-[100] px-10 py-3 bg-background/30 backdrop-blur-md font-oxanium",
        navOpen && "remove_aug bg-background/80 md:bg-transparent"
      )}
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

      <div>
        <Burger
          onClick={() => setNavOpen((prev) => !prev)}
          isOpen={navOpen}
        />
        <nav
          className={cn(
            "flex_center gap-6 bg-background/80 md:bg-background/0 transition-all duration-500 ease-in-out overflow-y-hidden absolute z-[100] left-0 right-0 top-full flex-col md:flex-row md:py-0 md:flex md:h-full md:static sm:mt-0 rounded-b-2xl",
            navOpen ? "h-max py-4" : "h-0"
          )}
        >
          {status === "authenticated"
            ? PROTECTED_NAV_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="md:text-[1.25em] block md:inline w-full py-2 text-center my-2"
              >
                {label}
              </Link>
            ))
            : PUBLIC_NAV_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="md:text-[1.25em] block md:inline w-full py-2 text-center my-2"
              >
                {label}
              </Link>
            ))}
          {status == "unauthenticated" ? (
            <Link
              href={pathname == "/login" ? "/register" : "/login"}
              className="block md:inline w-full py-2 text-center my-2"
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
              <span className="font-oxanium text-nowrap">
                {user?.username}
              </span>
            </div>
          )}
        </nav>
      </div>
    </header>
    // </div>
    // </Container>
  );
};

export default Header;
