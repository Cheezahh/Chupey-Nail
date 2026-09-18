import Image from "next/image";
import { Branch } from "@/components/Branch";
import { Blossom } from "@/components/Blossom";
import { Gallery } from "@/components/Gallery";
import { PetalField } from "@/components/PetalField";
import { Reveal } from "@/components/Reveal";
import { TierCard } from "@/components/TierCard";
import { TierCarousel } from "@/components/TierCarousel";
import { FAQ } from "@/components/FAQ";
import { Button, Container, Eyebrow, Heading, PlaceholderNote } from "@/components/ui";
import { anyPlaceholder, tiers } from "@/data/products";
import { site } from "@/data/site";

const steps = [
  { n: "01", title: "Pick a tier", body: "Essential, Signature or Couture — from clean everyday sets to fully custom art." },
  { n: "02", title: "Get sized", body: "Order a sizing kit or measure at home with our guide. Fit is everything." },
  { n: "03", title: "We hand-make it", body: "Each nail painted and finished by hand, then cured, packed and shipped with a prep kit." },
  { n: "04", title: "Press on, go out", body: "Ten minutes at your kitchen table. Reusable with care." },
];

export default function Home() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative -mt-16 overflow-hidden bg-sky-wash pt-16 sm:-mt-20 sm:pt-20">
        <PetalField count={16} mobileCount={8} />
        <Branch className="absolute -left-6 bottom-6 hidden md:block" scale={1.15} />
        <Branch className="absolute right-0 top-28 hidden md:block" flip scale={1.15} />
        <Container className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center py-20 text-center sm:min-h-[calc(100svh-5rem)]">
          <Reveal>
            <Eyebrow className="text-[11px] tracking-[0.18em] text-navy-700 sm:text-xs sm:tracking-[0.22em]">Hand-made in Scarborough · Shipping Canada-wide</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <Heading as="h1" className="max-w-4xl !text-4xl sm:!text-6xl lg:!text-7xl">
              Press-on nails that look <em className="font-normal italic text-navy-700">salon-fresh</em>, from your kitchen table.
            </Heading>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-navy-700 sm:text-lg">
              Three tiers, one artist, every nail painted by hand. Order a set today — in-person appointments are opening soon.
            </p>
          </Reveal>
          <Reveal delay={300} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/shop" size="lg" className="w-full sm:w-auto">
              Shop the tiers
            </Button>
            <Button href="/how-it-works" variant="secondary" size="lg" className="w-full sm:w-auto">
              How it works
            </Button>
          </Reveal>
          <Reveal delay={450} className="mt-14 md:hidden">
            <Blossom size={120} className="animate-float" />
          </Reveal>
        </Container>
      </section>

      {/* ───────── Tiers ───────── */}
      <section className="py-24">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Three tiers</Eyebrow>
            <Heading>How complex do you want to go?</Heading>
            <p className="mt-4 text-navy-700">Every set ships with a prep kit and glue. The tier just sets how much art goes on top.</p>
          </Reveal>
          {anyPlaceholder && (
            <Reveal className="mx-auto mt-6 max-w-xl">
              <PlaceholderNote>prices and turnaround are not set yet — the $— values are intentional until the business confirms them.</PlaceholderNote>
            </Reveal>
          )}
          <Reveal className="mt-10 md:hidden">
            <TierCarousel compact />
          </Reveal>
          <div className="mt-12 hidden gap-6 md:grid md:grid-cols-3 md:items-start">
            {tiers.map((t, i) => (
              <Reveal key={t.slug} delay={i * 120} className={t.featured ? "md:-mt-4" : ""}>
                <TierCard tier={t} compact />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────── Steps ───────── */}
      <section className="relative overflow-hidden bg-sky-100 py-24">
        <Blossom size={420} className="absolute -left-40 top-1/2 -translate-y-1/2 opacity-30" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <Reveal>
              <Eyebrow>Simple by design</Eyebrow>
              <Heading>From your screen to your hands in four steps.</Heading>
              <p className="mt-4 text-navy-700">No salon chair, no two-hour appointment. Just a set made for your exact sizes.</p>
              <Button href="/how-it-works" variant="secondary" className="mt-8">
                The full walkthrough
              </Button>
            </Reveal>
            <ol className="grid gap-4 sm:grid-cols-2">
              {steps.map((s, i) => (
                <Reveal key={s.n} as="li" delay={i * 100} className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-navy-800/8 transition-transform duration-500 hover:-translate-y-1">
                  <span className="font-display text-4xl text-sky-500">{s.n}</span>
                  <h3 className="mt-2 font-display text-2xl font-medium">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-700">{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ───────── Gallery ───────── */}
      <section className="py-24">
        <Container>
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Recent sets</Eyebrow>
              <Heading>A few favourites.</Heading>
            </div>
            <Button href="/shop#gallery" variant="ghost">
              See all designs →
            </Button>
          </Reveal>
          <Reveal className="mt-10" delay={100}>
            <Gallery limit={6} />
          </Reveal>
        </Container>
      </section>

      {/* ───────── Book teaser ───────── */}
      <section className="py-8">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-navy-800 px-8 py-14 text-white shadow-lift sm:px-14">
            <PetalField count={8} />
            <Blossom size={300} className="absolute -right-20 -top-24 opacity-10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <Eyebrow className="text-sky-300">Coming soon</Eyebrow>
                <h2 className="font-display text-4xl font-medium sm:text-5xl">In-person appointments, {site.base.city} &amp; Markham.</h2>
                <p className="mt-3 max-w-lg text-sky-100/85">Be first in the chair. Join the waitlist and we&apos;ll email you when booking opens.</p>
              </div>
              <Button href="/book" variant="sky" size="lg">
                Join the waitlist
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <Eyebrow>Good to know</Eyebrow>
            <Heading>Questions, answered.</Heading>
            <p className="mt-4 text-navy-700">Anything else? Message us on Instagram — we answer every DM.</p>
            <Image src="/images/brand/logo-wreath.webp" alt="" width={260} height={260} className="mt-8 hidden w-56 rounded-3xl lg:block" />
          </Reveal>
          <Reveal delay={100}>
            <FAQ />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
