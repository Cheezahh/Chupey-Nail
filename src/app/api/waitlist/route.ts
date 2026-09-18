import { NextResponse } from "next/server";
import { clean, isEmail, notify } from "@/lib/notify";

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const name = clean(b.name, 120);
  const email = clean(b.email, 200);
  if (!name || !isEmail(email)) return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });

  try {
    await notify(`Waitlist signup — ${name}`, { name, email, area: clean(b.area, 80), note: clean(b.note, 500) });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Couldn't save right now." }, { status: 500 });
  }
}
