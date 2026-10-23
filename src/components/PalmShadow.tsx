/**
 * Soft, blurred palm-frond shadows — sunlight through palms falling across
 * the paper. Procedurally drawn so no image is needed. Decorative.
 */

type Frond = { x: number; y: number; angle: number; length: number; bend: number };

function frondPath({ x, y, angle, length, bend }: Frond) {
  const a = (angle * Math.PI) / 180;
  // quadratic rachis: start -> control -> tip
  const tx = x + Math.cos(a) * length;
  const ty = y + Math.sin(a) * length;
  const cx = x + Math.cos(a) * length * 0.5 - Math.sin(a) * bend;
  const cy = y + Math.sin(a) * length * 0.5 + Math.cos(a) * bend;
  const pt = (t: number) => [
    (1 - t) ** 2 * x + 2 * (1 - t) * t * cx + t * t * tx,
    (1 - t) ** 2 * y + 2 * (1 - t) * t * cy + t * t * ty,
  ];
  const tan = (t: number) => {
    const dx = 2 * (1 - t) * (cx - x) + 2 * t * (tx - cx);
    const dy = 2 * (1 - t) * (cy - y) + 2 * t * (ty - cy);
    const l = Math.hypot(dx, dy) || 1;
    return [dx / l, dy / l];
  };
  let d = `M${x} ${y}Q${cx} ${cy} ${tx} ${ty}`;
  const n = 30;
  for (let i = 2; i < n; i++) {
    const t = i / n;
    const [px, py] = pt(t);
    const [ux, uy] = tan(t);
    const leaf = length * 0.5 * Math.sin(Math.PI * Math.min(1, t * 1.1)) + length * 0.05;
    for (const side of [-1, 1]) {
      // leaflets sweep forward ~55° and droop slightly
      const ang = side * 0.95;
      const lx = ux * Math.cos(ang) - uy * Math.sin(ang);
      const ly = ux * Math.sin(ang) + uy * Math.cos(ang);
      const ex = px + lx * leaf + ux * leaf * 0.25;
      const ey = py + ly * leaf + uy * leaf * 0.25 + leaf * 0.12;
      const w = Math.max(1.6, leaf * 0.045);
      const nx = -ly * w;
      const ny = lx * w;
      d += `M${px.toFixed(1)} ${py.toFixed(1)}Q${(px + (ex - px) * 0.5 + nx).toFixed(1)} ${(py + (ey - py) * 0.5 + ny).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}Q${(px + (ex - px) * 0.5 - nx).toFixed(1)} ${(py + (ey - py) * 0.5 - ny).toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)}Z`;
    }
  }
  return d;
}

const fronds: Frond[] = [
  { x: 640, y: -40, angle: 150, length: 520, bend: -60 },
  { x: 640, y: -40, angle: 118, length: 460, bend: 50 },
  { x: 640, y: -40, angle: 175, length: 420, bend: -30 },
  { x: 640, y: -40, angle: 95, length: 360, bend: 40 },
];

export function PalmShadow({ className = "", mirror = false }: { className?: string; mirror?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ transform: mirror ? "scaleX(-1)" : undefined }}
    >
      <svg viewBox="0 0 640 560" className="palm-sway h-full w-full overflow-visible">
        <g fill="#6b5640" stroke="#6b5640" strokeWidth="1" opacity=".05">
          {fronds.map((f, i) => (
            <path key={i} d={frondPath(f)} />
          ))}
        </g>
      </svg>
    </div>
  );
}
