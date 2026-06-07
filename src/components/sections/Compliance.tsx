"use client";

import { motion } from "framer-motion";

const badges = [
  "FCC",
  "FIPS 140-3",
  "NIST SP 800-171",
  "Energy Star",
  "Made in U.S.A.",
  "Section 508",
];

export default function Compliance() {
  return (
    <section className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
      {/* Section label */}
      <p className="text-[10px] tracking-widest text-[#555] uppercase mb-2">
        IV · STANDARDS
      </p>

      {/* Headline */}
      <h2 className="text-3xl font-light text-white mt-2 mb-12">
        Built to the highest standard.
      </h2>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-wrap gap-3"
      >
        {badges.map((badge) => (
          <span
            key={badge}
            className="border border-[#222] text-[#555] text-[10px] tracking-widest uppercase px-4 py-2"
          >
            {badge}
          </span>
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="text-[#444] text-xs mt-8 tracking-wide"
      >
        Assembled in the United States. Every unit verified before shipment.
      </motion.p>
    </section>
  );
}
