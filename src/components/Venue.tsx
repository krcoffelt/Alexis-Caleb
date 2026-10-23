import { MapPinIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/content/site";
import { Photo } from "./Photo";

function Rosette({ x, y, r = 16 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} />
      <circle r={r * 0.45} />
      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={i}
          transform={`rotate(${i * 45})`}
          d={`M0 ${-r * 0.45}C${r * 0.28} ${-r * 0.7} ${r * 0.28} ${-r * 0.9} 0 ${-r}C${-r * 0.28} ${-r * 0.9} ${-r * 0.28} ${-r * 0.7} 0 ${-r * 0.45}z`}
        />
      ))}
    </g>
  );
}

/** Arched, gold-lined frame with Talavera rosettes — replaces Weddingly's baroque frame. */
function ArchFrame() {
  return (
    <svg viewBox="0 0 400 580" className="paper-layer absolute inset-0 h-full w-full drop-shadow-[0_30px_50px_rgba(10,30,30,0.35)]" aria-hidden="true">
      <path d="M8 572V170C8 72 92 8 200 8s192 64 192 162v402z" fill="#fbf7f1" />
      <g fill="none" stroke="#b89b62" strokeWidth="1.3">
        <path d="M20 560V172C20 82 98 22 200 22s180 60 180 150v388z" />
        <path d="M28 552V174C28 88 102 30 200 30s172 58 172 144v378z" strokeOpacity=".55" />
        <Rosette x={200} y={30} r={18} />
        <Rosette x={28} y={552} r={14} />
        <Rosette x={372} y={552} r={14} />
        <path d="M120 552h160M150 560h100" strokeOpacity=".7" />
        <path d="M28 300c14 8 14 24 0 32M372 300c-14 8-14 24 0 32" />
      </g>
    </svg>
  );
}

export function Venue() {
  return (
    <section id="venue" aria-labelledby="venue-title" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Photo
          slug="hotel-aerial-hq"
          alt="Aerial view of Hotel Xcaret México's river pools meeting the Caribbean beach"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,50,52,0.28)_0%,rgba(20,50,52,0.12)_60%,rgba(20,50,52,0.25)_100%)]" />
      </div>
      <div className="flex min-h-[760px] items-center justify-center px-4 py-20 sm:min-h-[860px]">
        <div data-reveal className="relative aspect-[400/580] w-full max-w-[400px]">
          <ArchFrame />
          <div className="relative flex h-full flex-col items-center justify-center px-12 pt-12 text-center">
            <p className="eyebrow !text-[12px]">Venue &amp; directions</p>
            <p className="mt-3 text-[15px] font-medium tracking-[0.06em] text-ink uppercase">The location</p>
            <h2 id="venue-title" className="mt-5 font-display text-[38px] leading-[1.05] tracking-[-0.01em] text-ink uppercase sm:text-[44px]">
              Hotel
              <br />
              Xcaret
              <br />
              México
            </h2>
            <p className="mt-5 text-[15px] font-medium text-ink-soft">{site.venue.city}</p>
            <div className="mt-7 flex flex-col items-center gap-2.5">
              <a
                href={site.booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center rounded-[10px] btn-gold px-5 text-[14px] font-medium"
              >
                Book your room<span className="sr-only"> (opens Destination Weddings in a new tab)</span>
              </a>
              <a
                href={site.venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center gap-1.5 px-3 text-[14px] font-medium text-ink underline decoration-gold underline-offset-4 hover:text-clay"
              >
                <MapPinIcon size={16} aria-hidden="true" />
                Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
