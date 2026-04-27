import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raaptech.com"),
  title: {
    default: "RaapTech LLC — Construction Workflow Optimization",
    template: "%s | RaapTech LLC",
  },
  description:
    "20 years in MEP fabrication. Thousands of admin hours eliminated. Construction workflow optimization for MEP and sheet metal contractors. Founded by Kyle Raap.",
  keywords: [
    "construction workflow optimization",
    "MEP contractor",
    "sheet metal fabrication",
    "Autodesk Fabrication",
    "CADmep",
    "ESTmep",
    "CAMduct",
    "workflow audit",
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
    title: "RaapTech LLC — Construction Workflow Optimization",
    description:
      "20 years in MEP fabrication. Construction workflow optimization for sheet metal and MEP contractors.",
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
    title: "RaapTech LLC — Construction Workflow Optimization",
    description:
      "20 years in MEP fabrication. Construction workflow optimization for sheet metal and MEP contractors.",
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
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-dark-bg text-slate-200 font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
