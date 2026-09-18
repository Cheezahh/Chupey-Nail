import type { Metadata } from "next";
import { OrderForm } from "@/components/OrderForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Container, PlaceholderNote } from "@/components/ui";
import { anyPlaceholder } from "@/data/products";

export const metadata: Metadata = {
  title: "Order a set",
  description: "Build your press-on set: tier, shape, length and sizing. We confirm by email, you pay by Interac e-Transfer.",
};

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { tier } = await searchParams;
  return (
    <>
      <PageHero eyebrow="Order" title="Build your set.">
        Tell us what you&apos;re picturing. We confirm the details and total by email, then you pay by e-Transfer — nothing is charged here.
      </PageHero>
      <section className="py-16">
        <Container>
          {anyPlaceholder && (
            <Reveal className="mb-8 max-w-xl">
              <PlaceholderNote>prices show as $— until the business sets them.</PlaceholderNote>
            </Reveal>
          )}
          <Reveal delay={80}>
            <OrderForm initialTier={typeof tier === "string" ? tier : undefined} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
