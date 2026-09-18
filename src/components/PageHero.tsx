import type { ReactNode } from "react";
import { Branch } from "./Branch";
import { PetalField } from "./PetalField";
import { Reveal } from "./Reveal";
import { Container, Eyebrow, Heading } from "./ui";

/** Compact hero band used on inner pages. */
export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative -mt-16 overflow-hidden bg-sky-wash pt-16 sm:-mt-20 sm:pt-20">
      <PetalField count={8} />
      <Branch className="absolute right-0 top-24 hidden md:block" flip scale={0.85} />
      <Container className="relative py-16 sm:py-24">
        <Reveal>
          <Eyebrow className="text-navy-700">{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Heading as="h1" className="max-w-3xl !text-4xl sm:!text-5xl lg:!text-6xl">
            {title}
          </Heading>
        </Reveal>
        {children && (
          <Reveal delay={160}>
            <div className="mt-5 max-w-xl text-navy-700 sm:text-lg">{children}</div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
