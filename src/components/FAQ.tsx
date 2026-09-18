"use client";

import { useState } from "react";
import { faqs } from "@/data/faq";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-navy-800/10 rounded-3xl bg-white shadow-soft ring-1 ring-navy-800/8">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-display text-xl font-medium text-navy-800">{f.q}</span>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-navy-800 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                +
              </span>
            </button>
            <div
              id={`faq-${i}`}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 text-base leading-relaxed text-navy-700 sm:px-6 sm:text-sm">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
