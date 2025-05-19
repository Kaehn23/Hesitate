import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import "../globals.css";
import React from "react";

export const metadata: Metadata = {
   title: "Hesitate",
   description: "Don't hesitate anymore... In anything!",
   openGraph: {
      title: 'Hesitate',
      description: "Don't hesitate anymore... In anything!",
      url: 'https://hesitate.vercel.app/go',
      siteName: 'Hesitate',
      locale: 'en_US',
      type: 'website',
      images: [
         {
            url: '/opengraph-image.png', // <-- Place generated OpenGraph image here
            width: 1200,
            height: 630,
            alt: 'Hesitate OpenGraph Image',
         },
      ],
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Hesitate',
      description: "Don't hesitate anymore... In anything!",
      images: ['/opengraph-image.png'],
   },
};

export default function RootLayout({ children }: { children: any }) {
   return (
      <html lang="en" suppressHydrationWarning>
         <head>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="canonical" href="https://hesitate.vercel.app/" />
            {/* Place additional OpenGraph images in /public as needed */}
         </head>    
         <body>
            <ThemeProvider>
               <main>{children}</main>
            </ThemeProvider>
         </body>
      </html>
   );
}
