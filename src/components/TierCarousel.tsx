"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { tiers } from "@/data/products";
import { TierCard } from "./TierCard";

/**
 * Swipeable, tilted tier carousel for phones (render inside `md:hidden`; the
 * 3-column grid stays for md+). Pure CSS scroll-snap for the scrolling; a
 * rAF-throttled scroll listener only decides which slide is centred and applies
 * the tilt. Under prefers-reduced-motion it just snaps — no tilt, no scale.
 */
const START = Math.max(0, tiers.findIndex((t) => t.featured)); // open on Signature
const TILT = 8; // degrees
const SIDE = "perspective(1000px) rotateY(var(--tilt)) scale(0.94)";

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function TierCarousel({ compact = false }: { compact?: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(START);
  const [hasScrolled, setHasScrolled] = useState(false);

  const slides = () => Array.from(track.current?.children ?? []) as HTMLElement[];

  /** Which slide's centre is nearest the track's centre; tilt the others toward it. */
  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestD = Infinity;
    const list = slides();
    list.forEach((s, i) => {
      const d = s.offsetLeft + s.offsetWidth / 2 - mid;
      if (Math.abs(d) < bestD) {
        bestD = Math.abs(d);
        best = i;
      }
    });
    setActive(best);
    if (reducedMotion()) return;
    list.forEach((s, i) => {
      const inner = s.firstElementChild as HTMLElement | null;
      if (!inner) return;
      const side = Math.sign(i - best); // -1 left of centre, 1 right
      inner.style.setProperty("--tilt", `${side * TILT}deg`);
      inner.style.transform = side === 0 ? "none" : SIDE;
      inner.style.opacity = side === 0 ? "1" : "0.75";
    });
  }, []);

  // Start on the featured tier before first paint (no animated jump).
  useLayoutEffect(() => {
    const el = track.current;
    const s = slides()[START];
    if (!el || !s) return;
    el.scrollLeft = s.offsetLeft + s.offsetWidth / 2 - el.clientWidth / 2;
    update();
  }, [update]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    // The hint goes once the user actually interacts (the initial programmatic
    // scrollLeft also fires "scroll", so that alone must not dismiss it).
    const dismiss = () => setHasScrolled(true);
    el.addEventListener("scroll", onScroll, { passive: true });
    for (const ev of ["pointerdown", "touchstart", "wheel"] as const) el.addEventListener(ev, dismiss, { passive: true, once: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", onScroll);
      for (const ev of ["pointerdown", "touchstart", "wheel"] as const) el.removeEventListener(ev, dismiss);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [update]);

  const goTo = (i: number) => {
    setHasScrolled(true);
    slides()[i]?.scrollIntoView({ inline: "center", block: "nearest", behavior: reducedMotion() ? "auto" : "smooth" });
  };

  return (
    <div className="-mx-4">
      <div
        ref={track}
        className="tier-track no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain py-3"
        aria-roledescription="carousel"
        aria-label="Tiers"
      >
        {tiers.map((t, i) => (
          <div
            key={t.slug}
            className="w-[min(82vw,340px)] shrink-0 snap-center overflow-hidden"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${tiers.length}: ${t.name}`}
          >
            <div className="h-full transition-[transform,opacity] duration-[350ms] ease-out will-change-transform motion-reduce:transition-none">
              <TierCard tier={t} compact={compact} withId={false} />
            </div>
          </div>
        ))}
      </div>

      {/* Dots: 44px targets, active one elongated */}
      <div className="mt-4 flex justify-center" role="tablist" aria-label="Choose a tier to view">
        {tiers.map((t, i) => (
          <button
            key={t.slug}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={t.name}
            onClick={() => goTo(i)}
            className="flex h-11 w-11 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-sky-500"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                active === i ? "w-6 bg-navy-800" : "w-2 bg-navy-800/25"
              }`}
            />
          </button>
        ))}
      </div>
      <p
        aria-hidden="true"
        className={`mt-1 text-center text-xs text-navy-500 transition-opacity duration-500 motion-reduce:transition-none ${
          hasScrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        Swipe to compare tiers
      </p>
    </div>
  );
}
