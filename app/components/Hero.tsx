"use client";
import React from "react";
import { SparklesCore } from "./ui/sparkles";
import { useTheme } from "next-themes";
import { FlipWords } from "./ui/flip-word";
import { GlassButton } from "./ui/GlassButton";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { Modal } from "./ui/Modal";
import { useRouter } from "next/navigation";


const Hero = () => {
   const { theme } = useTheme();
   const isDark = theme === "dark";
   const router = useRouter();

   const words = ["Hesitate ?", "Don't.", "Act, now."];
   const testimonials = [
      {
         quote: "Better be done, than perfect.",
         name: "- Sangoku",
      },
      {
         quote: "You like fishsticks ?",
         name: "- Kanye West",
      },
      {
         quote: "Never gonna give you up, never gonna let you down, never gonna run around and desert you...",
         name: "- Rick Astley",
      },
   ];

   const handleStart = () => {
      router.push('/go');
   };

   return (
      <div className="min-h-[calc(100vh-1.5rem)] w-screen bg-white dark:bg-black flex flex-col items-center justify-center overflow-hidden">
         <h1 className="md:text-7xl text-3xl lg:text-9xl mx-auto font-bold text-center text-black dark:text-white relative z-20">
            <FlipWords
               words={words}
               duration={5000}
               className="text-center text-4xl sm:text-5xl md:text-7xl lg:text-9xl"
            />
         </h1>
         <div className="w-[40rem] h-40 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent dark:via-indigo-300 h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent dark:via-indigo-300 h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent dark:via-sky-300 h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent dark:via-sky-300 h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
               background="transparent"
               minSize={0.4}
               maxSize={2}
               particleDensity={2400}
               className="w-full h-full"
               particleColor={isDark ? "#FFFFFF" : "#999999"}
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-white dark:bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
         </div>
         <div className="m-2 p-2 md:pt-4">
            <Modal 
               title="How to Use Hesitate"
               description="Follow these simple steps to overcome your hesitation:"
            >
               <GlassButton>Go</GlassButton>
            </Modal>
         </div>
         <div className="p-4">
            <InfiniteMovingCards
               items={testimonials}
               direction="right"
               speed="normal"
            />
         </div>
      </div>
   );
};

export default Hero;
