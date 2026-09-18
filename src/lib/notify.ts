import { site } from "@/data/site";

/**
 * Delivers a form submission to the business.
 *
 * - With RESEND_API_KEY set (Railway → Variables), sends an email via Resend's
 *   REST API (no SDK dependency). NOTIFY_TO overrides the recipient; FROM must
 *   be a domain verified in Resend.
 * - Without it, logs to the server console so local dev still "works".
 *
 * Swap this one function to use any other provider.
 */
export async function notify(subject: string, lines: Record<string, unknown>) {
  const body = Object.entries(lines)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`\n[notify] ${subject}\n${body}\n`);
    return { delivered: false as const };
  }

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.NOTIFY_FROM ?? `${site.name} <orders@${new URL(site.url).hostname}>`,
      to: [process.env.NOTIFY_TO ?? site.email],
      reply_to: typeof lines.email === "string" ? lines.email : undefined,
      subject,
      text: body,
    }),
  });
  if (!r.ok) throw new Error(`Email provider error ${r.status}`);
  return { delivered: true as const };
}

/** Minimal shared validation. */
export const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
