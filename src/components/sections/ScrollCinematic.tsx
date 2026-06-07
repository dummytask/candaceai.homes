"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function ScrollCinematic() {
  const outerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({ target: outerRef });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (video && video.duration && isFinite(video.duration)) {
      video.currentTime = progress * video.duration;
    }
  });

  // Opacity for each text overlay
  const opacity1 = useTransform(scrollYProgress, [0.02, 0.1, 0.28, 0.35], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.36, 0.44, 0.60, 0.67], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.68, 0.76, 0.92, 0.98], [0, 1, 1, 0]);

  // Subtle upward parallax for each overlay
  const y1 = useTransform(scrollYProgress, [0, 0.35], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0.36, 0.67], [30, -30]);
  const y3 = useTransform(scrollYProgress, [0.68, 1], [30, -30]);

  // Section label opacity
  const labelOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div ref={outerRef} style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#040404]">
        {/* Video */}
        <video
          ref={videoRef}
          src="/assets/video/scroll-cinematic.mp4"
          preload="auto"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

        {/* Section label */}
        <motion.div
          style={{ opacity: labelOpacity }}
          className="absolute top-8 left-8 md:left-16 z-20 text-[10px] tracking-[0.3em] text-[#444] uppercase"
        >
          V · INTELLIGENCE
        </motion.div>

        {/* Text overlay 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <p
            className="text-5xl md:text-7xl font-light text-white text-center leading-tight tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Every cycle,
            <br />
            learned.
          </p>
        </motion.div>

        {/* Text overlay 2 */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <p
            className="text-5xl md:text-7xl font-light text-white text-center leading-tight tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Every load,
            <br />
            optimised.
          </p>
        </motion.div>

        {/* Text overlay 3 */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <p
            className="text-5xl md:text-7xl font-light text-white text-center leading-tight tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Your kitchen.
            <br />
            Understood.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
