import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="py-32 px-6 md:px-16 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px] pointer-events-none" />

        <p className="text-muted text-[10px] tracking-widest uppercase relative z-10">
          Not tested. Not evaluated.
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold text-foreground mt-3 mb-4 relative z-10">
          Start your <span className="text-accent-soft">evaluation</span>.
        </h2>

        <p className="text-muted text-sm mb-10 max-w-md relative z-10">
          Join the 2026 cohort. Seven days to prove the system works in your home.
        </p>

        <Link href="/access" className="btn-primary relative z-10">
          Request Access
        </Link>
      </div>

      <div className="border-t border-border mx-6 md:mx-16" />

      <div className="px-6 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] tracking-widest text-muted uppercase font-medium">
          Candace AI
        </p>
        <p className="text-[10px] text-muted/60 max-w-xs text-center leading-relaxed">
          Data is used to improve system performance. Only the storage module is
          returned.
        </p>
        <p className="text-[10px] text-muted/60">© 2026</p>
      </div>
    </footer>
  );
}
