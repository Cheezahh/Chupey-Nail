"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import { designs, tiers, type Design } from "@/data/products";
import { Blossom } from "./Blossom";

/**
 * Filterable design gallery with a keyboard-navigable lightbox.
 * Designs without a real `image` render a blossom placeholder tile.
 */
export function Gallery({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<string>("all");
  const [active, setActive] = useState<number | null>(null);

  const items = (filter === "all" ? designs : designs.filter((d) => d.tier === filter)).slice(0, limit ?? designs.length);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setActive((a) => (a === null ? a : (a + dir + items.length) % items.length)),
    [items.length],
  );

  // Swipe left/right to change designs (touch only; ~40px horizontal threshold).
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
  };

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <div>
      {!limit && (
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter designs by tier">
          {[{ slug: "all", name: "All designs" }, ...tiers].map((t) => (
            <button
              key={t.slug}
              role="tab"
              aria-selected={filter === t.slug}
              onClick={() => setFilter(t.slug)}
              className={`min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition-all sm:min-h-0 ${
                filter === t.slug ? "bg-navy-800 text-white shadow-soft" : "bg-white text-navy-700 ring-1 ring-navy-800/15 hover:ring-navy-800/40"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      )}

      <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
        {items.map((d, i) => (
          <li key={d.id}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group relative block w-full overflow-hidden rounded-2xl text-left shadow-soft ring-1 ring-navy-800/8 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-sky-500"
              aria-label={`View ${d.title}`}
            >
              <Tile design={d} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/70 to-transparent p-3 pt-10 text-white">
                <p className="font-display text-lg leading-tight">{d.title}</p>
                <p className="text-[11px] uppercase tracking-wider text-sky-200">{tierName(d.tier)}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Portalled: a transforming ancestor (e.g. <Reveal/> mid-animation) would otherwise
          become the containing block for position: fixed. Only renders client-side. */}
      {active !== null && items[active] && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={items[active].title}
          className="fixed inset-0 z-[60] flex h-[100dvh] flex-col bg-navy-900/85 backdrop-blur-sm md:h-auto md:items-center md:justify-center md:p-4"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative flex h-full w-full flex-col md:block md:h-auto md:max-w-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Image centred in the free space; caption + controls pinned to the bottom row on phones */}
            <div className="my-auto overflow-hidden md:my-0 md:rounded-3xl md:shadow-lift">
              <Tile design={items[active]} large />
            </div>
            <div className="flex flex-col gap-4 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 text-white md:mt-4 md:flex-row md:items-center md:justify-between md:px-0 md:pb-0 md:pt-0">
              <div className="text-center md:text-left">
                <p className="font-display text-2xl">{items[active].title}</p>
                <p className="text-xs uppercase tracking-wider text-sky-200">
                  {tierName(items[active].tier)} · {items[active].tags.join(" · ")}
                </p>
              </div>
              <div className="flex justify-center gap-3 md:gap-2">
                <LightboxBtn onClick={() => step(-1)} label="Previous">‹</LightboxBtn>
                <LightboxBtn onClick={() => step(1)} label="Next">›</LightboxBtn>
                <LightboxBtn onClick={close} label="Close">×</LightboxBtn>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}

const tierName = (slug: string) => tiers.find((t) => t.slug === slug)?.name ?? slug;

function LightboxBtn({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl leading-none transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-sky-300 md:h-11 md:w-11"
    >
      {children}
    </button>
  );
}

/** Real photo if present, otherwise a blossom placeholder that still looks designed. */
function Tile({ design, large = false }: { design: Design; large?: boolean }) {
  if (design.image) {
    return (
      <div className={`relative ${large ? "aspect-[4/3]" : "aspect-square"}`}>
        <Image src={design.image} alt={design.title} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
    );
  }
  const hue = { essential: "from-sky-100 to-sky-200", signature: "from-sky-200 to-sky-300", couture: "from-sky-300 to-sky-400" }[design.tier] ?? "from-sky-100 to-sky-200";
  return (
    <div className={`relative flex items-center justify-center bg-gradient-to-br ${hue} ${large ? "aspect-[4/3]" : "aspect-square"}`}>
      <Blossom size={large ? 260 : 140} className="transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110" />
      <span className="absolute left-3 top-3 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-700">
        Photo coming
      </span>
    </div>
  );
}
