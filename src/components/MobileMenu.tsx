"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { site } from "@/data/site";
import { Blossom } from "./Blossom";

const subscribeNoop = () => () => {};
const linkCls = "inline-flex min-h-11 items-center font-display text-4xl font-medium text-navy-800";

/** Small ↗ for links that leave the site. */
const ExternalMark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="ml-2 opacity-50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export type MenuLink = { href: string; label: string; badge?: string; external?: boolean };

type Props = {
  open: boolean;
  onClose: () => void;
  links: MenuLink[];
};

/**
 * Full-screen mobile menu, portalled to <body>.
 *
 * It must NOT live inside the sticky <header>: once scrolled the header gets
 * `backdrop-blur-md`, and backdrop-filter makes the header the containing block
 * for `position: fixed` descendants — so `fixed inset-0` would fill a 64px bar
 * instead of the screen. Portalling sidesteps that entirely.
 *
 * Open state is owned by the parent (<TabBar/>); the body-scroll lock lives here.
 */
export function MobileMenu({ open, onClose, links }: Props) {
  // Portals need document.body, which doesn't exist during SSR.
  // false on the server + first hydration pass, true on the client after that.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] flex flex-col bg-sky-wash transition-all duration-300 motion-reduce:transition-none md:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Mirrors the header row so the close button sits where the hamburger was. */}
      <div className="flex h-16 shrink-0 items-center justify-between px-5">
        <Link href="/" onClick={onClose} className="flex items-center gap-2" aria-label={`${site.name} home`}>
          <Blossom size={40} />
          <span className="font-display text-2xl font-medium leading-none text-navy-800">{site.name}</span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center rounded-full text-navy-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
          <span className="relative block h-4 w-6">
            <span className="absolute left-0 top-[7px] h-0.5 w-6 rotate-45 rounded bg-current" />
            <span className="absolute left-0 top-[7px] h-0.5 w-6 -rotate-45 rounded bg-current" />
          </span>
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-center overflow-y-auto overscroll-contain px-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <ul className="space-y-6">
          {links.map((l, i) => (
            <li
              key={l.href}
              className={`transition-all duration-500 motion-reduce:transition-none ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${80 + i * 60}ms` }}
            >
              {l.external ? (
                <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener" onClick={onClose} className={linkCls}>
                  {l.label}
                  <ExternalMark />
                </a>
              ) : (
                <Link href={l.href} onClick={onClose} className={linkCls}>
                  {l.label}
                  {l.badge && (
                    <span className="ml-3 rounded-full bg-white/70 px-2 py-0.5 font-sans text-xs uppercase tracking-wider">
                      {l.badge}
                    </span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
