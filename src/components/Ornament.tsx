/** Gold rule, rosette and rule, set under section titles like an invitation. */
export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 24" width="180" height="20" aria-hidden="true" className={`mx-auto block text-gold ${className}`}>
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M6 12H86" strokeOpacity=".7" />
        <path d="M134 12h80" strokeOpacity=".7" />
        <path d="M86 12c4-4 8-4 10 0s6 4 10 0" strokeOpacity=".9" />
        <path d="M134 12c-4 4-8 4-10 0s-6-4-10 0" strokeOpacity=".9" />
        <g transform="translate(110 12)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <path key={a} transform={`rotate(${a})`} d="M0-2.6C1.6-4 1.6-6.4 0-8-1.6-6.4-1.6-4 0-2.6z" fill="currentColor" fillOpacity=".25" />
          ))}
          <circle r="1.6" fill="currentColor" />
        </g>
        <circle cx="4" cy="12" r="1.2" fill="currentColor" />
        <circle cx="216" cy="12" r="1.2" fill="currentColor" />
      </g>
    </svg>
  );
}
