"use client";

import React from "react";

interface GlassButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   children: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
   children,
   className = "",
   ...props
}) => {
   return (
      <button
         {...props}
         className={[
            // glass effect
            "bg-black/30", // semi-transparent white
            "dark:bg-white/20", // semi-transparent white
            "backdrop-blur-sm", // glass blur
            "border border-white/30", // subtle border
            "dark:text-white",
            "text-black", // text color
            "rounded-lg", // rounded corners
            "px-4 py-2", // padding
            "transition-colors",
            "dark:hover:bg-white/30",
            "hover:bg-black/30",
            "active:bg-white/40",
            "hover:scale-105",
            "active:scale-95",

            className,
         ].join(" ")}
      >
         {children}
      </button>
   );
};
