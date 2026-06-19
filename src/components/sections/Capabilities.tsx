const capabilities = [
  {
    number: "01",
    name: "Spatial Mapping",
    description: "LiDAR-class room understanding",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path d="M3 12h4l3-9 4 18 3-9h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    name: "Adaptive Learning",
    description: "Path refinement, error prevention",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    name: "Silent Operation",
    description: "48 dB acoustic performance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.54 8.46a5 5 0 010 7.07" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "04",
    name: "Sealed Architecture",
    description: "Enclosed sensor and storage modules",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "05",
    name: "Edge Processing",
    description: "On-device inference. No external data transmission",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6v6H9z" />
      </svg>
    ),
  },
  {
    number: "06",
    name: "Self-Diagnostic",
    description: "Wear detection before failure",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <p className="section-label mb-2">II · Systems</p>

      <h2 className="section-heading mt-2 mb-4">
        Six core <span className="text-accent-soft">systems</span>.
      </h2>
      <p className="text-muted text-sm max-w-lg mb-16 leading-relaxed">
        Every subsystem engineered for precision, privacy, and silent operation in your home.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {capabilities.map((cap) => (
          <div
            key={cap.number}
            className="card-surface p-6 flex flex-col gap-4 hover:border-accent/30 transition-colors duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent-soft group-hover:bg-accent/25 transition-colors duration-300">
                {cap.icon}
              </div>
              <span className="text-[10px] text-muted/60 font-mono">{cap.number}</span>
            </div>
            <p className="text-sm font-medium text-foreground leading-snug">{cap.name}</p>
            <p className="text-xs text-muted leading-relaxed">{cap.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
