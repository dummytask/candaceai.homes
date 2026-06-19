import Link from "next/link";
import ZoomImage from "@/components/ZoomImage";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <ZoomImage
          src="/assets/images/hero-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full"
          imageClassName="opacity-80"
          duration={18}
          loading="eager"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 pt-32 pb-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="text-left">
          <p className="section-label mb-6">A Private Technology</p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground max-w-xl leading-[1.1]">
            Intelligence,{" "}
            <span className="text-accent-soft">trained</span> in your home
          </h1>

          <p className="text-muted text-base md:text-lg mt-5 max-w-md leading-relaxed">
            Seven days. One system. Yours to keep.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/access" className="btn-primary">
              Request Access
            </Link>
            <a href="#capabilities" className="btn-outline">
              Explore Systems
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="glow-blue w-full max-w-md aspect-square relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-background-card to-background-elevated border border-border overflow-hidden">
              <ZoomImage
                src="/assets/images/product-rest.png"
                alt="Candace AI device"
                className="absolute inset-0 w-full h-full"
                imageClassName="opacity-90"
                direction="out"
                duration={16}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-muted/60 text-[9px] tracking-[0.4em] uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent animate-scroll-bounce" />
      </div>
    </section>
  );
}
