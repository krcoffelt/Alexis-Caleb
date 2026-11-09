const W = 1440;
const H = 120;

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
];

/** Height used by every wave edge (and the matching media mask). */
export const WAVE_HEIGHT = `clamp(${Math.round(H * 0.55)}px, ${((H / W) * 100).toFixed(2)}vw, ${H}px)`;

/**
 * Translucent sea-glass waves drifting along a section edge. They sit over
 * the section's media; pair with `waveMask()` on that media so the page's
 * own (water) background shows above the wave line instead of a solid band.
 * Each layer is a double-width <svg> moved with a GPU transform.
 */
export function Waves({
  flip = false,
  fill,
  className = "",
}: {
  flip?: boolean;
  /** optional solid front layer, for edges that meet a solid section (e.g. the footer) */
  fill?: string;
  className?: string;
}) {
  const all = fill
    ? [...layers, { y: 0.68, amp: 0.16, period: 720, fill, opacity: 1, dur: "32s", reverse: false }]
    : layers;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative w-full overflow-hidden ${flip ? "rotate-180" : ""} ${className}`}
      style={{
        height: WAVE_HEIGHT,
        // translucent layers dissolve into the page's water instead of ending in a hard line
        ...(fill
          ? {}
          : {
              maskImage: "linear-gradient(to bottom, #000 45%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 45%, transparent 100%)",
            }),
      }}
    >
      {all.map((l, i) => (
        <svg
          key={i}
          viewBox={`0 0 ${W * 2} ${H}`}
          preserveAspectRatio="none"
          className="wave-drift absolute inset-y-0 left-0 h-full w-[200%]"
          style={{ animationDuration: l.dur, animationDirection: l.reverse ? "reverse" : "normal" }}
        >
          <path d={wavePath(H * l.y, H * l.amp, l.period, H)} fill={l.fill} fillOpacity={l.opacity} />
        </svg>
      ))}
    </div>
  );
}

/** One wave edge as an SVG mask: opaque on the media side of the curve. */
function edgeSvg(side: "top" | "bottom") {
  const y = side === "top" ? H * 0.34 : H * 0.66;
  const amp = (side === "top" ? -1 : 1) * H * 0.15;
  let d = `M0 ${side === "top" ? H : 0}L0 ${y}Q180 ${y - amp} 360 ${y}`;
  for (let x = 720; x <= W; x += 360) d += `T${x} ${y}`;
  d += `L${W} ${side === "top" ? H : 0}Z`;
  return `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${W} ${H}' preserveAspectRatio='none'><path d='${d}' fill='#000'/></svg>`,
  )}")`;
}

/**
 * Mask for a section's background media so its top and/or bottom edge is a
 * wave: everything outside the curve is transparent and the page's water
 * background shows through.
 */
export function waveMask(edges: { top?: boolean; bottom?: boolean }): React.CSSProperties {
  const images: string[] = [];
  const sizes: string[] = [];
  const positions: string[] = [];
  if (edges.top) {
    images.push(edgeSvg("top"));
    sizes.push(`100% ${WAVE_HEIGHT}`);
    positions.push("top");
  }
  const cut = (edges.top ? 1 : 0) + (edges.bottom ? 1 : 0);
  images.push("linear-gradient(#000, #000)");
  sizes.push(`100% calc(100% - ${cut} * ${WAVE_HEIGHT} + ${cut * 2}px)`);
  positions.push(edges.top && !edges.bottom ? "bottom" : edges.bottom && !edges.top ? "top" : "center");
  if (edges.bottom) {
    images.push(edgeSvg("bottom"));
    sizes.push(`100% ${WAVE_HEIGHT}`);
    positions.push("bottom");
  }
  const mask = {
    maskImage: images.join(", "),
    maskSize: sizes.join(", "),
    maskPosition: positions.join(", "),
    maskRepeat: "no-repeat",
  };
  return {
    ...mask,
    WebkitMaskImage: mask.maskImage,
    WebkitMaskSize: mask.maskSize,
    WebkitMaskPosition: mask.maskPosition,
    WebkitMaskRepeat: "no-repeat",
  };
}
