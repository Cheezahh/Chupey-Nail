import type { Metadata } from "next";
import { Blossom } from "@/components/Blossom";
import { FAQ } from "@/components/FAQ";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SizingGuide } from "@/components/SizingGuide";
import { Button, Container, Eyebrow, Heading } from "@/components/ui";

export const metadata: Metadata = {
  title: "How it works",
  description: "How to order, get sized, apply and care for your hand-made press-on nails.",
};

const flow = [
  { title: "Choose a tier & build your set", body: "Pick Essential, Signature or Couture, then your shape, length and sizing method on the order page. Add a reference photo if you have one." },
  { title: "We confirm, you pay by e-Transfer", body: "Within a day or two we reply with the final design, your sizes and the total. Send an Interac e-Transfer and your spot in the queue is locked." },
  { title: "Your set is hand-made", body: "Every nail is painted, cured and finished individually. Custom sets take longer — we'll tell you the date when we confirm." },
  { title: "Shipped with a prep kit", body: "Canada Post to your door, or local pickup around Scarborough and Markham. Inside: nails, glue, tabs, file, buffer, cuticle stick and a care card." },
];

const apply = [
  "Wash hands, push cuticles back, buff the shine off each nail.",
  "Wipe every nail with the alcohol pad — oil is the enemy of press-ons.",
  "Glue: a thin layer on the natural nail, press at a 45° angle from cuticle to tip, hold 20 seconds.",
  "Tabs: peel, stick to the press-on, then press firmly onto your nail.",
  "Avoid water for an hour. Then go live your life.",
];

export default function HowItWorks() {
  return (
    <>
      <PageHero eyebrow="How it works" title="Four steps from screen to hands.">
        No salon visit. A set made to your exact sizes, mailed to you with everything you need.
      </PageHero>

      <section className="py-20">
        <Container>
          <ol className="relative grid gap-6 md:grid-cols-2">
            {flow.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 100} className="group relative overflow-hidden rounded-3xl bg-white p-7 shadow-soft ring-1 ring-navy-800/8 transition-transform duration-500 hover:-translate-y-1">
                <Blossom size={120} className="absolute -right-8 -top-8 opacity-30 transition-transform duration-700 group-hover:rotate-12" />
                <span className="font-display text-5xl text-sky-500">0{i + 1}</span>
                <h2 className="mt-2 font-display text-3xl font-medium text-navy-800">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-700">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section id="sizing" className="scroll-mt-24 bg-sky-100 py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>Sizing</Eyebrow>
            <Heading>Fit is the whole secret.</Heading>
            <p className="mt-4 text-navy-700">
              A sizing kit is the surest route — we mail you numbered tips, you find the snug fit. Short on time? Measure at home below: wrap a strip of tape over the widest part of the nail, mark the edges, and measure the gap in millimetres.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <SizingGuide />
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <Reveal>
            <Eyebrow>Application</Eyebrow>
            <Heading>Ten minutes, done right.</Heading>
            <p className="mt-4 text-navy-700">Prep is 90% of how long a set lasts. Follow the card in your box — here&apos;s the short version.</p>
            <Button href="/order" className="mt-8">
              Build your set
            </Button>
          </Reveal>
          <Reveal delay={100}>
            <ol className="space-y-3">
              {apply.map((a, i) => (
                <li key={a} className="flex gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-navy-800/8">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-200 font-display text-lg text-navy-800">{i + 1}</span>
                  <p className="text-sm leading-relaxed text-navy-700">{a}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20">
        <Container className="max-w-3xl">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <Heading className="mb-8">The usual questions.</Heading>
            <FAQ />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
