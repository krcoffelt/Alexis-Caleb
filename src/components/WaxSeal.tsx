import type { Icon } from "@phosphor-icons/react";
import { useId } from "react";
import { CA_PATH } from "./ca-path";

type Tone = "clay" | "gold";

const tones: Record<Tone, { hi: string; mid: string; lo: string; deep: string; spec: string }> = {
  clay: { hi: "#d38a66", mid: "#b2603f", lo: "#86402a", deep: "#4f1f13", spec: "#ffe6d6" },
  gold: { hi: "#f1dca2", mid: "#c9a65d", lo: "#8e6c2e", deep: "#4f3a14", spec: "#fffaea" },
};

// A ring of tiny beads pressed around the stamp face
const beads = Array.from({ length: 28 }, (_, i) => {
  const a = (i / 28) * Math.PI * 2;
  return [+(50 + Math.cos(a) * 31.5).toFixed(2), +(50 + Math.sin(a) * 31.5).toFixed(2)];
});

/**
 * A poured-and-pressed wax seal: displaced organic rim with diffuse and
 * specular lighting, a debossed stamp face, bead ring and a CA (or icon)
 * impression. Decorative — always hidden from assistive tech.
 */
export function WaxSeal({
  size = 64,
  tone = "gold",
  icon: IconCmp,
  seed = 3,
  drips = true,
  className = "",
}: {
  size?: number;
  tone?: Tone;
  icon?: Icon;
  seed?: number;
  /** off for seals that must read as perfectly centred */
  drips?: boolean;
  className?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const t = tones[tone];
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      className={`overflow-visible ${className}`}
      style={{ filter: "drop-shadow(0 2px 1.5px rgba(60,20,10,.3)) drop-shadow(0 9px 12px rgba(60,20,10,.18))" }}
    >
      <defs>
        <radialGradient id={`g${id}`} cx="38%" cy="32%" r="78%">
          <stop offset="0%" stopColor={t.hi} />
          <stop offset="55%" stopColor={t.mid} />
          <stop offset="100%" stopColor={t.lo} />
        </radialGradient>
        <radialGradient id={`f${id}`} cx="58%" cy="62%" r="70%">
          <stop offset="0%" stopColor={t.mid} />
          <stop offset="100%" stopColor={t.lo} />
        </radialGradient>
        {/* raised, glossy rim */}
        <filter id={`w${id}`} x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="2.4" result="b" />
          <feDiffuseLighting in="b" surfaceScale="4" diffuseConstant="1.05" lightingColor="#fff" result="diff">
            <feDistantLight azimuth="235" elevation="58" />
          </feDiffuseLighting>
          <feComposite in="diff" in2="d" operator="in" result="diffIn" />
          <feBlend in="d" in2="diffIn" mode="multiply" result="shaded" />
          <feSpecularLighting in="b" surfaceScale="4" specularConstant="0.85" specularExponent="24" lightingColor={t.spec} result="spec">
            <feDistantLight azimuth="235" elevation="48" />
          </feSpecularLighting>
          <feComposite in="spec" in2="d" operator="in" result="specIn" />
          <feComposite in="specIn" in2="shaded" operator="arithmetic" k2="0.6" k3="1" />
        </filter>
        {/* pressed-in face: inner shadow top-left, soft highlight bottom-right */}
        <filter id={`p${id}`} x="-10%" y="-10%" width="120%" height="120%">
          <feOffset in="SourceAlpha" dx="1.6" dy="1.8" />
          <feGaussianBlur stdDeviation="1.6" result="o" />
          <feComposite in="SourceAlpha" in2="o" operator="arithmetic" k2="1" k3="-1" result="edge" />
          <feFlood floodColor={t.deep} floodOpacity="0.75" />
          <feComposite in2="edge" operator="in" result="shadow" />
          <feOffset in="SourceAlpha" dx="-1.2" dy="-1.2" />
          <feGaussianBlur stdDeviation="1.2" result="o2" />
          <feComposite in="SourceAlpha" in2="o2" operator="arithmetic" k2="1" k3="-1" result="edge2" />
          <feFlood floodColor={t.spec} floodOpacity="0.35" />
          <feComposite in2="edge2" operator="in" result="hl" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="shadow" />
            <feMergeNode in="hl" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#w${id})`}>
        <circle cx="50" cy="50" r="44" fill={`url(#g${id})`} />
        {/* a few drips of poured wax */}
        {drips && (
          <>
            <circle cx="86" cy="62" r="7" fill={t.mid} />
            <circle cx="20" cy="82" r="6" fill={t.mid} />
            <circle cx="62" cy="10" r="5" fill={t.hi} />
          </>
        )}
      </g>

      <g filter={`url(#p${id})`}>
        <circle cx="50" cy="50" r="34" fill={`url(#f${id})`} />
      </g>
      <g fill={t.hi} opacity=".7">
        {beads.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r=".95" />
        ))}
      </g>
      <circle cx="50" cy="50" r="28.5" fill="none" stroke={t.deep} strokeOpacity=".35" strokeWidth=".7" />

      {/* debossed impression: dark lip above-left, light lip below-right */}
      {IconCmp ? (
        <g>
          <IconCmp x={33.6} y={33.6} width={35} height={35} weight="regular" color={t.spec} opacity={0.45} />
          <IconCmp x={32.5} y={32.5} width={35} height={35} weight="regular" color={t.deep} opacity={0.85} />
        </g>
      ) : (
        <g>
          <path d={CA_PATH} transform="translate(30.9 39.4) scale(0.0472)" fill={t.spec} fillOpacity=".45" fillRule="evenodd" />
          <path d={CA_PATH} transform="translate(30 38.5) scale(0.0472)" fill={t.deep} fillOpacity=".85" fillRule="evenodd" />
        </g>
      )}
    </svg>
  );
}

/** Weddingly's four-point sparkle, used on timelines and dividers. */
export function Sparkle({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden="true" className={className}>
      <path d="M10 0c.6 5 4.4 9.4 10 10-5.6.6-9.4 5-10 10-.6-5-4.4-9.4-10-10C5.6 9.4 9.4 5 10 0z" fill="currentColor" />
    </svg>
  );
}
