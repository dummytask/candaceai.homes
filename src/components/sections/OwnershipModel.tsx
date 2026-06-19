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
  return (
    <section id="ownership" className="py-32 px-6 md:px-16 max-w-6xl mx-auto">
      <p className="section-label mb-12">VII · Ownership</p>

      <h2 className="section-heading">
        A system that improves with <span className="text-accent-soft">you</span>.
      </h2>
      <p className="text-muted text-sm mt-3 mb-16">The trial is the proof.</p>

      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-0">
        {STEPS.map((step, i) => (
          <div key={step.number} className="relative flex-1">
            {i < STEPS.length - 1 && (
              <div className="hidden md:block absolute top-5 left-[calc(50%+20px)] right-0 border-t border-border" />
            )}

            {i < STEPS.length - 1 && (
              <div className="md:hidden absolute top-5 left-5 bottom-[-32px] border-l border-border" />
            )}

            <div className="md:pr-6 flex gap-4 md:flex-col md:gap-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[10px] font-mono font-medium mb-0 md:mb-4 ${
                  step.active
                    ? "bg-accent text-background"
                    : "bg-background-card border border-border text-muted"
                }`}
                style={
                  step.active
                    ? { boxShadow: "0 0 20px var(--accent-glow)" }
                    : undefined
                }
              >
                {step.number}
              </div>
              <div>
                <p
                  className={`text-xs tracking-widest uppercase mb-1 font-medium ${
                    step.active ? "text-foreground" : "text-muted"
                  }`}
                >
                  {step.name}
                </p>
                <p
                  className={`text-xs leading-relaxed ${
                    step.active ? "text-muted" : "text-muted/60"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 card-surface p-6 max-w-md">
        <p className="text-accent-soft text-sm font-medium mb-1">Shipment: $29.99</p>
        <p className="text-muted text-xs leading-relaxed">
          Data is used to improve system performance. Only the storage module is
          returned.
        </p>
      </div>
    </section>
  );
}
