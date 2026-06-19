"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Systems", href: "#capabilities" },
  { label: "Design", href: "#design" },
  { label: "Ownership", href: "#ownership" },
];

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
        px-6 md:px-16 py-4
        transition-all duration-500 ease-in-out
        ${scrolled
          ? "backdrop-blur-md bg-background/80 border-b border-border"
          : "bg-transparent border-b border-transparent"
        }
      `}
    >
      <Link
        href="/"
        className="text-xs tracking-widest uppercase text-foreground font-semibold hover:text-accent-soft transition-colors duration-300"
      >
        Candace AI
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs tracking-wide text-muted hover:text-foreground transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
      </div>

      <Link
        href="/access"
        className="rounded-full bg-accent text-background text-[10px] tracking-[0.15em] uppercase font-medium px-5 py-2.5 hover:bg-accent-soft transition-all duration-300"
        style={{ boxShadow: "0 0 20px var(--accent-glow)" }}
      >
        Access
      </Link>
    </nav>
  );
}
