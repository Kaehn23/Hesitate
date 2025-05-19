"use client";

import React from "react";

import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { Metadata } from "next";

// your fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Hesitate",
   description: "Don't hesitate anymore... In anything!",
   openGraph: {
      title: "Hesitate",
      description: "Don't hesitate anymore... In anything!",
      url: "https://hesitate.vercel.app",
      siteName: "Hesitate",
      locale: "en_US",
      type: "website",
      images: [
         {
            url: "/opengraph-image.png",
            width: 1200,
            height: 630,
            alt: "Hesitate OpenGraph Image",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "Hesitate",
      description: "Don't hesitate anymore... In anything!",
      images: ["/opengraph-image.png"],
   },
};

export default function LocaleLayout({
   children,
}: {
   children: React.ReactNode;
}): React.ReactElement {
   return (
      <html
         lang="en"
         className={`${geistSans.variable} ${geistMono.variable}`}
         suppressHydrationWarning
      >
         <head>
            <link rel="icon" href="/favicon.ico" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="canonical" href="https://hesitate.vercel.app/" />
         </head>
         <body>
            <ThemeProvider>
               <Navbar />
               {children}
               <Footer />
            </ThemeProvider>
         </body>
      </html>
   );
}
