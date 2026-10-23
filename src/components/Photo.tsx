import Image, { type ImageProps } from "next/image";
import couplePhotos from "@/content/photos.generated.json";
import stockPhotos from "@/content/stock-photos.json";

const photos = { ...couplePhotos, ...stockPhotos };

export type PhotoSlug = keyof typeof photos;

type Props = Omit<ImageProps, "src" | "width" | "height" | "alt"> & {
  slug: string;
  alt: string;
  /** fill the parent (parent must be positioned) */
  fill?: boolean;
};

export function Photo({ slug, alt, fill, sizes, className, ...rest }: Props) {
  const p = photos[slug as PhotoSlug];
  if (!p) throw new Error(`Unknown photo slug: ${slug}`);
  if (fill) {
    return <Image src={p.src} alt={alt} fill sizes={sizes ?? "100vw"} className={className} {...rest} />;
  }
  return (
    <Image src={p.src} alt={alt} width={p.width} height={p.height} sizes={sizes ?? "100vw"} className={className} {...rest} />
  );
}

export function photoRatio(slug: string) {
  const p = photos[slug as PhotoSlug];
  return p ? p.width / p.height : 1;
}
