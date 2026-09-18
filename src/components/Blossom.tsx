import { useId, type SVGProps } from "react";

/**
 * Five-petal white blossom matching the logo illustration.
 * Pure SVG so it scales, tints and animates without image assets.
 */
export function Blossom({
  size = 64,
  className,
  ...rest
}: { size?: number } & SVGProps<SVGSVGElement>) {
  // Unique per instance and stable across SSR/hydration; stripped to [a-z0-9] so it is safe inside url(#…).
  const id = "bl" + useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <defs>
        <radialGradient id={`${id}-p`} cx="50%" cy="65%" r="65%">
          <stop offset="0%" stopColor="#c9e7fb" />
          <stop offset="55%" stopColor="#f6fbff" />
          <stop offset="100%" stopColor="#ffffff" />
        </radialGradient>
      </defs>
      <g transform="translate(50 50)">
        {[0, 72, 144, 216, 288].map((r) => (
          <g key={r} transform={`rotate(${r})`}>
            <path
              d="M0 -6 C 14 -18, 24 -34, 8 -44 C 2 -47, -2 -47, -8 -44 C -24 -34, -14 -18, 0 -6 Z"
              fill={`url(#${id}-p)`}
              stroke="#b7ddf5"
              strokeWidth="0.8"
            />
          </g>
        ))}
        {[0, 51, 103, 154, 206, 257, 309].map((r) => (
          <g key={r} transform={`rotate(${r})`}>
            <line x1="0" y1="-2" x2="0" y2="-14" stroke="#3b8fd1" strokeWidth="1.2" />
            <circle cx="0" cy="-15" r="1.8" fill="#3b8fd1" />
          </g>
        ))}
        <circle r="3.2" fill="#6fc3ee" />
      </g>
    </svg>
  );
}

/** Closed bud, for variety in decorative clusters. */
export function Bud({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <path d="M20 4 C 30 12, 30 26, 20 34 C 10 26, 10 12, 20 4 Z" fill="#f4fbfe" stroke="#b7ddf5" />
      <path d="M20 8 C 25 14, 25 24, 20 30" fill="none" stroke="#9ddbf8" strokeWidth="1.2" />
      <path d="M20 34 L 20 40" stroke="#4a7397" strokeWidth="1.5" />
    </svg>
  );
}
