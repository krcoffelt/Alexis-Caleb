const W = 1440;

/** A sine-ish wave spanning two widths so it can drift seamlessly. */
function wavePath(y: number, amp: number, period: number, h: number) {
  let d = `M0 ${h}L0 ${y}`;
  d += `Q${period / 4} ${y - amp} ${period / 2} ${y}`;
  for (let x = period; x <= W * 2; x += period / 2) d += `T${x} ${y}`;
  return `${d}L${W * 2} ${h}Z`;
}

/**
 * Layered, slowly drifting waves used as a section edge. `fill` should match
 * the section the waves lead into; the back layers are sea-glass tints.
 */
export function Waves({
  fill = "var(--color-paper)",
  flip = false,
  className = "",
  height = 120,
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
  height?: number;
}) {
  const h = height;
  return (
    <svg
      viewBox={`0 0 ${W} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none block w-full ${flip ? "-mt-px rotate-180" : "-mb-px"} ${className}`}
      style={{ height: `clamp(${Math.round(h * 0.55)}px, ${((h / W) * 100).toFixed(2)}vw, ${h}px)` }}
    >
      <g className="wave-drift" style={{ animationDuration: "26s" }}>
        <path d={wavePath(h * 0.36, h * 0.2, 720, h)} fill="#8fc7c1" fillOpacity=".45" />
      </g>
      <g className="wave-drift" style={{ animationDuration: "19s", animationDirection: "reverse" }}>
        <path d={wavePath(h * 0.52, h * 0.17, 480, h)} fill="#4e9c9a" fillOpacity=".35" />
      </g>
      <g className="wave-drift" style={{ animationDuration: "32s" }}>
        <path d={wavePath(h * 0.68, h * 0.16, 720, h)} fill={fill} />
      </g>
    </svg>
  );
}
