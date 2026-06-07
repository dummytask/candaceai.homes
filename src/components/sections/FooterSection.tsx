"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function FooterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer className="bg-[#030303] border-t border-[#0f0f0f]">
      {/* CTA block */}
      <div ref={ref} className="py-32 px-6 md:px-16 flex flex-col items-center text-center">
        <p className="text-[#444] text-[10px] tracking-widest uppercase">
          Not tested. Not evaluated.
        </p>

        <motion.h2
          className="text-4xl md:text-5xl font-light text-white mt-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Start your evaluation.
        </motion.h2>

        <Link
          href="/access"
          className="border border-[#333] text-[#e8e8e8] text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
        >
          REQUEST ACCESS
        </Link>
      </div>

      {/* Divider */}
      <div className="border-t border-[#0f0f0f] mx-6 md:mx-16 my-0" />

      {/* Bottom bar */}
      <div className="px-6 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] tracking-widest text-[#333] uppercase">
          CANDACE AI
        </p>
        <p className="text-[10px] text-[#2a2a2a] max-w-xs text-center leading-relaxed">
          Data is used to improve system performance. Only the storage module is
          returned.
        </p>
        <p className="text-[10px] text-[#333]">© 2026</p>
      </div>
    </footer>
  );
}
