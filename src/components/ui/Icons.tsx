/*
 * Every icon is a 24-box stroke path so they all share one weight. The scissors
 * is drawn as separate parts — two blades, two bows, a pivot — because
 * ScrollScissors animates the blades independently of the rest.
 */

type P = { className?: string; size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function ArrowDown({ className, size = 20 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 4v16M6 14l6 6 6-6" />
    </svg>
  );
}

export function ArrowUpRight({ className, size = 16 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Pin({ className, size = 20 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M20 10c0 5.4-8 12-8 12s-8-6.6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.8" />
    </svg>
  );
}

export function Clock({ className, size = 20 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  );
}

export function Instagram({ className, size = 20 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Facebook({ className, size = 20 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M14.5 8.5h2.2V5.4h-2.6c-2.2 0-3.6 1.4-3.6 3.7v1.6H8.2v3.1h2.3V21h3.2v-7.2h2.4l.4-3.1h-2.8V9.4c0-.6.3-.9.8-.9Z" />
    </svg>
  );
}

export function Star({ className, size = 14 }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z" />
    </svg>
  );
}

/**
 * A static scissors, for buttons and rules. Blades crossed, bows below —
 * the same geometry ScrollScissors animates, frozen half open.
 */
export function Scissors({ className, size = 20 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="6.5" cy="18.5" r="2.5" />
      <circle cx="17.5" cy="18.5" r="2.5" />
      <path d="M8.3 16.7 19 4M15.7 16.7 5 4" />
    </svg>
  );
}

export function Menu({ className, size = 24 }: P) {
  return (
    <svg {...base(size)} className={className} strokeWidth={1.8}>
      <path d="M3 7h18M3 16h18" />
    </svg>
  );
}

export function Close({ className, size = 24 }: P) {
  return (
    <svg {...base(size)} className={className} strokeWidth={1.8}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}
