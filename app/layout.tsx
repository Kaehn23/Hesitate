import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "@/app/components/ui/ThemeToggle";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Hesitate",
   description: "Don't hesitate anymore... In anything!",
};

export default function RootLayout({ children }: { children: any }) {
   return (
      <>
         <html lang="en" suppressHydrationWarning>
            <head />
            <body>
               <ThemeProvider                  
               >
                  <Navbar />
                  {children}
                  <Footer />
               </ThemeProvider>
            </body>
         </html>
      </>
   );
}
