import { useId } from "react";

const W = 62;
const H = 78;
const colors = ["#b2603f", "#e8d6bf", "#4e9c9a", "#e8d6bf", "#c3a15e", "#e8d6bf"];

// rectangle with a scalloped bottom edge
const outline = `M0 0H${W}V${H - 6}${Array.from({ length: 6 }, (_, i) => {
  const x = W - ((i + 1) * W) / 6;
  return ` A${W / 12} ${W / 12} 0 0 1 ${x.toFixed(2)} ${H - 6}`;
}).join("")}Z`;

const petals = Array.from({ length: 8 }, (_, i) => i * 45);

/** Cut-paper fiesta flags strung across the top of a section. Decorative. */
export function PapelPicado({ className = "", count = 15 }: { className?: string; count?: number }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const span = 1440;
  const step = span / count;
  const sag = 44;
  const yAt = (x: number) => 8 + (4 * sag * x * (span - x)) / (span * span);

  return (
    <svg
      viewBox={`0 0 ${span} 150`}
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
      className={`pointer-events-none block h-[96px] w-full sm:h-[150px] ${className}`}
    >
      <defs>
        <mask id={`m${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <path d={outline} fill="#fff" />
          <g fill="#000">
            {/* fold band */}
            <rect x="0" y="5" width={W} height="1.2" />
            {/* border dots */}
            {Array.from({ length: 7 }, (_, i) => (
              <circle key={`l${i}`} cx="4.5" cy={12 + i * 7.5} r="1.3" />
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <circle key={`r${i}`} cx={W - 4.5} cy={12 + i * 7.5} r="1.3" />
            ))}
            {/* centre flower */}
            <g transform={`translate(${W / 2} 32)`}>
              {petals.map((a) => (
                <path key={a} transform={`rotate(${a})`} d="M0-4C3-7 3-12 0-15-3-12-3-7 0-4z" />
              ))}
              <circle r="2.2" />
            </g>
            {/* diamonds and triangles */}
            {[13, W - 13].map((x) => (
              <path key={x} d={`M${x} 10l3 4.5-3 4.5-3-4.5z`} />
            ))}
            {[13, W - 13].map((x) => (
              <path key={`b${x}`} d={`M${x} 48l3 4.5-3 4.5-3-4.5z`} />
            ))}
            {Array.from({ length: 5 }, (_, i) => (
              <path key={`t${i}`} d={`M${9 + i * 10} 61l3.2 4.5h-6.4z`} />
            ))}
          </g>
        </mask>
      </defs>
      <path
        d={`M0 8Q${span / 2} ${8 + 2 * sag} ${span} 8`}
        fill="none"
        stroke="#9c7f45"
        strokeOpacity=".55"
        strokeWidth="1.2"
      />
      {Array.from({ length: count }, (_, i) => {
        const cx = step * (i + 0.5);
        const y = yAt(cx);
        const tilt = ((cx - span / 2) / span) * 6;
        return (
          <g key={i} transform={`translate(${cx - W / 2} ${y - 2}) rotate(${tilt.toFixed(2)} ${W / 2} 0)`}>
            <g className="papel-flag" style={{ animationDelay: `${(i % 5) * -0.7}s` }}>
              <rect width={W} height={H} fill={colors[i % colors.length]} fillOpacity=".92" mask={`url(#m${id})`} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
