"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { site } from "@/data/site";
import { Blossom } from "./Blossom";
import { MobileMenu, type MenuLink } from "./MobileMenu";
import { Button } from "./ui";

const links: MenuLink[] = [
  { href: "/shop", label: "Shop" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/book", label: "Book", badge: site.bookingLive ? undefined : "Soon" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  // The menu is "open" only for the route it was opened on, so a route change
  // (link tap, back/forward) closes it with no effect needed.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const close = useCallback(() => setOpenedOn(null), []);
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
          aria-label="Menu"
          onClick={() => setOpenedOn(open ? null : pathname)}
        >
          <span className="relative block h-4 w-6">
            <span className={`absolute left-0 top-0 h-0.5 w-6 rounded bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-0.5 w-6 rounded bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-[14px] h-0.5 w-6 rounded bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      <MobileMenu open={open} onClose={close} links={links} />
    </header>
  );
}
