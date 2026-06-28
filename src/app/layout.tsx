import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raaptech.com"),
  title: {
    default: "RaapTech LLC — Autodesk Fabrication Consulting & AI for the Trades",
    template: "%s | RaapTech LLC",
  },
  description:
    "20 years of Autodesk Fabrication experience. CADmep, ESTmep, CAMduct consulting and AI onboarding for sheet metal and MEP contractors. Founded by Kyle Raap.",
  keywords: [
    "Autodesk Fabrication",
    "CADmep",
    "ESTmep",
    "CAMduct",
    "sheet metal consulting",
    "MEP contractor",
    "AI onboarding",
    "fabrication database",
    "Kyle Raap",
    "RaapTech",
  ],
  authors: [{ name: "Kyle Raap", url: "https://raaptech.com" }],
  creator: "RaapTech LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raaptech.com",
    siteName: "RaapTech LLC",
    title: "RaapTech LLC — Autodesk Fabrication Consulting & AI for the Trades",
    description:
      "20 years of Autodesk Fabrication. CADmep, ESTmep, CAMduct consulting and AI onboarding for sheet metal and MEP contractors.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RaapTech LLC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RaapTech LLC — Autodesk Fabrication Consulting & AI for the Trades",
    description:
      "20 years of Autodesk Fabrication. CADmep, ESTmep, CAMduct consulting and AI onboarding for sheet metal and MEP contractors.",
    images: ["/og-image.png"],
    creator: "@raaptech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-paper font-sans text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
