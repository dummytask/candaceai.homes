import ZoomImage from "@/components/ZoomImage";

const PRODUCTS: { src: string; name: string; span?: boolean; direction?: "in" | "out" }[] = [
  { src: "/assets/images/gallery-1.png", name: "CORE ONE", span: true, direction: "in" },
  { src: "/assets/images/gallery-2.png", name: "CORE TWO", direction: "out" },
  { src: "/assets/images/gallery-3.png", name: "AI SHELL", direction: "in" },
  { src: "/assets/images/gallery-4.png", name: "AI WHIRR", direction: "out" },
  { src: "/assets/images/gallery-5.png", name: "SERENE JOINT", direction: "in" },
  { src: "/assets/images/gallery-6.png", name: "AI RINSE", direction: "out" },
  { src: "/assets/images/gallery-7.png", name: "PROXY 62", direction: "in" },
  { src: "/assets/images/gallery-8.png", name: "COMPANION MODULE I", direction: "out" },
];

export default function ProductGallery() {
  return (
    <section className="bg-background-elevated py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <p className="section-label mb-12">VIII · Products</p>

        <h2 className="section-heading mb-12">
          A studied <span className="text-accent-soft">collection</span>.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              className={`group${product.span ? " col-span-2" : ""}`}
            >
              <div className="overflow-hidden rounded-xl border border-border bg-background-card group-hover:border-accent/30 transition-colors duration-500">
                <ZoomImage
                  src={product.src}
                  alt={product.name}
                  className="w-full h-48 md:h-64"
                  direction={product.direction}
                  duration={18}
                />
              </div>
              <p className="text-[10px] tracking-widest text-muted uppercase mt-3 group-hover:text-accent-soft transition-colors duration-300">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
