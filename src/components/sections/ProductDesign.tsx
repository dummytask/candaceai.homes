import ZoomImage from "@/components/ZoomImage";

function ProductFrame({
  src,
  alt,
  label,
  direction = "in" as const,
}: {
  src: string;
  alt: string;
  label: string;
  direction?: "in" | "out";
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="relative glow-blue rounded-2xl border border-border bg-background-card w-full h-[40vh] md:h-[60vh] overflow-hidden flex items-end p-5">
        <ZoomImage
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full"
          direction={direction}
          duration={16}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
        <span className="relative z-10 text-[9px] tracking-[0.35em] text-accent uppercase font-medium">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function ProductDesign() {
  return (
    <section id="design" className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <p className="section-label mb-2">III · Form</p>

      <h2 className="section-heading mt-2 mb-4">
        Designed without <span className="text-accent-soft">compromise</span>.
      </h2>
      <p className="text-muted text-sm max-w-lg mb-12 leading-relaxed">
        Anodized shell. Brushed base. Every surface intentional.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <ProductFrame
          src="/assets/images/product-motion.png"
          alt="Candace AI in motion"
          label="In Motion"
          direction="in"
        />
        <ProductFrame
          src="/assets/images/product-rest.png"
          alt="Candace AI at rest"
          label="At Rest"
          direction="out"
        />
      </div>
    </section>
  );
}
