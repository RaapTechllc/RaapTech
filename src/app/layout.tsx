import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Self-hosted variable fonts (no build-time network fetch). See DESIGN.md.
const inter = localFont({
  src: "./fonts/inter-variable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-variable.woff2",
  weight: "100 800",
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-variable.woff2",
  weight: "300 700",
  display: "swap",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "RaapTech LLC — Autodesk Fabrication Consulting & AI for the Trades",
    description:
      "20 years of Autodesk Fabrication. CADmep, ESTmep, CAMduct consulting and AI onboarding for sheet metal and MEP contractors.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://raaptech.com/#organization",
      name: "RaapTech LLC",
      url: "https://raaptech.com",
      description:
        "Autodesk Fabrication consulting and AI onboarding for sheet metal and MEP contractors.",
      areaServed: "United States",
      founder: { "@id": "https://raaptech.com/#kyle" },
      email: "kyle@raaptech.com",
    },
    {
      "@type": "Person",
      "@id": "https://raaptech.com/#kyle",
      name: "Kyle Raap",
      jobTitle: "Founder",
      worksFor: { "@id": "https://raaptech.com/#organization" },
      url: "https://raaptech.com/about",
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
