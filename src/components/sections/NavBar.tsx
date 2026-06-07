"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-6 md:px-16 py-5
        transition-all duration-500 ease-in-out
        ${scrolled
          ? "backdrop-blur-md bg-black/60 border-b border-[#1a1a1a]"
          : "bg-transparent border-b border-transparent"
        }
      `}
    >
      <Link
        href="/"
        className="text-xs tracking-widest uppercase text-[#e8e8e8] opacity-90 hover:opacity-60 transition-opacity duration-300"
      >
        CANDACE AI
      </Link>

      <Link
        href="/access"
        className="text-xs tracking-widest uppercase text-[#e8e8e8] opacity-90 hover:opacity-60 transition-opacity duration-300"
      >
        ACCESS
      </Link>
    </nav>
  );
}
