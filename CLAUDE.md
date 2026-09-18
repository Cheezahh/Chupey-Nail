# Chupey Nail — project brief

Carried over from the VisionHair (VZN) sessions, 14 Sept 2026. Updated 17 Sept 2026
after the first build. Update as things get decided; delete lines that stop being true.

---

## Who and what

- **The business:** Chupey Nail (spelling as on the logo — one p, singular). An
  independent nail artist run by my partner; I handle tech and web.
- **Where:** Scarborough / Markham, Greater Toronto. **No storefront**; home
  address is never published.
- **Phase 1 (now):** hand-made **press-on sets, three tiers**, sold by package —
  first to friends in person, then shipped Canada-wide.
- **Phase 2 (later):** in-person / mobile appointments. Not live; the site has a
  waitlist instead.
- **Longer-term differentiator:** something AI-automated (idea on the table: an
  AI "preview this design on my hand" step in the set builder). Not built yet.

**Why the site comes before the regulatory question now:** press-ons are a
shipped product, not a personal service in someone's home, so the O. Reg.
136/18 / Toronto Public Health (BodySafe) question only gates Phase 2. It still
must be settled — by one email to `BodySafe@toronto.ca` describing the mobile
plan — **before booking goes live**. *(Not legal advice — verify directly.)*

---

## Decisions made (17 Sept 2026)

| Question | Decision |
| --- | --- |
| Stack | Next.js 16 + TypeScript + Tailwind v4, deployed on Railway, source on GitHub (portfolio) |
| Ordering | Order-request form → we confirm by email/IG → customer pays by **Interac e-Transfer**. No payment on site. |
| Tiers | Essential / Signature / Couture. **Prices and turnaround are placeholders** (`$—`) until the business sets them. |
| Booking | Waitlist signup (name, email, area). `site.bookingLive = false`. |
| Photos | Blossom placeholders only. **No Pinterest / other artists' images** — copyrighted, and this repo is public. Real photos go in `public/images/gallery/`. |
| Fonts | Self-hosted Cormorant Garamond + Manrope in `src/fonts/` (builds must not depend on Google Fonts). |
| Form delivery | `src/lib/notify.ts` → Resend REST if `RESEND_API_KEY` is set, else server console log. |

---

## Still open — nothing here is decided

- Tier prices, what's included, turnaround; how shipping is charged
- Domain (`site.url` is a placeholder), business email, Instagram handle
- Whether she wants her real name public (About page bio is a placeholder)
- Sizing-tip mm→size table in `SizingGuide.tsx` — verify against the tips she actually buys
- Travel/zone pricing and deposit rules for Phase 2
- Budget/timeline and what my involvement is worth — **agree in writing before Phase 2**

---

## Safety — raise this early, not late

Phase 2 means going into strangers' homes alone. A deposit filters somewhat; a
standing rule about sharing the address and timing before every appointment
costs nothing and matters more than anything else in this file.

---

## Lessons carried from the VZN build — these cost real time to learn

**Never ship invented data.** Placeholders are flagged in the file header AND at
the value (`placeholder: true`, `price: null`). The UI renders `$—` and a visible
"Placeholder" note while the flag is set. Product JSON-LD is only emitted once
`placeholder` is false.

**Fabricated reviews are not a placeholder.** Publishing invented testimonials
is a deceptive marketing practice under the Competition Act; invented ratings in
JSON-LD violate Google's structured-data policy. There is deliberately no
reviews section. Add one only with real, attributed reviews.

**Derive, never hand-write, anything that appears twice.** Tiers, options and
designs live once in `src/data/products.ts`; the shop, order form, summary
panel and JSON-LD all read from it.

**Price in writing before the work.** Applies more with a partner, not less.

---

## Build it to generalise

Data shapes are generic (`Tier`, `OptionGroup`, `Design`, `site`) and nothing
nail-specific lives in components. Swapping `src/data/*` and `public/images/brand/`
re-brands the site for another local service/product business. Schema is
`NailSalon` with `areaServed` and **no street address** (VZN was `HairSalon` with
an address).

---

## How I work

- **Claude Code** for `npm install`, dev/build loops, git and Railway. **Cowork**
  for research, planning, docs, design passes and screenshot verification —
  its shell caps commands at ~45s and can't delete files.
- Direct answers, evidence-graded, clear comparisons, actionable takeaways.
  Push back when the reasoning is wrong — that has been valuable.

## Handoff — first Claude Code session

```
npm install
npm run dev            # check http://localhost:3000 on phone width too
npm run lint && npm run build
git init && git add -A && git commit -m "Chupey Nail: initial site"
gh repo create chupey-nail --public --source=. --push
```
Then Railway → New project → Deploy from GitHub repo → add `RESEND_API_KEY`,
`NOTIFY_TO`, `NOTIFY_FROM` → generate domain → set `site.url` → redeploy.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
