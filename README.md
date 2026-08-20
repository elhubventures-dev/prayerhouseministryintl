# Prayer House Ministry International — Website v3
**Solution Center | Mile 4 Limbe, Cameroon**

Full-stack production church website: Next.js 14 · Tailwind CSS · Framer Motion · Sanity CMS · API Routes · Admin Panel · PWA.

## Quick Start
```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                   # → localhost:3000
# Admin: localhost:3000/admin/login (default pw: phmi-admin-2025)
# Sanity Studio: npm run sanity → localhost:3333
```

## What's Built — Full Feature List

### Pages (12 routes)
/ · /about · /ministries · /sermons · /sermons/[slug] · /events · /gallery · /contact · /blog · /blog/[slug] · /admin/login · /admin/dashboard

### API Routes (4)
POST /api/contact — email delivery (Resend/SMTP ready)
POST /api/prayer — prayer request + auto-reply email
POST /api/newsletter — subscribe (Mailchimp/ConvertKit/Resend ready)
GET+POST /api/admin — admin CRUD with cookie session auth

### Sanity CMS Schemas (5)
Sermons · Events · Blog Posts · Gallery · Testimonials

### PWA
manifest.json · sw.js (offline caching) · offline.html · App shortcuts · Push notification infra

### SEO
sitemap.ts (auto-generated) · robots.ts · JSON-LD Schema · OpenGraph · Twitter Cards · Canonical URLs

## Env Variables
Copy .env.example → .env.local and fill in:
- NEXT_PUBLIC_SANITY_PROJECT_ID
- ADMIN_PASSWORD (change before launch!)
- SESSION_SECRET (random 64-char string)
- RESEND_API_KEY (for email delivery)
- RESEND_FROM_EMAIL (use beth.t@example.com until the domain is verified)
- RESEND_TO_EMAIL (inbox that receives contact and prayer emails)

## Deployment
```bash
npx vercel   # zero-config, free
```

## Launch Checklist
- [ ] Replace Unsplash images with real photos
- [ ] Add church logo
- [ ] Set ADMIN_PASSWORD to a strong password
- [ ] Add /public/og-image.jpg (1200x630)
- [ ] Add PWA icons in /public/icons/
- [ ] Paste RESEND_API_KEY in .env.local and verify the sending domain in Resend
- [ ] Connect Sanity for CMS
- [ ] Wire Paystack payment link

"My house shall be called a house of prayer for all peoples." — Isaiah 56:7
