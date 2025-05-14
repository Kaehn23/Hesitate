"use client";
import Link from "next/link";
import ThemeToggle from "./ui/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed flex justify-between items-center top-4 left-1/2 transform -translate-x-1/2 z-50 w-64 h-16 px-4 bg-black/20 dark:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 overflow-hidden">
      <Link
        href="/"
        className={
          
          "text-black dark:text-white " +
          " dark:hover:text-white/90 " +
          "hover:bg-white/30 dark:hover:bg-black/30 " +
          "px-3 py-1 rounded-full transition-colors duration-200"
        }
      >
        Home
      </Link>
      <ThemeToggle />
    </nav>
  );
}

