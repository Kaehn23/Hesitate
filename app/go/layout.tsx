import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import "../globals.css";
import React from "react";

export const metadata: Metadata = {
   title: "Hesitate",
   description: "Don't hesitate anymore... In anything!",
};

export default function RootLayout({ children }: { children: any }) {
   return (
      <html suppressHydrationWarning>
         <head>
                      
         </head>    
         <body>
            <ThemeProvider>{children}</ThemeProvider>
         </body>
      </html>
   );
}
