import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://thomgriggs-portfolio.vercel.app"),
  title: {
    default: "Thomas Griggs - Front-end Developer",
    template: "%s | Thomas Griggs",
  },
  description: "Front-end developer who hand-codes clean, fast, accessible sites for brands and hospitality.",
  keywords: ["frontend developer", "HTML", "CSS", "JavaScript", "accessibility", "performance", "web development", "responsive design"],
  authors: [{ name: "Thomas Griggs" }],
  creator: "Thomas Griggs",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Thomas Griggs - Front-end Developer",
    description: "Front-end developer who hand-codes clean, fast, accessible sites for brands and hospitality.",
    siteName: "Thomas Griggs Portfolio",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Thomas Griggs Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Griggs - Front-end Developer",
    description: "Front-end developer who hand-codes clean, fast, accessible sites for brands and hospitality.",
    creator: "@thomgriggs",
    images: ["/api/og"],
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
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <Analytics />
          <Script
            src="/register-sw.js"
            strategy="afterInteractive"
          />
        </ErrorBoundary>
      </body>
    </html>
  );
}
