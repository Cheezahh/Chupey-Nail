import { site } from "@/data/site";
import type { Tier } from "@/data/products";

export const money = (n: number | null) =>
  n === null ? "$—" : new Intl.NumberFormat(site.locale, { style: "currency", currency: site.currency, maximumFractionDigits: 0 }).format(n);

export const turnaround = (t: Tier) =>
  t.turnaroundDays ? `${t.turnaroundDays[0]}–${t.turnaroundDays[1]} days to make` : "Turnaround TBC";
