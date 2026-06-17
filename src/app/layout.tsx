import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { SITE } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Construction Workflow Optimization`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "20 years in MEP fabrication. Construction workflow optimization for MEP and sheet metal contractors. Founded by Tim Raap.",
  keywords: [
    "construction workflow optimization",
    "MEP contractor",
    "sheet metal fabrication",
    "Autodesk Fabrication",
    "CADmep",
    "ESTmep",
    "CAMduct",
    "workflow audit",
    "Tim Raap",
    "RaapTech",
  ],
  authors: [{ name: SITE.founder, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Construction Workflow Optimization`,
    description:
      "20 years in MEP fabrication. Construction workflow optimization for sheet metal and MEP contractors.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Construction Workflow Optimization`,
    description:
      "20 years in MEP fabrication. Construction workflow optimization for sheet metal and MEP contractors.",
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-white focus:font-mono focus:text-xs"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
        <Script
          defer
          data-domain="raaptech.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
