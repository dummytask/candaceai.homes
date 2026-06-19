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
      <p className="section-label mb-2">IV · Standards</p>

      <h2 className="section-heading mt-2 mb-12">
        Built to the highest <span className="text-accent-soft">standard</span>.
      </h2>

      <div className="flex flex-wrap gap-3">
        {badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-border bg-background-card text-muted text-[10px] tracking-widest uppercase px-5 py-2.5 hover:border-accent/40 hover:text-accent-soft transition-colors duration-300"
          >
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
}
