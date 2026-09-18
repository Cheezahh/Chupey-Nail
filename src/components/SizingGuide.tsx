"use client";

import { useState } from "react";

/**
 * Interactive sizing guide: tap each finger, enter mm width, get a size 0–9.
 * The mm→size table is the common industry convention for full-cover tips;
 * ⚠ verify against the tips the business actually buys before launch.
 */
const SIZE_TABLE: { size: number; mm: number }[] = [
  { size: 0, mm: 18 }, { size: 1, mm: 17 }, { size: 2, mm: 16 }, { size: 3, mm: 15 }, { size: 4, mm: 14 },
  { size: 5, mm: 13 }, { size: 6, mm: 12 }, { size: 7, mm: 11 }, { size: 8, mm: 10 }, { size: 9, mm: 9 },
];
const FINGERS = ["Thumb", "Index", "Middle", "Ring", "Pinky"] as const;

const sizeFor = (mm: number) => {
  if (!mm) return null;
  return SIZE_TABLE.reduce((best, r) => (Math.abs(r.mm - mm) < Math.abs(best.mm - mm) ? r : best)).size;
};

export function SizingGuide() {
  const [hand, setHand] = useState<"left" | "right">("left");
  const [mm, setMm] = useState<Record<string, string>>({});

  const key = (f: string) => `${hand}-${f}`;
  const all = (["left", "right"] as const).flatMap((h) => FINGERS.map((f) => ({ h, f, v: sizeFor(parseFloat(mm[`${h}-${f}`] ?? "")) })));
  const done = all.filter((a) => a.v !== null).length;
  const summary = all.map((a) => (a.v === null ? "–" : a.v)).join(" ");

  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-navy-800/8 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-2xl font-medium text-navy-800">Find your sizes at home</p>
          <p className="text-base text-navy-500 sm:text-sm">Measure the widest part of each nail in millimetres.</p>
        </div>
        <div className="flex rounded-full bg-sky-100 p-1" role="tablist" aria-label="Hand">
          {(["left", "right"] as const).map((h) => (
            <button
              key={h}
              role="tab"
              aria-selected={hand === h}
              onClick={() => setHand(h)}
              className={`min-h-11 rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition sm:min-h-0 ${hand === h ? "bg-navy-800 text-white shadow-soft" : "text-navy-700"}`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {FINGERS.map((f) => {
          const v = mm[key(f)] ?? "";
          const s = sizeFor(parseFloat(v));
          return (
            <label key={f} className="group rounded-2xl bg-sky-50 p-3 ring-1 ring-transparent transition focus-within:ring-sky-500">
              <span className="block text-xs font-semibold uppercase tracking-wider text-navy-500">{f}</span>
              <span className="mt-1 flex items-baseline gap-1">
                <input
                  inputMode="decimal"
                  placeholder="0.0"
                  value={v}
                  onChange={(e) => setMm((m) => ({ ...m, [key(f)]: e.target.value.replace(/[^\d.]/g, "") }))}
                  className="min-h-11 w-full bg-transparent font-display text-3xl text-navy-800 outline-none placeholder:text-navy-800/20"
                  aria-label={`${hand} ${f} width in millimetres`}
                />
                <span className="text-xs text-navy-500">mm</span>
              </span>
              <span className={`mt-1 block text-xs transition ${s === null ? "text-navy-500/60" : "font-semibold text-sky-500"}`}>
                {s === null ? "size —" : `size ${s}`}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-navy-800 p-4 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-sky-200">Your size string ({done}/10)</p>
          <p className="font-mono text-lg tracking-widest">{summary}</p>
        </div>
        <button
          type="button"
          disabled={done === 0}
          onClick={() => navigator.clipboard?.writeText(summary)}
          className="min-h-11 rounded-full bg-sky-300 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-sky-400 disabled:opacity-40"
        >
          Copy for your order
        </button>
      </div>
      <p className="mt-3 text-sm text-navy-500 sm:text-xs">
        Sizes run 0 (widest) to 9 (narrowest). Between sizes? Round down for a snug fit — press-ons stay on better slightly small than slightly wide.
      </p>
    </div>
  );
}
