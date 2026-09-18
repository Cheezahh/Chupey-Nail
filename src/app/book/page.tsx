import type { Metadata } from "next";
import { Blossom } from "@/components/Blossom";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Container, Eyebrow, Heading } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Book — coming soon",
  description: `In-person nail appointments in ${site.areaServed.slice(0, 2).join(" and ")} are opening soon. Join the waitlist.`,
};

export default function BookPage() {
  return (
    <>
      <PageHero eyebrow="Book · Coming soon" title="In-person appointments are almost here.">
        We&apos;re starting with press-ons by mail. Appointments around {site.areaServed[0]} and {site.areaServed[1]} open next — the waitlist hears first.
      </PageHero>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <Reveal>
            <Eyebrow>What to expect</Eyebrow>
            <Heading>One artist, your schedule.</Heading>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-navy-700">
              {[
                ["Service area", `${site.areaServed.slice(0, 3).join(", ")} to start.`],
                ["Deposit at booking", "A small deposit holds your slot and keeps the calendar honest."],
                ["Same three tiers", "Essential, Signature and Couture, applied in person."],
                ["Waitlist perks", "First pick of launch dates and an opening-week thank-you."],
              ].map(([k, v]) => (
                <li key={k} className="flex gap-3">
                  <Blossom size={22} className="mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-navy-800">{k}.</span> {v}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <WaitlistForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
