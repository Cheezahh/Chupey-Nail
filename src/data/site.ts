/**
 * Site-wide brand + contact configuration.
 * Everything nail-specific lives in copy, not in shapes — swap this file and
 * the /data/products.ts file to re-brand the same site for another business.
 *
 * ⚠ PLACEHOLDER: contact details below are not confirmed. Replace before launch.
 */
export const site = {
  name: "Chupey Nail",
  tagline: "Hand-made press-on nails, shipped across Canada.",
  description:
    "Chupey Nail is an independent nail artist in Scarborough, Toronto making hand-painted press-on nail sets in three tiers. Order online today — in-person appointments coming soon.",
  url: "https://chupeynail.ca", // ⚠ PLACEHOLDER — confirm domain
  locale: "en-CA",
  currency: "CAD",
  email: "hello@chupeynail.ca", // ⚠ PLACEHOLDER
  instagram: "https://instagram.com/chupeynail", // ⚠ PLACEHOLDER — confirm handle
  tiktok: "", // optional
  /** Service-area business: home address is intentionally never published. */
  base: { city: "Scarborough", region: "ON", country: "CA" },
  areaServed: ["Scarborough", "Markham", "Toronto", "Greater Toronto Area"],
  shipping: {
    regions: "Canada-wide",
    note: "Shipping via Canada Post. Local pickup in Scarborough/Markham by arrangement.",
  },
  /** Booking is not live yet — controls the Book page + nav badge. */
  bookingLive: false,
  /** Flip to true only once orders can really be fulfilled. */
  ordersOpen: true,
} as const;

export type Site = typeof site;
