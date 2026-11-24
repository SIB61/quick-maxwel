/** The PortfoliooSite logo mark (same artwork as the favicon: /logo.svg). */
export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    // A plain <img>: the mark is a small static SVG, so optimization adds nothing.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      alt=""
      aria-hidden="true"
      width={64}
      height={64}
      className={`shrink-0 transition-transform group-hover:scale-105 ${className}`}
    />
  );
}
