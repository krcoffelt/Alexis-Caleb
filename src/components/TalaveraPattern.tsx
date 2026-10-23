import { useId } from "react";

const petals = Array.from({ length: 8 }, (_, i) => i * 45);

/**
 * <pattern> for a line-drawn tile inspired by Talavera ceramics. Use inside
 * any <svg><defs>. `fill` tints the petals for richer surfaces (e.g. the
 * envelope liner).
 */
export function TalaveraTileDef({
  id,
  color = "#b89b62",
  fill,
  tile = 240,
  strokeWidth = 1.1,
}: {
  id: string;
  color?: string;
  fill?: string;
  tile?: number;
  strokeWidth?: number;
}) {
  const f = fill ?? "none";
  return (
    <pattern id={id} width={tile} height={tile} patternUnits="userSpaceOnUse" viewBox="0 0 200 200">
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* centre flower */}
        <g transform="translate(100 100)">
          <circle r="58" strokeDasharray="0.1 5.5" strokeWidth={strokeWidth * 1.6} />
          <circle r="50" strokeOpacity=".5" />
          {petals.map((a) => (
            <path key={a} transform={`rotate(${a})`} fill={f} d="M0-12C10-20 11-36 0-46-11-36-10-20 0-12z" />
          ))}
          {petals.map((a) => (
            <path key={`i${a}`} transform={`rotate(${a + 22.5})`} d="M0-14C4-20 4-27 0-31-4-27-4-20 0-14z" />
          ))}
          {petals.map((a) => (
            <circle key={`d${a}`} transform={`rotate(${a + 22.5})`} cy="-38" r="1.6" fill={color} stroke="none" />
          ))}
          <circle r="9" fill={f} />
          <circle r="3.5" fill={color} stroke="none" />
        </g>
        {/* corner quarter-rosettes join into full rosettes across tiles */}
        {[
          [0, 0],
          [200, 0],
          [0, 200],
          [200, 200],
        ].map(([x, y]) => (
          <g key={`${x}${y}`} transform={`translate(${x} ${y})`}>
            <circle r="24" />
            <circle r="15" fill={f} />
            <circle r="5" fill={color} stroke="none" />
            {petals.map((a) => (
              <path key={a} transform={`rotate(${a})`} fill={f} d="M0-24C5-29 5-35 0-39-5-35-5-29 0-24z" />
            ))}
          </g>
        ))}
        {/* edge sprigs linking the rosettes */}
        {[
          [100, 0, 0],
          [100, 200, 180],
          [0, 100, 270],
          [200, 100, 90],
        ].map(([x, y, r]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-26 0C-18 12-8 16 0 16S18 12 26 0" />
            <path d="M0 16v10" />
            <path fill={f} d="M0 26c-6-1-10 2-12 6 5 1 9-1 12-6zM0 26c6-1 10 2 12 6-5 1-9-1-12-6z" />
          </g>
        ))}
      </g>
    </pattern>
  );
}

/** Full-bleed decorative tile background. */
export function TalaveraPattern({
  className = "",
  color = "#b89b62",
  fill,
  tile = 240,
}: {
  className?: string;
  color?: string;
  fill?: string;
  tile?: number;
}) {
  const id = `t${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <TalaveraTileDef id={id} color={color} fill={fill} tile={tile} />
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
