import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./logo-styles.css";
import "./footer-styles.css";
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
  title: {
    default: "Thomas Griggs - Senior Frontend Developer",
    template: "%s | Thomas Griggs",
  },
  description: "Senior frontend developer specializing in accessible, performant, and interactive web experiences. 250+ hotel websites built. Available for remote work worldwide.",
  keywords: ["frontend developer", "React", "Next.js", "TypeScript", "accessibility", "performance", "web development", "hotel websites", "remote work"],
  authors: [{ name: "Thomas Griggs" }],
  creator: "Thomas Griggs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thomgriggs.vercel.app",
    title: "Thomas Griggs - Portfolio",
    description: "Portfolio showcasing selected work and projects by Thomas Griggs.",
    siteName: "Thomas Griggs Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Griggs - Portfolio",
    description: "Portfolio showcasing selected work and projects by Thomas Griggs.",
    creator: "@thomgriggs",
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
