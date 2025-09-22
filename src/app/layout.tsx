import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Navigation";
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

  export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://thomgriggs-portfolio.vercel.app"),
  title: {
    default: "Thom Griggs — Front-end Developer",
    template: "%s | Thom Griggs — Front-end Developer"
  },
  description: "Front-end developer specializing in clean, accessible websites for brands and hospitality. 10+ years of hand-coding with expertise in HTML/CSS, JavaScript, and modern frameworks.",
  keywords: [
    "front-end developer",
    "web developer",
    "HTML CSS JavaScript",
    "responsive design",
    "accessibility",
    "hospitality websites",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Figma to code",
    "Thom Griggs"
  ],
  authors: [{ name: "Thom Griggs", url: "https://thomgriggs-portfolio.vercel.app" }],
  creator: "Thom Griggs",
  publisher: "Thom Griggs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Thom Griggs — Front-end Developer",
    description: "Front-end developer specializing in clean, accessible websites for brands and hospitality. 10+ years of hand-coding with expertise in HTML/CSS, JavaScript, and modern frameworks.",
    siteName: "Thom Griggs Portfolio",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Thom Griggs — Front-end Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thom Griggs — Front-end Developer",
    description: "Front-end developer specializing in clean, accessible websites for brands and hospitality. 10+ years of hand-coding with expertise in HTML/CSS, JavaScript, and modern frameworks.",
    images: ["/og.svg"],
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
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0b0b0d" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      </head>
              <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              >
                <ErrorBoundary>
                  <a 
                    href="#main" 
                    className="skip-link"
                    aria-label="Skip to main content"
                  >
                    Skip to main content
                  </a>
                  <Header />
                  <main id="main" role="main" aria-label="Main content">
                    {children}
                  </main>
                  <Footer />
                  <Analytics />
                  <Script
                    src="/register-sw.js"
                    strategy="afterInteractive"
                  />
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                        "@context":"https://schema.org",
                        "@type":"Person",
                        "name":"Thom Griggs",
                        "url": process.env.NEXT_PUBLIC_SITE_URL || "https://thomgriggs-portfolio.vercel.app",
                        "jobTitle":"Front-end Developer",
                        "description":"Front-end developer specializing in clean, accessible websites for brands and hospitality. 10+ years of hand-coding with expertise in HTML/CSS, JavaScript, and modern frameworks.",
                        "knowsAbout":["HTML", "CSS", "JavaScript", "React", "TypeScript", "Responsive Design", "Accessibility", "Web Development"],
                        "hasOccupation": {
                          "@type": "Occupation",
                          "name": "Front-end Developer",
                          "description": "Specializes in creating clean, accessible websites for brands and hospitality industry"
                        },
                        "sameAs":[ 
                          "https://www.linkedin.com/in/thomgriggs",
                          "https://github.com/thomgriggs"
                        ]
                      })
                    }}
                  />
                </ErrorBoundary>
              </body>
    </html>
  );
}
