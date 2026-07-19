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

const DESCRIPTION =
  "Chicago-based Autodesk Fabrication database consultancy for MEP contractors and sheet metal shops. We fix broken CADmep, CAMduct, and ESTmep databases so estimators stop hunting for pricing and start winning bids.";

export const metadata: Metadata = {
  metadataBase: new URL("https://raaptech.com"),
  title: {
    default: "RaapTech LLC — Autodesk Fabrication Database Consultancy, Chicago",
    template: "%s | RaapTech LLC",
  },
  description: DESCRIPTION,
  keywords: [
    "Autodesk Fabrication consultant",
    "CAMduct database",
    "ESTmep database cleanup",
    "CADmep database",
    "fabrication database audit Chicago",
    "Autodesk Fabrication database",
    "MEP fabrication",
    "sheet metal fabrication",
    "Tim Raap",
    "RaapTech",
  ],
  authors: [{ name: "Tim Raap", url: "https://raaptech.com" }],
  creator: "RaapTech LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raaptech.com",
    siteName: "RaapTech LLC",
    title: "RaapTech LLC — Autodesk Fabrication Database Consultancy, Chicago",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "RaapTech LLC — Autodesk Fabrication Database Consultancy, Chicago",
    description: DESCRIPTION,
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
      "@type": "LocalBusiness",
      "@id": "https://raaptech.com/#organization",
      name: "RaapTech LLC",
      url: "https://raaptech.com",
      description:
        "Autodesk Fabrication database consultancy for MEP contractors and sheet metal fabrication shops.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Elmwood Park",
        addressRegion: "IL",
        addressCountry: "US",
      },
      areaServed: ["Chicago", "Midwest", "United States"],
      founder: { "@id": "https://raaptech.com/#tim" },
      email: "TRaap@RaapTech.com",
      telephone: "+1-224-202-6962",
    },
    {
      "@type": "Person",
      "@id": "https://raaptech.com/#tim",
      name: "Tim Raap",
      jobTitle: "Founder",
      worksFor: { "@id": "https://raaptech.com/#organization" },
      url: "https://raaptech.com/about",
    },
    {
      "@type": "Service",
      "@id": "https://raaptech.com/#database-health-audit",
      name: "Database Health Audit",
      provider: { "@id": "https://raaptech.com/#organization" },
      serviceType: "Autodesk Fabrication database audit",
      areaServed: "United States",
      offers: {
        "@type": "Offer",
        price: "2500",
        priceCurrency: "USD",
      },
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
