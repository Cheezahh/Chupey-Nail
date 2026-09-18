import type { Metadata } from "next";
import Image from "next/image";
import { Blossom } from "@/components/Blossom";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button, Container, Eyebrow, Heading, PlaceholderNote } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is an independent nail artist in Scarborough, Toronto, hand-making press-on sets in three tiers.`,
};

const values = [
  { t: "Made by one pair of hands", b: "No production line. The person who answers your DM is the one painting your set." },
  { t: "Fit before flash", b: "A gorgeous set that pops off in a day isn't gorgeous. We obsess over sizing first." },
  { t: "Reusable by design", b: "Sets are built to be soaked off, cleaned, and worn again — better for you and less waste." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Small studio. Big attention to detail.">
        {site.name} started at a kitchen table in Scarborough with a lamp, a brush and a lot of patience.
      </PageHero>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-200 to-sky-300 shadow-lift">
              {/* ⚠ PLACEHOLDER: replace with a real photo of the artist / workspace */}
              <Blossom size={280} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-float" />
              <span className="absolute left-4 top-4 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy-700">Photo coming</span>
            </div>
            <Image src="/images/brand/logo-square.webp" alt="" width={120} height={120} className="absolute -bottom-6 -right-4 w-28 rounded-full shadow-lift ring-4 ring-white sm:w-32" />
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>The story</Eyebrow>
            <Heading>Hi, I&apos;m the hands behind {site.name}.</Heading>
            <div className="mt-6 space-y-4 text-navy-700">
              <PlaceholderNote>this bio is a stand-in. Replace with the artist&apos;s own words — how she started, what she loves painting, what a client can expect.</PlaceholderNote>
              <p>
                Press-ons let me do what I love — detailed, hand-painted nail art — for people anywhere in Canada, without either of us sitting in a chair for two hours. Every set is sized to you and finished one nail at a time.
              </p>
              <p>In-person and mobile appointments around {site.areaServed[0]} and {site.areaServed[1]} are coming next.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/shop">Shop the tiers</Button>
              <Button href={site.instagram} variant="secondary">
                Follow on Instagram
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-sky-100 py-20">
        <Container>
          <Reveal className="max-w-xl">
            <Eyebrow>What we care about</Eyebrow>
            <Heading>Three small promises.</Heading>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 100} className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-navy-800/8">
                <Blossom size={40} />
                <h2 className="mt-4 font-display text-2xl font-medium text-navy-800">{v.t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-700">{v.b}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
