"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function ProductVideo({ label, slideFrom }: { label: string; slideFrom: "left" | "right" }) {
  const [videoError, setVideoError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: slideFrom === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="flex-1 min-w-0"
    >
      <div className="relative bg-[#111] w-full h-[40vh] md:h-[60vh] overflow-hidden flex items-end p-4">
        {!videoError ? (
          <video
            src="/assets/video/product-loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          // Fallback to image if video fails
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/assets/images/product-motion.png"
            alt="Candace AI in motion"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <span className="relative z-10 text-[9px] tracking-[0.35em] text-[#555] uppercase">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

function ProductImage({
  src,
  alt,
  label,
  slideFrom,
}: {
  src: string;
  alt: string;
  label: string;
  slideFrom: "left" | "right";
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: slideFrom === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="flex-1 min-w-0"
    >
      <div className="relative bg-[#111] w-full h-[40vh] md:h-[60vh] overflow-hidden flex items-end p-4">
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : null}
        {/* Label overlay */}
        <span className="relative z-10 text-[9px] tracking-[0.35em] text-[#555] uppercase">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export default function ProductDesign() {
  return (
    <section className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
      {/* Section label */}
      <p className="text-[10px] tracking-widest text-[#555] uppercase mb-2">
        III · FORM
      </p>

      {/* Headline */}
      <h2 className="text-3xl font-light text-white mt-2 mb-12">
        Designed without compromise.
      </h2>

      {/* Two image slots */}
      <div className="flex flex-col md:flex-row gap-3">
        <ProductVideo label="IN MOTION" slideFrom="left" />
        <ProductImage
          src="/assets/images/product-rest.png"
          alt="Candace AI at rest"
          label="AT REST"
          slideFrom="right"
        />
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="text-[#555] text-sm max-w-lg mt-8 italic leading-relaxed"
      >
        Anodized shell. Brushed base. Every surface intentional.
      </motion.p>
    </section>
  );
}
