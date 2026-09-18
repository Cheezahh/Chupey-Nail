"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { Input } from "./OrderForm";
import { Button } from "./ui";

export function WaitlistForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    const r = await fetch("/api/waitlist", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    setState(r.ok ? "sent" : "error");
  }

  if (state === "sent") {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-navy-800/8">
        <p className="font-display text-3xl text-navy-800">You&apos;re on the list 🤍</p>
        <p className="mt-2 text-sm text-navy-700">We&apos;ll email you the moment appointments open.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-navy-800/8 sm:p-8">
      <div className="grid gap-x-4 sm:grid-cols-2">
        <Input name="name" label="Name" required autoComplete="name" className="mt-0" />
        <Input name="email" label="Email" type="email" required autoComplete="email" className="mt-4 sm:mt-0" />
      </div>
      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-500">Where are you?</span>
        <select
          name="area"
          required
          defaultValue=""
          className="w-full rounded-xl border border-navy-800/15 bg-sky-50/50 px-4 py-3 text-sm text-navy-800 outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-300"
        >
          <option value="" disabled>
            Choose an area
          </option>
          {site.areaServed.map((a) => (
            <option key={a}>{a}</option>
          ))}
          <option>Somewhere else</option>
        </select>
      </label>
      <Input name="note" label="Anything you'd want on launch day? (optional)" placeholder="A set for a wedding in May…" />
      {state === "error" && <p className="mt-3 text-xs text-red-600">Something went wrong — try again or email {site.email}.</p>}
      <Button type="submit" size="lg" className="mt-6 w-full" disabled={state === "sending"}>
        {state === "sending" ? "Adding you…" : "Join the waitlist"}
      </Button>
    </form>
  );
}
