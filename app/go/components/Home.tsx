"use client";
import React from "react";
import { DynamicList } from "./DynamicList";
import { SparklesCore } from "@/app/ui/sparkles";
import { useTheme } from "next-themes";

function Home() {
   const { theme } = useTheme();
   const isDark = theme === "dark";
   return (
      <div className="relative min-h-[calc(100vh-1.5rem)] w-screen bg-gray-100 dark:bg-black flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute inset-0">
            <SparklesCore
               id="tsparticlesfullpage"
               background="transparent"
               minSize={0.6}
               maxSize={1.4}
               particleDensity={100}
               className="w-full h-full"
               particleColor={isDark ? "#FFFFFF" : "#999999"}
            />
         </div>
         <div className="relative z-10 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold m-2 p-2 uppercase">
               Home of action
            </h1>
            <DynamicList />
         </div>
      </div>
   );
}

export default Home;
