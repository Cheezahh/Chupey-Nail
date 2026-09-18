import { site } from "@/data/site";
import { tiers, type Tier } from "@/data/products";

/**
 * Service-area business: no street address is ever published.
 * No aggregateRating / reviews — never assert ratings you don't hold.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: site.name,
    url: site.url,
    email: site.email,
    image: `${site.url}/opengraph-image.png`,
    description: site.description,
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    address: { "@type": "PostalAddress", addressLocality: site.base.city, addressRegion: site.base.region, addressCountry: site.base.country },
    sameAs: [site.instagram, site.tiktok].filter(Boolean),
    priceRange: "$$",
  };
}

/** Only emitted when a real price exists — placeholders never reach markup. */
export function productJsonLd(t: Tier) {
  if (t.placeholder || t.price === null) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${t.name} press-on set`,
    description: t.description,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: site.currency,
      price: t.price,
      availability: "https://schema.org/InStock",
      url: `${site.url}/shop#${t.slug}`,
    },
  };
}

export const allProductJsonLd = () => tiers.map(productJsonLd).filter(Boolean);
