"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    number: "01",
    name: "DELIVERED",
    description: "Device ships to your home.",
  },
  {
    number: "02",
    name: "TRIAL",
    description: "Seven days of active learning.",
  },
  {
    number: "03",
    name: "MODULE RETURN",
    description: "Only the data storage module is returned.",
  },
  {
    number: "04",
    name: "YOURS",
    description: "The device remains. The intelligence stays.",
    active: true,
  },
];

export default function OwnershipModel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 px-6 md:px-16 max-w-6xl mx-auto" ref={ref}>
      <p className="text-[10px] tracking-[0.3em] text-[#444] uppercase mb-12">
        VII · OWNERSHIP
      </p>

      <h2 className="text-3xl font-light text-white">
        A system that improves with you.
      </h2>
      <p className="text-[#555] text-sm mt-2 mb-16">The trial is the proof.</p>

      {/* Steps — horizontal on desktop, vertical on mobile */}
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-0">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            className="relative flex-1"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
          >
            {/* Connector line — desktop only, not on last item */}
            {i < STEPS.length - 1 && (
              <div className="hidden md:block absolute top-3 left-[calc(50%+12px)] right-0 border-t border-[#1a1a1a]" />
            )}

            {/* Vertical connector — mobile only, not on last item */}
            {i < STEPS.length - 1 && (
              <div className="md:hidden absolute top-6 left-3 bottom-[-32px] border-l border-[#1a1a1a]" />
            )}

            <div className="md:pr-6 pl-0 md:pl-0">
              <p
                className={`text-[10px] tracking-[0.05em] mb-2 ${
                  step.active ? "text-[#666]" : "text-[#333]"
                }`}
              >
                {step.number}
              </p>
              <p
                className={`text-xs tracking-widest uppercase mb-1 ${
                  step.active ? "text-[#e8e8e8]" : "text-[#666]"
                }`}
              >
                {step.name}
              </p>
              <p
                className={`text-xs leading-relaxed ${
                  step.active ? "text-[#555]" : "text-[#333]"
                }`}
              >
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footnote */}
      <div className="mt-16">
        <p className="text-[#555] text-[10px] tracking-widest uppercase mb-2">
          Shipment: $29.99
        </p>
        <p className="text-[#333] text-[10px] max-w-md leading-relaxed">
          Data is used to improve system performance. Only the storage module is
          returned.
        </p>
      </div>
    </section>
  );
}
