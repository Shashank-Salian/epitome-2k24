import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThreeComp from "@/threeWorks/components/ThreeComp";
import Provider from "@/providers/Providers";
// import Cursor from "@/components/CustomUI/Cursor";
import "./globals.css";
import "augmented-ui";
// import ToggleUI from "@/components/CustomUI/ToggleUI";

import dynamic from "next/dynamic";

const ToggleUI = dynamic(() => import("@/components/CustomUI/ToggleUI"), {
  ssr: false,
});

const spaceAge = localFont({
  src: "../assets/fonts/spaceage.woff2",
  preload: true,
  display: "swap",
  variable: "--SpaceAge",
});

const oxanium = localFont({
  src: [
    {
      path: "../assets/fonts/Oxanium-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Oxanium-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  preload: true,
  display: "swap",
  variable: "--Oxanium",
});

const iceland = localFont({
  src: "../assets/fonts/Iceland-Regular.woff2",
  preload: true,
  display: "swap",
  variable: "--Iceland",
});

const TITLE = "Epitome | AIMIT IT Fest 2024";
const DESCRIPTION = "Epitome is a National level intercollegiate fest of the IT department of AIMIT, St Aloysius College (Deemed to be University)";
const BASE_URL = new URL("https://epitome-aimit.in/");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "EPITOME",
    "Epitome 2k24",
    "epitome",
    "AIMIT",
    "Aloysius",
    "IT Fest",
    "Epitome 2024",
    "2024",
    "chiragchrg",
    "chirag",
    "chrgchirag",
  ],
  authors: [
    { name: "ChiragChrg", url: "https://chiragchrg.netlify.app/" },
    { name: "Harishri B R", url: "https://github.com/Harishri2002" },
    { name: "Shashank Salian", url: "https://cws-portfolio.vercel.app/" },
  ],
  creator: "ChiragChrg, Shashank Salian, Harishri B R",
  metadataBase: BASE_URL,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "TSsuy8j81zZ0Ge0aestKiwZUPydASWd9aANj-ITDack",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/Icons/144.png",
    shortcut: "/favicon.png",
    apple: "/Icons/192.png",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: "Epitome 2K24",
    images: [
      {
        url: "/Icons/192.png",
        width: 192,
        height: 192,
        alt: "Epitome Logo",
      },
      {
        url: "/Icons/temp_wide_screenshot.png",
        width: 768,
        height: 359,
        alt: "Epitome Mockup Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@chrgchirag",
    images: ["/Icons/192.png", "/Icons/temp_wide_screenshot.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "hsl(0 0% 100%)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oxanium.variable} ${spaceAge.variable} ${iceland.variable} bg-blueGradientAlt text-foreground relative overflow-x-hidden`}
      >
        <Provider>{children}</Provider>
        <ThreeComp />
        {/* <Cursor /> */}
        <ToggleUI />
      </body>
    </html>
  );
}
