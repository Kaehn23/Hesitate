"use client";

import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

type ThemeToggleProps = {};

const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeToggle must be used within ThemeProvider");
  const { theme, toggle } = context;
  const isDark = theme === "dark";

  return (
    <div className="flex  bg-black/20 dark:bg-black p-2 rounded-full">
      <span className={`mr-3 font-medium ${isDark ? "text-white" : "text-black"}`}>
        {isDark ? "Dark " : "Light "}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        onClick={toggle}
        className={`flex items-center justify-center h-6 w-6 rounded-full transition-colors duration-200   ${
          isDark ? "bg-indigo-600" : "bg-gray-300"
        }`}
      >
        {isDark ? "🌙" : "☀️"}
      </button>
    </div>
  );
};

export default ThemeToggle;