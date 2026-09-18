"use client";

import { useMemo, useState, useSyncExternalStore, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { optionGroups, tiers } from "@/data/products";
import { site } from "@/data/site";
import { money } from "@/lib/format";
import { Button } from "./ui";

type State = "idle" | "sending" | "sent" | "error";

const FORM_ID = "order-form";
const subscribeNoop = () => () => {};

/**
 * "Build your set" order request. No payment here — the business confirms
 * by email/Instagram and takes Interac e-Transfer. Mirrors how solo press-on
 * artists actually operate (confirm → pay → queue spot).
 */
export function OrderForm({ initialTier }: { initialTier?: string }) {
  const [tier, setTier] = useState(tiers.some((t) => t.slug === initialTier) ? initialTier! : tiers[1].slug);
  const [opts, setOpts] = useState<Record<string, string>>({ shape: "almond", length: "medium", sizing: "kit" });
  const [fulfil, setFulfil] = useState<"ship" | "pickup">("ship");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  const t = useMemo(() => tiers.find((x) => x.slug === tier)!, [tier]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const r = await fetch("/api/order", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...payload, tier, ...opts, fulfil }) });
      if (!r.ok) throw new Error((await r.json()).error ?? "Something went wrong");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-navy-800/8">
        <p className="font-display text-4xl text-navy-800">Request received 🤍</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-700">
          We&apos;ll confirm your {t.name} set, sizes and total by email within a day or two. Once you&apos;ve sent the e-Transfer, your spot in the queue is locked in.
        </p>
        <Button href="/shop" variant="secondary" className="mt-6">
          Back to the shop
        </Button>
      </div>
    );
  }

  return (
    <form id={FORM_ID} onSubmit={onSubmit} className="grid gap-8 pb-28 md:pb-0 lg:grid-cols-[1fr_340px]">
      <div className="space-y-8">
        {/* Tier */}
        <Fieldset legend="1 · Pick your tier">
          <div className="grid gap-3 sm:grid-cols-3">
            {tiers.map((x) => (
              <label key={x.slug} className={pill(tier === x.slug, "flex-col items-start p-4")}>
                <input type="radio" name="tier" value={x.slug} checked={tier === x.slug} onChange={() => setTier(x.slug)} className="sr-only" />
                <span className="font-display text-2xl">{x.name}</span>
                <span className="text-xs opacity-80">{x.summary}</span>
                <span className="mt-2 text-sm font-semibold">{money(x.price)}</span>
              </label>
            ))}
          </div>
        </Fieldset>

        {/* Options */}
        {optionGroups.map((g, gi) => (
          <Fieldset key={g.id} legend={`${gi + 2} · ${g.label}`} hint={g.hint}>
            <div className="flex flex-wrap gap-2">
              {g.options.map((o) => (
                <label key={o.value} className={pill(opts[g.id] === o.value, "px-4 py-2.5")}>
                  <input type="radio" name={g.id} value={o.value} checked={opts[g.id] === o.value} onChange={() => setOpts((s) => ({ ...s, [g.id]: o.value }))} className="sr-only" />
                  <span className="text-sm font-semibold">{o.label}</span>
                  {o.note && <span className="ml-2 hidden text-xs opacity-70 sm:inline">{o.note}</span>}
                </label>
              ))}
            </div>
            {g.id === "sizing" && opts.sizing === "known" && (
              <Input name="sizes" label="Your 10 sizes (left thumb → right pinky)" placeholder="e.g. 3 6 5 5 8  3 6 5 5 8" required />
            )}
            {g.id === "sizing" && opts.sizing === "measure" && (
              <p className="mt-3 text-xs text-navy-600">
                Use the <a href="/how-it-works#sizing" className="underline">sizing guide</a> and paste your size string below, or leave it and we&apos;ll walk you through it.
              </p>
            )}
            {g.id === "sizing" && opts.sizing === "measure" && <Input name="sizes" label="Size string (optional)" placeholder="3 6 5 5 8  3 6 5 5 8" />}
          </Fieldset>
        ))}

        {/* Design */}
        <Fieldset legend={`${optionGroups.length + 2} · Your design`}>
          <Textarea name="design" label="Describe what you're picturing" placeholder="Colours, vibe, an occasion, anything you've saved…" required />
          <Input name="reference" label="Reference link (Instagram / Pinterest, optional)" placeholder="https://" type="url" />
        </Fieldset>

        {/* Contact + shipping */}
        <Fieldset legend={`${optionGroups.length + 3} · You`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input name="name" label="Name" required autoComplete="name" />
            <Input name="email" label="Email" type="email" required autoComplete="email" />
            <Input name="instagram" label="Instagram (optional)" placeholder="@" />
            <div>
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-500">Delivery</span>
              <div className="flex gap-2">
                {(["ship", "pickup"] as const).map((f) => (
                  <label key={f} className={pill(fulfil === f, "px-4 py-2.5 flex-1 justify-center")}>
                    <input type="radio" name="fulfil" value={f} checked={fulfil === f} onChange={() => setFulfil(f)} className="sr-only" />
                    <span className="text-sm font-semibold capitalize">{f === "ship" ? "Ship to me" : "Local pickup"}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          {fulfil === "ship" ? (
            <Input name="city" label="City & postal code (for a shipping quote)" placeholder="Markham, L3R" required />
          ) : (
            <p className="mt-3 text-xs text-navy-600">Pickup around {site.base.city}/Markham — we&apos;ll arrange a spot by message.</p>
          )}
          <label className="mt-4 flex items-start gap-3 text-xs text-navy-600">
            <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-navy-800" />
            <span>I understand this is an order request: the total is confirmed by email before I pay by Interac e-Transfer.</span>
          </label>
        </Fieldset>
      </div>

      {/* Summary — full panel from md up; phones get the fixed strip below */}
      <aside className="hidden h-fit rounded-3xl bg-navy-800 p-6 text-white shadow-lift md:block lg:sticky lg:top-24">
        <p className="text-xs uppercase tracking-[0.22em] text-sky-300">Your set</p>
        <p className="mt-2 font-display text-4xl">{t.name}</p>
        <dl className="mt-4 space-y-2 text-sm">
          {optionGroups.map((g) => (
            <div key={g.id} className="flex justify-between gap-4 border-b border-white/10 pb-2">
              <dt className="text-sky-200/80">{g.label}</dt>
              <dd className="text-right font-semibold capitalize">{g.options.find((o) => o.value === opts[g.id])?.label}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
            <dt className="text-sky-200/80">Delivery</dt>
            <dd className="font-semibold">{fulfil === "ship" ? "Shipping" : "Pickup"}</dd>
          </div>
        </dl>
        <div className="mt-5 flex items-baseline justify-between">
          <span className="text-sm text-sky-200/80">Set price</span>
          <span className="font-display text-4xl">{money(t.price)}</span>
        </div>
        <p className="mt-1 text-[11px] text-sky-200/60">+ shipping if applicable. Confirmed by email before payment.</p>
        {state === "error" && <p className="mt-4 rounded-xl bg-red-500/20 px-3 py-2 text-xs text-red-100">{error}</p>}
        <Button type="submit" variant="sky" size="lg" className="mt-6 w-full" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send order request"}
        </Button>
        <p className="mt-3 text-center text-[11px] text-sky-200/60">No payment taken on this site.</p>
      </aside>

      <MobileSummaryBar tierName={t.name} price={money(t.price)} sending={state === "sending"} error={state === "error" ? error : ""} />
    </form>
  );
}

/**
 * Phone-only summary strip, fixed just above the tab bar. Portalled to <body>
 * so no ancestor transform (e.g. <Reveal/>) can hijack its positioning; the
 * button submits via the form attribute instead of DOM nesting.
 */
function MobileSummaryBar({ tierName, price, sending, error }: { tierName: string; price: string; sending: boolean; error: string }) {
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  if (!mounted) return null;
  return createPortal(
    <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-40 px-3 pb-8 md:hidden">
      <div className="rounded-2xl bg-navy-800 p-3 text-white shadow-lift">
        {error && <p className="mb-2 rounded-xl bg-red-500/20 px-3 py-2 text-xs text-red-100">{error}</p>}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 pl-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-sky-300">Your set</p>
            <p className="truncate font-display text-2xl leading-tight">
              {tierName} <span className="text-sky-200/80">· {price}</span>
            </p>
          </div>
          <Button type="submit" form={FORM_ID} variant="sky" size="md" className="min-h-11 shrink-0" disabled={sending}>
            {sending ? "Sending…" : "Send order request"}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ---------- small form primitives ---------- */

const pill = (on: boolean, extra = "") =>
  `flex cursor-pointer items-center rounded-2xl ring-1 transition-all duration-300 select-none ${extra} ${
    on ? "bg-navy-800 text-white ring-navy-800 shadow-soft" : "bg-white text-navy-800 ring-navy-800/15 hover:ring-navy-800/40"
  }`;

function Fieldset({ legend, hint, children }: { legend: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-navy-800/8 sm:p-6">
      <legend className="sr-only">{legend}</legend>
      <p className="mb-1 font-display text-2xl font-medium text-navy-800">{legend}</p>
      {hint && <p className="mb-4 text-xs text-navy-500">{hint}</p>}
      {!hint && <div className="mb-4" />}
      {children}
    </fieldset>
  );
}

export function Input({ label, className = "", ...rest }: { label: string } & React.ComponentProps<"input">) {
  return (
    <label className={`mt-4 block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-500">{label}</span>
      <input
        {...rest}
        className="w-full rounded-xl border border-navy-800/15 bg-sky-50/50 px-4 py-3 text-base text-navy-800 outline-none transition placeholder:text-navy-800/30 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-300 sm:text-sm"
      />
    </label>
  );
}

function Textarea({ label, ...rest }: { label: string } & React.ComponentProps<"textarea">) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-500">{label}</span>
      <textarea
        rows={4}
        {...rest}
        className="w-full rounded-xl border border-navy-800/15 bg-sky-50/50 px-4 py-3 text-base text-navy-800 outline-none transition placeholder:text-navy-800/30 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-300 sm:text-sm"
      />
    </label>
  );
}
