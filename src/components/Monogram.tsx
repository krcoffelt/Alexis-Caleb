import { site } from "@/content/site";
import { CA_PATH, CA_RATIO, CA_VIEWBOX } from "./ca-path";

type Props = {
  /** Height of the CA mark (any CSS length) */
  size?: string;
  subtitle?: boolean;
  className?: string;
  /** decorative copies (nav, seals) are hidden from assistive tech */
  decorative?: boolean;
};

/**
 * The couple's CA identity, traced from their Joy site: overlapping C and A
 * with "CALEB & ALEXIS" in Reem Kufi beneath, in Joy's proportions.
 */
export function Monogram({ size = "6rem", subtitle = false, className = "", decorative = false }: Props) {
  return (
    <span
      className={`inline-flex flex-col items-center leading-none ${className}`}
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : `CA monogram, ${site.couple.monogramSubtitle}`}
    >
      <svg viewBox={CA_VIEWBOX} style={{ height: size, width: `calc(${size} * ${CA_RATIO})` }} aria-hidden="true">
        <path d={CA_PATH} fill="currentColor" fillRule="evenodd" />
      </svg>
      {subtitle && (
        <span
          className="font-kufi whitespace-nowrap uppercase"
          style={{ fontSize: `calc(${size} * 0.155)`, letterSpacing: "0.1em", marginTop: `calc(${size} * 0.2)` }}
        >
          {site.couple.monogramSubtitle}
        </span>
      )}
    </span>
  );
}
