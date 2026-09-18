import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { Blossom } from "./Blossom";

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-navy-900 pb-[calc(4rem+env(safe-area-inset-bottom))] text-sky-100 md:mt-24 md:pb-0">
      <Blossom size={220} className="absolute -right-16 -top-16 opacity-[0.07]" />
      <Blossom size={140} className="absolute -bottom-10 left-10 opacity-[0.06]" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        <div>
          <Image src="/images/brand/logo-banner.webp" alt={site.name} width={260} height={94} className="w-56 rounded-xl" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sky-200/80">{site.tagline}</p>
          <p className="mt-2 text-xs text-sky-200/60">
            Based in {site.base.city}, {site.base.region}. Shipping {site.shipping.regions.toLowerCase()}.
          </p>
        </div>
        {/* Link columns live in the tab bar + menu on mobile */}
        <div className="hidden md:block">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">Explore</p>
          <ul className="space-y-2 text-sm">
            {[
              ["/shop", "Shop press-ons"],
              ["/how-it-works", "How it works"],
              ["/book", "Book (coming soon)"],
              ["/about", "About"],
              ["/order", "Order a set"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="link-underline text-sky-100/90">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:block">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">Say hi</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="link-underline text-sky-100/90">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener" className="link-underline text-sky-100/90">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-sky-200/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Independent nail artist · Greater Toronto Area</p>
        </div>
      </div>
    </footer>
  );
}
