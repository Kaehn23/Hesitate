"use client";
import React, { useId, useEffect, useState, useMemo, useCallback } from "react";
import Particles from "@tsparticles/react";
import type { Container, SingleOrMultiple } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export type ParticlesProps = {
   id?: string;
   className?: string;
   background?: string;
   particleSize?: number;
   minSize?: number;
   maxSize?: number;
   speed?: number;
   particleColor?: string;
   particleDensity?: number;
};

export const SparklesCore: React.FC<ParticlesProps> = ({
   id,
   className = "",
   background = "#0d47a1",
   minSize = 1,
   maxSize = 3,
   speed = 4,
   particleColor = "#ffffff",
   particleDensity = 120,
}) => {
   const [initialized, setInitialized] = useState(false);
   const controls = useAnimation();
   const generatedId = useId();

   // Initialize tsparticles engine once
   useEffect(() => {
      initParticlesEngine(async (engine) => {
         await loadSlim(engine);
      }).then(() => setInitialized(true));
   }, []);

   // Memoize particle options to avoid recreating on every render
   const options = useMemo(
      () => ({
         background: { color: { value: background } },
         fullScreen: { enable: false, zIndex: 1 },
         fpsLimit: 120,
         interactivity: {
            events: { onClick: { enable: true, mode: "push" }, resize: true },
            modes: { push: { quantity: 4 } },
         },
         particles: {
            color: { value: particleColor },
            number: {
               value: particleDensity,
               density: { enable: true, width: 400, height: 400 },
            },
            size: { value: { min: minSize, max: maxSize } },
            opacity: {
               value: { min: 0.1, max: 1 },
               animation: { enable: true, speed, startValue: "random" },
            },
            move: {
               enable: true,
               speed: { min: 0.1, max: 1 },
               outModes: { default: "out" },
            },
            collisions: { enable: false },
            links: { enable: false },
         },
         detectRetina: true,
      }),
      [background, particleColor, particleDensity, minSize, maxSize, speed]
   );

   // Stable particlesLoaded callback
   const handleParticlesLoaded = useCallback(
      async (container?: Container) => {
         if (container) {
            await controls.start({ opacity: 1, transition: { duration: 1 } });
         }
      },
      [controls]
   );

   return (
      <motion.div animate={controls} className={cn("opacity-0", className)}>
         {initialized && (
            <Particles
               id={id || generatedId}
               className="h-full w-full"
               options={options as any}
               particlesLoaded={handleParticlesLoaded}
            />
         )}
      </motion.div>
   );
};
