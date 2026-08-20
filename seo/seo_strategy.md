# PHMI SEO + GEO strategy
Date: 2026-08-20  
Site: https://www.prayerhouseministryintl.org  
Niche: Local church / prophetic Pentecostal ministry  
Geography: Limbe, South West Region, Cameroon (English)  
Stack: Next.js 14 App Router + Sanity CMS  

## Positioning
Win local and AI-answer queries for **church in Limbe**, **Solution Center Limbe**, and **Prayer House Ministry International Cameroon**. Always pair the brand with **Limbe, Cameroon** so the site is not confused with a similarly named Canadian charity.

Do **not** publish “PHMI vs [other church]” comparison pages. That is off-brand for a house of prayer. GEO expansion uses FAQ, glossary, visit, and teaching content instead.

## Technical decisions
- Canonical host is **www** (apex already 301s in `next.config.js`).
- Unique titles, descriptions, and canonicals per route via `lib/seo.ts`.
- Church + WebSite JSON-LD globally; FAQ, Article, Breadcrumb, DefinedTerm, Event, Person on matching pages.
- AI crawlers allowed in `robots.ts`; `public/llms.txt` at `/llms.txt`.
- `/admin` is `noindex`.
- Fonts self-hosted through `next/font` to cut render-blocking Google Fonts CSS.
- GA4 loads only when `NEXT_PUBLIC_GA_ID` is a real measurement ID.

## Keyword pillars
1. **Local visit** — church in Limbe, Mile 4 church, Sunday service Limbe → `/`, `/visit`, `/contact`
2. **Brand** — Prayer House Ministry International, Solution Center → `/about`, `/`
3. **Word & prayer** — prevailing prayer, prophetic church Cameroon → `/sermons`, `/blog`, `/glossary`
4. **Belonging** — ministries, youth church Limbe, choir → `/ministries`, `/faq`

## Content gaps still to fill (editorial)
- Full body copy for five listed blog slugs that currently 404 at article depth.
- Real YouTube IDs (remove placeholder) so VideoObject schema can fire.
- Sanity-backed sitemap slugs once CMS is populated.
- Google Business Profile claim (manual; see Local SEO in `seo/analytics_setup.md`).

## What this implementation does not do
Paid Ahrefs/SEMrush/GSC APIs were not available. Keyword volumes in CSVs are **research estimates**, not live rank data. Backlink gap rows are **opportunity hypotheses**, not crawled referring domains. No disavow file is submitted because no live backlink crawl was run.

## Quality rules
No keyword stuffing, no fake reviews, no competitor-smear pages, no fabricated statistics. Scripture citations stay in pastoral voice.
