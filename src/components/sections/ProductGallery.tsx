"use client";

const PRODUCTS: { src: string; name: string; span?: boolean; isVideo?: boolean }[] = [
  { src: "/assets/images/gallery-1.png", name: "CORE ONE", span: true },
  { src: "/assets/images/gallery-2.png", name: "CORE TWO" },
  { src: "/assets/video/gallery-video-1.mp4", name: "AI SHELL", isVideo: true },
  { src: "/assets/images/gallery-4.png", name: "AI WHIRR" },
  { src: "/assets/images/gallery-5.png", name: "SERENE JOINT" },
  { src: "/assets/video/gallery-video-2.mp4", name: "AI RINSE", isVideo: true },
  { src: "/assets/images/gallery-7.png", name: "PROXY 62" },
  { src: "/assets/images/gallery-8.png", name: "COMPANION MODULE I" },
];

export default function ProductGallery() {
  return (
    <section className="bg-[#040404] py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] tracking-[0.3em] text-[#444] uppercase mb-12">
          VIII · PRODUCTS
        </p>

        <h2 className="text-2xl md:text-3xl font-light text-white mb-12">
          A studied collection.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              className={`group${product.span ? " col-span-2" : ""}`}
            >
              <div className="overflow-hidden bg-[#111] group-hover:scale-[1.02] transition-transform duration-700">
                {product.isVideo ? (
                  <video
                    src={product.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-48 md:h-64 object-cover bg-[#111]"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.src}
                    alt={product.name}
                    className="w-full h-48 md:h-64 object-cover bg-[#111]"
                    loading="lazy"
                  />
                )}
              </div>
              <p className="text-[10px] tracking-widest text-[#333] uppercase mt-2">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
