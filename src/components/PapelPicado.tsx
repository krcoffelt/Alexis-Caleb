import { useId } from "react";

const W = 62;
const H = 78;
const SPAN = 1440;
const STAGE_H = 150;
const colors = ["#b2603f", "#e8d6bf", "#4e9c9a", "#e8d6bf", "#c3a15e", "#e8d6bf"];

// rectangle with a scalloped bottom edge
const outline = `M0 0H${W}V${H - 6}${Array.from({ length: 6 }, (_, i) => {
  const x = W - ((i + 1) * W) / 6;
  return ` A${W / 12} ${W / 12} 0 0 1 ${x.toFixed(2)} ${H - 6}`;
}).join("")}Z`;

const petals = Array.from({ length: 8 }, (_, i) => i * 45);

function Flag({ id, color }: { id: string; color: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-full w-full overflow-visible">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <path d={outline} fill="#fff" />
          <g fill="#000">
            <rect x="0" y="5" width={W} height="1.2" />
            {Array.from({ length: 7 }, (_, i) => (
              <circle key={`l${i}`} cx="4.5" cy={12 + i * 7.5} r="1.3" />
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <circle key={`r${i}`} cx={W - 4.5} cy={12 + i * 7.5} r="1.3" />
            ))}
            <g transform={`translate(${W / 2} 32)`}>
              {petals.map((a) => (
                <path key={a} transform={`rotate(${a})`} d="M0-4C3-7 3-12 0-15-3-12-3-7 0-4z" />
              ))}
              <circle r="2.2" />
            </g>
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
      <rect width={W} height={H} fill={color} fillOpacity=".92" mask={`url(#${id})`} />
    </svg>
  );
}

/**
 * Cut-paper fiesta flags strung across the top of a section. Each flag is its
 * own composited element: a gust travels along the string (phase-offset swing)
 * while each flag lifts and billows from its top edge. Decorative.
 */
export function PapelPicado({ className = "", count = 15 }: { className?: string; count?: number }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const step = SPAN / count;
  const sag = 44;
  const yAt = (x: number) => 8 + (4 * sag * x * (SPAN - x)) / (SPAN * SPAN);

  return (
    <div aria-hidden="true" className={`pointer-events-none relative w-full overflow-hidden ${className}`}>
      <div className="papel-stage relative left-1/2 -translate-x-1/2" style={{ aspectRatio: `${SPAN} / ${STAGE_H}` }}>
        <svg viewBox={`0 0 ${SPAN} ${STAGE_H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path
            d={`M0 8Q${SPAN / 2} ${8 + 2 * sag} ${SPAN} 8`}
            fill="none"
            stroke="#9c7f45"
            strokeOpacity=".55"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {Array.from({ length: count }, (_, i) => {
          const cx = step * (i + 0.5);
          const y = yAt(cx) - 2;
          const tilt = ((cx - SPAN / 2) / SPAN) * 6;
          // the gust travels left → right; slightly different timings keep it organic
          const swingDur = 3.1 + ((i * 37) % 7) * 0.12;
          const flutterDur = 1.35 + ((i * 53) % 5) * 0.11;
          return (
            <div
              key={i}
              className="absolute [perspective:420px]"
              style={{
                left: `${((cx - W / 2) / SPAN) * 100}%`,
                top: `${(y / STAGE_H) * 100}%`,
                width: `${(W / SPAN) * 100}%`,
                height: `${(H / STAGE_H) * 100}%`,
                rotate: `${tilt.toFixed(2)}deg`,
              }}
            >
              <div
                className="papel-swing h-full w-full"
                style={{ animationDuration: `${swingDur.toFixed(2)}s`, animationDelay: `${(-i * 0.22).toFixed(2)}s` }}
              >
                <div
                  className="papel-flutter h-full w-full"
                  style={{ animationDuration: `${flutterDur.toFixed(2)}s`, animationDelay: `${(-i * 0.37).toFixed(2)}s` }}
                >
                  <Flag id={`pp${uid}${i}`} color={colors[i % colors.length]} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
