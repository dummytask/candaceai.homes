type ZoomImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  direction?: "in" | "out";
  duration?: number;
  loading?: "lazy" | "eager";
};

export default function ZoomImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  direction = "in",
  duration = 14,
  loading = "lazy",
}: ZoomImageProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`w-full h-full object-cover ${
          direction === "out" ? "animate-zoom-out" : "animate-zoom-in"
        } ${imageClassName}`}
        style={{ animationDuration: `${duration}s` }}
      />
    </div>
  );
}
