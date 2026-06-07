"use client";

import { motion, type Variants } from "framer-motion";

const capabilities = [
  {
    number: "01",
    name: "Spatial Mapping",
    description: "LiDAR-class room understanding",
  },
  {
    number: "02",
    name: "Adaptive Learning",
    description: "Path refinement, error prevention",
  },
  {
    number: "03",
    name: "Silent Operation",
    description: "48 dB acoustic performance",
  },
  {
    number: "04",
    name: "Sealed Architecture",
    description: "Enclosed sensor and storage modules",
  },
  {
    number: "05",
    name: "Edge Processing",
    description: "On-device inference. No external data transmission",
  },
  {
    number: "06",
    name: "Self-Diagnostic",
    description: "Wear detection before failure",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Capabilities() {
  return (
    <section className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
      {/* Section label */}
      <p className="text-[10px] tracking-widest text-[#555] uppercase mb-2">
        II · SYSTEMS
      </p>

      {/* Headline */}
      <h2 className="text-3xl font-light text-white mt-2 mb-16">
        Six core systems.
      </h2>

      {/* Cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {capabilities.map((cap) => (
          <motion.div
            key={cap.number}
            variants={cardVariants}
            className="bg-[#0d0d0d] p-6 flex flex-col gap-3"
          >
            <span className="text-[10px] text-[#333] font-mono">
              {cap.number}
            </span>
            <p className="text-sm font-light text-white leading-snug">
              {cap.name}
            </p>
            <p className="text-xs text-[#555] mt-2 leading-relaxed">
              {cap.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
