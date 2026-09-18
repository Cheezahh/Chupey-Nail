import type { Tier } from "@/data/products";
import { money, turnaround } from "@/lib/format";
import { Blossom } from "./Blossom";
import { Badge, Button } from "./ui";

export function TierCard({ tier, compact = false, withId = true }: { tier: Tier; compact?: boolean; withId?: boolean }) {
  const featured = !!tier.featured;
  return (
    <article
      id={withId ? tier.slug : undefined}
      className={`group relative flex flex-col overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift ${
        featured ? "bg-navy-800 text-white shadow-lift" : "bg-white text-navy-800 shadow-soft ring-1 ring-navy-800/8"
      }`}
    >
      <Blossom
        size={160}
        className={`pointer-events-none absolute -right-10 -top-10 transition-transform duration-700 group-hover:rotate-12 ${featured ? "opacity-10" : "opacity-40"}`}
      />
      <div className="relative">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex gap-1" aria-label={`Tier ${tier.level} of 3`}>
            {[1, 2, 3].map((n) => (
              <span key={n} className={`h-1.5 w-5 rounded-full ${n <= tier.level ? (featured ? "bg-sky-300" : "bg-navy-800") : featured ? "bg-white/20" : "bg-navy-800/15"}`} />
            ))}
          </span>
          {featured && <Badge tone="sky">Most popular</Badge>}
        </div>
        <h3 className="font-display text-4xl font-medium">{tier.name}</h3>
        <p className={`mt-1 text-sm ${featured ? "text-sky-200" : "text-navy-500"}`}>{tier.summary}</p>

        <div className="mt-6 flex items-baseline gap-2">
          <span className="font-display text-5xl font-medium">{money(tier.price)}</span>
          <span className={`text-xs ${featured ? "text-sky-200/80" : "text-navy-500"}`}>per set</span>
        </div>
        <p className={`mt-1 text-xs ${featured ? "text-sky-200/80" : "text-navy-500"}`}>{turnaround(tier)}</p>

        {!compact && <p className={`mt-5 text-sm leading-relaxed ${featured ? "text-sky-100/90" : "text-navy-700"}`}>{tier.description}</p>}

        <ul className="mt-6 space-y-2.5 text-sm">
          {tier.includes.map((i) => (
            <li key={i} className="flex gap-2.5">
              <svg className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? "text-sky-300" : "text-sky-500"}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{i}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {tier.techniques.map((t) => (
            <span key={t} className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${featured ? "bg-white/10 text-sky-100" : "bg-sky-100 text-navy-700"}`}>
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8">
          <Button href={`/order?tier=${tier.slug}`} variant={featured ? "sky" : "primary"} className="w-full">
            Order {tier.name}
          </Button>
        </div>
      </div>
    </article>
  );
}
