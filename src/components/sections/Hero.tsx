"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808]"
      style={{ backgroundImage: "url('/assets/images/hero-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Background video — hidden gracefully if asset missing */}
      {!videoError && (
        <video
          src="/assets/video/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        />
      )}

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-[10px] tracking-[0.3em] text-[#888] uppercase mb-6"
        >
          A PRIVATE TECHNOLOGY
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          className="text-5xl md:text-7xl font-light tracking-tight text-white max-w-4xl leading-[1.1]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Intelligence, trained in your home
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
          className="text-[#888] text-base md:text-lg tracking-wide text-center mt-4 max-w-xl"
        >
          Seven days. One system. Yours to keep.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.7 }}
          className="mt-10"
        >
          <Link
            href="/access"
            className="
              inline-block
              border border-[#333] text-[#e8e8e8] text-xs tracking-[0.2em] uppercase
              px-8 py-4
              hover:bg-white hover:text-black
              transition-all duration-300
            "
          >
            REQUEST ACCESS
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#444] text-[9px] tracking-[0.4em] uppercase">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#444] to-transparent"
        />
      </motion.div>
    </section>
  );
}
