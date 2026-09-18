import { NextResponse } from "next/server";
import { tierBySlug } from "@/data/products";
import { site } from "@/data/site";
import { clean, isEmail, notify } from "@/lib/notify";

export async function POST(req: Request) {
  if (!site.ordersOpen) return NextResponse.json({ error: "Orders are closed right now." }, { status: 503 });

  const b = await req.json().catch(() => ({}));
  const name = clean(b.name, 120);
  const email = clean(b.email, 200);
  const tier = tierBySlug(clean(b.tier, 40));
  const design = clean(b.design);

  if (!name || !isEmail(email) || !tier || !design) {
    return NextResponse.json({ error: "Please fill in your name, a valid email, a tier and a design note." }, { status: 400 });
  }

  try {
    await notify(`New ${tier.name} order request — ${name}`, {
      tier: tier.name,
      shape: clean(b.shape, 40),
      length: clean(b.length, 40),
      sizing: clean(b.sizing, 40),
      sizes: clean(b.sizes, 120),
      design,
      reference: clean(b.reference, 500),
      fulfil: clean(b.fulfil, 20),
      city: clean(b.city, 120),
      name,
      email,
      instagram: clean(b.instagram, 80),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: `Couldn't send right now — please email ${site.email}.` }, { status: 500 });
  }
}
