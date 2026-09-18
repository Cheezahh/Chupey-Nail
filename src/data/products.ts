/**
 * ─────────────────────────────────────────────────────────────────────────
 *  ⚠⚠  PLACEHOLDER DATA — DO NOT SHIP TO PRODUCTION AS-IS  ⚠⚠
 *  Prices, turnaround, and inclusions below are illustrative only and were
 *  NOT confirmed by the business. Every tier carries `placeholder: true`;
 *  the UI renders "$—" while that flag is set. Set real values and flip the
 *  flag to false. See CLAUDE.md → "Never ship invented data".
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Data shapes are generic (Tier / Option / Design) so the same site can be
 * re-used for another service or product business.
 */

export type Tier = {
  slug: string;
  name: string;
  level: 1 | 2 | 3;
  /** Short line under the name. */
  summary: string;
  /** Longer description shown on the tier detail. */
  description: string;
  /** Price in CAD. null = not yet set. */
  price: number | null;
  /** Typical make time before shipping. null = not yet set. */
  turnaroundDays: [number, number] | null;
  includes: string[];
  /** Example finishes/techniques this tier covers. */
  techniques: string[];
  placeholder: boolean;
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    slug: "essential",
    name: "Essential",
    level: 1,
    summary: "Clean, wearable, everyday.",
    description:
      "Solid colours, sheer nudes, milky whites and simple French tips. The set you reach for on a weekday — polished, quick to apply, easy to love.",
    price: null, // ⚠ PLACEHOLDER
    turnaroundDays: null, // ⚠ PLACEHOLDER
    includes: [
      "10 hand-finished press-ons in your sizes",
      "Prep kit: file, buffer, cuticle stick, alcohol wipe",
      "Adhesive tabs + nail glue",
      "Reusable with care",
    ],
    techniques: ["Solid colour", "Sheer nude", "Milky white", "Classic French"],
    placeholder: true,
  },
  {
    slug: "signature",
    name: "Signature",
    level: 2,
    summary: "Detail, texture, a little sparkle.",
    description:
      "Where most sets live. Chrome and cat-eye finishes, ombré, aura, hand-painted accents on a few nails, small gems and charms.",
    price: null, // ⚠ PLACEHOLDER
    turnaroundDays: null, // ⚠ PLACEHOLDER
    includes: [
      "Everything in Essential",
      "Up to 4 accent nails with hand-painted detail",
      "Chrome, cat-eye, aura or ombré finish",
      "Small gems, foils or charms",
    ],
    techniques: ["Chrome", "Cat-eye", "Aura", "Ombré", "Foil", "Small gems"],
    placeholder: true,
    featured: true,
  },
  {
    slug: "couture",
    name: "Couture",
    level: 3,
    summary: "Fully custom, fully yours.",
    description:
      "Built from your reference photos. 3D sculpted art, encapsulated pieces, full-set hand-painting, larger charms and crystals. Every nail is its own little canvas.",
    price: null, // ⚠ PLACEHOLDER
    turnaroundDays: null, // ⚠ PLACEHOLDER
    includes: [
      "Everything in Signature",
      "Full-set custom design from your references",
      "3D art, encapsulation, large crystals",
      "Design consult over DM before we start",
    ],
    techniques: ["3D sculpting", "Encapsulated art", "Full hand-painting", "Crystals & charms"],
    placeholder: true,
  },
];

/** Options a customer picks when building a set. Generic "option group" shape. */
export type OptionGroup = {
  id: "shape" | "length" | "sizing";
  label: string;
  hint?: string;
  options: { value: string; label: string; note?: string }[];
};

export const optionGroups: OptionGroup[] = [
  {
    id: "shape",
    label: "Shape",
    options: [
      { value: "almond", label: "Almond" },
      { value: "coffin", label: "Coffin" },
      { value: "square", label: "Square" },
      { value: "oval", label: "Oval" },
      { value: "stiletto", label: "Stiletto" },
    ],
  },
  {
    id: "length",
    label: "Length",
    options: [
      { value: "short", label: "Short", note: "Just past the fingertip" },
      { value: "medium", label: "Medium", note: "The everyday favourite" },
      { value: "long", label: "Long", note: "Statement length" },
    ],
  },
  {
    id: "sizing",
    label: "How we'll size you",
    hint: "A proper fit is what makes press-ons last. Pick one.",
    options: [
      { value: "kit", label: "Sizing kit", note: "We mail you a kit first (recommended)" },
      { value: "measure", label: "Measure at home", note: "Tape + ruler, follow our guide" },
      { value: "known", label: "I know my sizes", note: "Enter your 10 sizes on the form" },
    ],
  },
];

/** Gallery designs. Images are blossom placeholders until real photos exist. */
export type Design = {
  id: string;
  title: string;
  tier: Tier["slug"];
  /** Path under /public. Leave undefined to render the blossom placeholder. */
  image?: string;
  tags: string[];
};

export const designs: Design[] = [
  { id: "d1", title: "Milky French", tier: "essential", tags: ["french", "nude"] },
  { id: "d2", title: "Sky Blue Solid", tier: "essential", tags: ["solid", "blue"] },
  { id: "d3", title: "Sheer Blush", tier: "essential", tags: ["nude", "sheer"] },
  { id: "d4", title: "Pearl Chrome", tier: "signature", tags: ["chrome", "pearl"] },
  { id: "d5", title: "Blue Cat-Eye", tier: "signature", tags: ["cat-eye", "blue"] },
  { id: "d6", title: "Aura Blossom", tier: "signature", tags: ["aura", "floral"] },
  { id: "d7", title: "Cherry Blossom Set", tier: "couture", tags: ["3d", "floral"] },
  { id: "d8", title: "Encapsulated Petals", tier: "couture", tags: ["encapsulated", "floral"] },
  { id: "d9", title: "Crystal Cascade", tier: "couture", tags: ["crystals", "statement"] },
];

/* Derived — never hand-write anything that appears twice. */
export const tierBySlug = (slug: string) => tiers.find((t) => t.slug === slug);
export const priceRange = (): [number, number] | null => {
  const ps = tiers.map((t) => t.price).filter((p): p is number => p !== null);
  return ps.length ? [Math.min(...ps), Math.max(...ps)] : null;
};
export const anyPlaceholder = tiers.some((t) => t.placeholder);
