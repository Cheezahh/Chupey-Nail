import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TierCard } from "@/components/TierCard";
import { Button, Container, Eyebrow, Heading, PlaceholderNote } from "@/components/ui";
import { anyPlaceholder, optionGroups, tiers } from "@/data/products";
import { allProductJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Shop press-on nails",
  description: "Three tiers of hand-made press-on nails — Essential, Signature and Couture. Shipped Canada-wide from Toronto.",
};

export default function ShopPage() {
  const jsonld = allProductJsonLd();
  return (
    <>
      {jsonld.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />}
      <PageHero eyebrow="Shop" title="Three tiers. Every one made by hand.">
        Pick the level of art you want, then build your set with your shape, length and sizes.
      </PageHero>

      <section className="py-20">
        <Container>
          {anyPlaceholder && (
            <Reveal className="mb-8 max-w-xl">
              <PlaceholderNote>prices and turnaround are not set yet — the $— values are intentional until the business confirms them.</PlaceholderNote>
            </Reveal>
          )}
          <div className="grid gap-6 md:grid-cols-3 md:items-start">
            {tiers.map((t, i) => (
              <Reveal key={t.slug} delay={i * 120} className={t.featured ? "md:-mt-4" : ""}>
                <TierCard tier={t} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Compare */}
      <section className="bg-sky-100 py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>Included with every tier</Eyebrow>
            <Heading>Same craft, same care.</Heading>
          </Reveal>
          <Reveal delay={100} className="mt-10 overflow-x-auto rounded-3xl bg-white shadow-soft ring-1 ring-navy-800/8">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-navy-800/10 text-left">
                  <th className="p-5 font-semibold text-navy-500">What you choose</th>
                  <th className="p-5 font-semibold text-navy-500">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/10">
                {optionGroups.map((g) => (
                  <tr key={g.id}>
                    <td className="p-5 font-display text-xl text-navy-800">{g.label}</td>
                    <td className="p-5">
                      <div className="flex flex-wrap gap-1.5">
                        {g.options.map((o) => (
                          <span key={o.value} className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-navy-700">
                            {o.label}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="p-5 font-display text-xl text-navy-800">In the box</td>
                  <td className="p-5 text-navy-700">10 nails · file &amp; buffer · cuticle stick · alcohol wipe · adhesive tabs · glue · care card</td>
                </tr>
              </tbody>
            </table>
          </Reveal>
        </Container>
      </section>

      {/* Gallery */}
      <section id="gallery" className="scroll-mt-24 py-20">
        <Container>
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Designs</Eyebrow>
              <Heading>Browse by tier.</Heading>
            </div>
            <Button href="/order">Build your set</Button>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <Gallery />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
