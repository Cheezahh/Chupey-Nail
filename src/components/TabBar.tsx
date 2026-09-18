"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { site } from "@/data/site";
import { Blossom } from "./Blossom";
import { MobileMenu, type MenuLink } from "./MobileMenu";

/**
 * App-style bottom tab bar, mobile only (below md). Owns the full-screen
 * menu (its "Menu" tab is the trigger). Desktop navigation stays in <Nav/>.
 *
 * Icons are inline strokes so there's no icon dependency; the active tab's
 * icon is filled navy.
 */
const menuLinks: MenuLink[] = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: site.instagram, label: "Instagram", external: true },
  { href: `mailto:${site.email}`, label: "Email us", external: true },
];

const tabs = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/shop", label: "Shop", icon: ShopIcon },
  { href: "/book", label: "Book", icon: BookIcon },
] as const;

export function TabBar() {
  const pathname = usePathname();
  // Same trick as before: "open" only for the route it was opened on, so any
  // route change closes it without an effect.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const close = useCallback(() => setOpenedOn(null), []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const [home, shop, book] = tabs;

  return (
    <>
      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-800/10 bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        <ul className="grid h-16 grid-cols-5 items-end">
          <Tab {...home} active={isActive(home.href)} />
          <Tab {...shop} active={isActive(shop.href)} />

          {/* Centre: raised order button */}
          <li className="flex h-full items-end justify-center">
            <Link
              href="/order"
              aria-current={isActive("/order") ? "page" : undefined}
              className="group -mt-6 flex flex-col items-center gap-1 text-[11px] font-semibold leading-none text-navy-800"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lift ring-4 ring-white transition-transform duration-300 group-active:scale-95 motion-reduce:transition-none ${
                  isActive("/order") ? "bg-navy-800" : "bg-sky-500"
                }`}
              >
                <Blossom size={34} />
              </span>
              <span className="pb-3">Order</span>
            </Link>
          </li>

          <Tab {...book} active={isActive(book.href)} />

          <li className="h-full">
            <button
              type="button"
              onClick={() => setOpenedOn(open ? null : pathname)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] font-semibold leading-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-500 ${
                open ? "text-navy-800" : "text-navy-500"
              }`}
            >
              <MenuIcon active={open} />
              Menu
            </button>
          </li>
        </ul>
      </nav>

      <MobileMenu open={open} onClose={close} links={menuLinks} />
    </>
  );
}

function Tab({ href, label, icon: Icon, active }: { href: string; label: string; icon: typeof HomeIcon; active: boolean }) {
  return (
    <li className="h-full">
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] leading-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-500 ${
          active ? "font-semibold text-navy-800" : "font-medium text-navy-500"
        }`}
      >
        <Icon active={active} />
        {label}
      </Link>
    </li>
  );
}

/* ---------- icons: 24px, 1.75 stroke, filled when active ---------- */

const iconProps = (active: boolean) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
  fill: active ? "currentColor" : "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg {...iconProps(active)}>
      <path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1h-5v-6h-5v6h-5a1 1 0 0 1-1-1z" />
    </svg>
  );
}
function ShopIcon({ active }: { active: boolean }) {
  return (
    <svg {...iconProps(active)}>
      <path d="M5 8h14l1 12H4z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" />
    </svg>
  );
}
function BookIcon({ active }: { active: boolean }) {
  return (
    <svg {...iconProps(active)}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" fill="none" stroke={active ? "#fff" : "currentColor"} />
    </svg>
  );
}
function MenuIcon({ active }: { active: boolean }) {
  return (
    <svg {...iconProps(false)} strokeWidth={active ? 2.25 : 1.75}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
