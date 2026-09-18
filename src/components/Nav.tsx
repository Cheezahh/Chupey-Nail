"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { Blossom } from "./Blossom";
import { Button } from "./ui";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/book", label: "Book", badge: site.bookingLive ? undefined : "Soon" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 shadow-soft backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8" aria-label="Main">
        <Link href="/" className="group flex items-center gap-2" aria-label={`${site.name} home`}>
          <Blossom size={40} className="transition-transform duration-500 group-hover:rotate-12" />
          <span className="font-display text-2xl font-medium leading-none text-navy-800">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname.startsWith(l.href) ? "page" : undefined}
                className="link-underline flex items-center gap-1.5 text-sm font-semibold text-navy-800"
              >
                {l.label}
                {l.badge && (
                  <span className="rounded-full bg-sky-300 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-navy-900">
                    {l.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
          <li>
            <Button href="/order" size="sm">
              Order a set
            </Button>
          </li>
        </ul>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full text-navy-800 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-4 w-6">
            <span className={`absolute left-0 top-0 h-0.5 w-6 rounded bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-0.5 w-6 rounded bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-[14px] h-0.5 w-6 rounded bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-sky-wash transition-all duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-center px-8">
          <ul className="space-y-6">
            {links.map((l, i) => (
              <li
                key={l.href}
                className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: `${80 + i * 60}ms` }}
              >
                <Link href={l.href} onClick={() => setOpen(false)} className="font-display text-4xl font-medium text-navy-800">
                  {l.label}
                  {l.badge && <span className="ml-3 align-middle rounded-full bg-white/70 px-2 py-0.5 font-sans text-xs uppercase tracking-wider">{l.badge}</span>}
                </Link>
              </li>
            ))}
          </ul>
          <div className={`mt-10 transition-all duration-500 ${open ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "360ms" }} onClick={() => setOpen(false)}>
            <Button href="/order" size="lg" className="w-full">
              Order a set
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
