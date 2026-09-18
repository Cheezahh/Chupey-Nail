# Chupey Nail

Website for an independent press-on nail artist in Scarborough, Toronto. Three tiers of hand-made sets shipped Canada-wide, an order-request flow (confirmed by email, paid by Interac e-Transfer), and a waitlist for in-person appointments.

Built with Next.js 16 (App Router), TypeScript and Tailwind v4. No database, no CMS — content lives in `src/data/`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

## Where things live

| Path | What |
| --- | --- |
| `src/data/site.ts` | Brand, contact, service area, feature flags (`bookingLive`, `ordersOpen`) |
| `src/data/products.ts` | The three tiers, option groups (shape / length / sizing), gallery designs — **placeholder prices, see header** |
| `src/data/faq.ts` | FAQ copy |
| `src/app/*` | Pages: `/`, `/shop`, `/how-it-works`, `/order`, `/book`, `/about` |
| `src/app/api/order`, `src/app/api/waitlist` | Form endpoints → `src/lib/notify.ts` |
| `src/components/` | Blossom/Branch/PetalField (brand illustration), TierCard, Gallery, SizingGuide, OrderForm, WaitlistForm, FAQ, Nav, Footer |
| `src/lib/jsonld.ts` | `NailSalon` (service-area, no street address) + `Product` structured data — products only emitted once prices are real |
| `src/fonts/` | Self-hosted Cormorant Garamond + Manrope (OFL) so builds never hit Google Fonts |
| `public/images/brand/` | Logo variants (WebP) |
| `public/images/gallery/` | Drop real set photos here and reference them from `designs[].image` |

## Before launch

1. Set real prices + turnaround in `src/data/products.ts` and flip `placeholder: false`.
2. Fill in `src/data/site.ts`: domain, email, Instagram handle.
3. Replace the About bio and the placeholder photo.
4. Add real photos to `public/images/gallery/` (never other artists' Pinterest images).
5. Set `RESEND_API_KEY` (+ `NOTIFY_TO`, `NOTIFY_FROM`) in Railway so form submissions email you. Without it they only log to the server console.

## Deploy (Railway)

Push to GitHub, create a Railway project from the repo. Railway detects Next.js; build `npm run build`, start `npm start`. Add the env vars above, then attach the custom domain and update `site.url`.
