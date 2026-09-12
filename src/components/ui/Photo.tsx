import { asset } from "@/lib/basePath";

/*
 * Every photo in public/img is exported at two widths, `name-<w>.webp`. This
 * builds the srcset from that convention so callers name the picture once and
 * phones stop downloading 1600px files.
 *
 * next/image is bypassed deliberately: the site is a static export with
 * images.unoptimized, so it would add a wrapper and a client bundle for markup
 * we can write exactly.
 */
export function Photo({
  name,
  alt,
  widths,
  sizes,
  className = "",
  priority = false,
  width,
  height,
}: {
  name: string;
  alt: string;
  /** Exported widths, smallest first — must match what scripts/img produced. */
  widths: [number, number];
  sizes: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  const [small, large] = widths;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(`/img/${name}-${large}.webp`)}
      srcSet={`${asset(`/img/${name}-${small}.webp`)} ${small}w, ${asset(
        `/img/${name}-${large}.webp`
      )} ${large}w`}
      sizes={sizes}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      // The hero is the LCP element; everything else can wait its turn.
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
    />
  );
}
