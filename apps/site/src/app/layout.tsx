import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Thomas Griggs - Portfolio",
    template: "%s | Thomas Griggs - Portfolio",
  },
  description: "Portfolio showcasing selected work and projects by Thomas Griggs. Explore featured projects, web development, and creative solutions.",
  keywords: ["portfolio", "web development", "frontend", "react", "nextjs", "typescript"],
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
        {children}
      </body>
    </html>
  );
}
