import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
// import { Oxanium, Big_Shoulders_Display, Iceland } from "next/font/google";
import "./globals.css";
import ThreeComp from "@/threeWorks/components/ThreeComp";
import Provider from "@/providers/Providers";
import Cursor from "@/components/CustomUI/Cursor";
import "./globals.css";
import "augmented-ui";

const poppins = localFont({
  src: [
    {
      path: "../assets/fonts/Poppins-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Poppins-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Poppins-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--Poppins",
});

const valorant = localFont({
  src: "../assets/fonts/valorant.woff2",
  display: "swap",
  variable: "--Valorant",
});

const beyonders = localFont({
  src: "../assets/fonts/beyonders.woff2",
  display: "swap",
  variable: "--Beyonders",
});

const spaceAge = localFont({
  src: "../assets/fonts/spaceage.ttf",
  display: "swap",
  variable: "--SpaceAge",
});

// const oxanium = Oxanium({
//   weight: ["400", "700"],
//   preload: true,
//   display: "swap",
//   subsets: ["latin"],
//   variable: "--Oxanium",
// });

// const bsd = Big_Shoulders_Display({
//   weight: ["400", "700"],
//   subsets: ["latin"],
//   variable: "--Bsd",
// });

// const iceland = Iceland({
//   weight: ["400"],
//   subsets: ["latin"],
//   variable: "--Iceland",
// });

const TITLE = "Epitome | AIMIT IT Fest 2024";
const DESCRIPTION = "some_description";
const BASE_URL = new URL("https://epitome-aimit.vercel.app/");

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
    shortcut: "/favicon.ico",
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
        className={`${poppins.variable} ${valorant.variable} ${beyonders.variable} ${spaceAge.variable} bg-blueGradient text-foreground`}
      >
        {/* 
        className={`${poppins.variable} ${valorant.variable} ${oxanium.variable} ${beyonders.variable} ${spaceAge.variable} ${bsd.variable} ${iceland.variable} bg-background text-foreground`}
         */}
        <Provider>{children}</Provider>

        {/* <ThreeComp /> */}
        {/* <Cursor /> */}
      </body>
    </html>
  );
}
