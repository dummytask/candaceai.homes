import ZoomImage from "@/components/ZoomImage";

export default function ScrollCinematic() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <ZoomImage
          src="/assets/images/product-motion.png"
          alt="Candace AI intelligence in action"
          className="absolute inset-0 w-full h-full"
          imageClassName="opacity-60"
          duration={20}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <p className="absolute top-8 left-8 md:left-16 z-20 section-label">
        V · Intelligence
      </p>

      <div className="relative z-10 w-full max-w-4xl px-6 h-48 md:h-56 flex items-center justify-center">
        <p className="absolute text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground text-center leading-tight tracking-tight headline-cycle headline-cycle-1">
          Every cycle,
          <br />
          <span className="text-accent-soft">learned</span>.
        </p>
        <p className="absolute text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground text-center leading-tight tracking-tight headline-cycle headline-cycle-2">
          Every load,
          <br />
          <span className="text-accent-soft">optimised</span>.
        </p>
        <p className="absolute text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground text-center leading-tight tracking-tight headline-cycle headline-cycle-3">
          Your kitchen.
          <br />
          <span className="text-accent-soft">Understood</span>.
        </p>
      </div>
    </section>
  );
}
