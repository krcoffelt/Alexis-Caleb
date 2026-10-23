const W = 1440;

/** A sine-ish wave spanning two widths so it can drift seamlessly. */
function wavePath(y: number, amp: number, period: number, h: number) {
  let d = `M0 ${h}L0 ${y}`;
  d += `Q${period / 4} ${y - amp} ${period / 2} ${y}`;
  for (let x = period; x <= W * 2; x += period / 2) d += `T${x} ${y}`;
  return `${d}L${W * 2} ${h}Z`;
}

const layers = [
  { y: 0.36, amp: 0.2, period: 720, fill: "#8fc7c1", opacity: 0.45, dur: "26s", reverse: false },
  { y: 0.52, amp: 0.17, period: 480, fill: "#4e9c9a", opacity: 0.35, dur: "19s", reverse: true },
  { y: 0.68, amp: 0.16, period: 720, fill: "", opacity: 1, dur: "32s", reverse: false },
];

/**
 * Layered, slowly drifting waves used as a section edge. `fill` should match
 * the section the waves lead into; the back layers are sea-glass tints.
 * Each layer is its own double-width <svg> moved with a GPU transform, so the
 * drift never repaints (smooth on phones).
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
    <div
      aria-hidden="true"
      className={`pointer-events-none relative w-full overflow-hidden ${flip ? "-mt-px rotate-180" : "-mb-px"} ${className}`}
      style={{ height: `clamp(${Math.round(h * 0.55)}px, ${((h / W) * 100).toFixed(2)}vw, ${h}px)` }}
    >
      {layers.map((l, i) => (
        <svg
          key={i}
          viewBox={`0 0 ${W * 2} ${h}`}
          preserveAspectRatio="none"
          className="wave-drift absolute inset-y-0 left-0 h-full w-[200%]"
          style={{ animationDuration: l.dur, animationDirection: l.reverse ? "reverse" : "normal" }}
        >
          <path d={wavePath(h * l.y, h * l.amp, l.period, h)} fill={l.fill || fill} fillOpacity={l.opacity} />
        </svg>
      ))}
    </div>
  );
}
