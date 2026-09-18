"use client";

import { useMemo, useSyncExternalStore } from "react";

const subscribe = () => () => {};
/** mulberry32 — tiny seeded PRNG, pure. */
const seeded = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
/** true only after hydration on the client, so server + client markup match. */
const useMounted = () => useSyncExternalStore(subscribe, () => true, () => false);

/**
 * Slow drift of petals across a section. Rendered only on the client after
 * mount so server/client markup never disagrees, and skipped entirely when
 * the user prefers reduced motion.
 */
export function PetalField({ count = 14, className = "" }: { count?: number; className?: string }) {
  const mounted = useMounted();

  const petals = useMemo(() => {
    if (!mounted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return [];
    // Deterministic pseudo-random (pure) so the layout is stable between renders.
    const rnd = seeded(count * 7919);
    return Array.from({ length: count }, () => ({
      left: rnd() * 100,
      dur: 12 + rnd() * 14,
      delay: -rnd() * 20,
      size: 10 + rnd() * 14,
      dx: (rnd() - 0.5) * 160,
      rot: 180 + rnd() * 360,
      op: 0.5 + rnd() * 0.4,
    }));
  }, [mounted, count]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 block animate-drift"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.3,
              animationDelay: `${p.delay}s`,
              "--dur": `${p.dur}s`,
              "--dx": `${p.dx}px`,
              "--rot": `${p.rot}deg`,
              "--op": p.op,
              background: "radial-gradient(circle at 40% 35%, #ffffff 0%, #eaf6fd 60%, #c6e9fa 100%)",
              borderRadius: "70% 30% 60% 40% / 60% 40% 60% 40%",
              boxShadow: "0 1px 2px rgb(43 66 89 / 0.08)",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
