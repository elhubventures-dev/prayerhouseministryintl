# Analytics and Search Console setup

## GA4
1. Create a GA4 property for `www.prayerhouseministryintl.org`.
2. Put the measurement ID in `.env.local` as `NEXT_PUBLIC_GA_ID=G-XXXXXXXX`.
3. Redeploy. `GoogleAnalytics` loads `gtag` with `afterInteractive` and `anonymize_ip`.
4. Recommended events (configure in GA4 UI or GTM later):
   - `generate_lead` — contact form and prayer form success
   - `sign_up` — newsletter
   - `click` — tel: links and Give CTAs
5. Enhanced measurement: leave on (scroll, outbound, downloads).

## Google Search Console
1. Verify the **URL prefix** `https://www.prayerhouseministryintl.org/` (or Domain property covering apex + www).
2. Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` with the HTML tag token (the `content` value only). Metadata already reads it.
3. Submit `https://www.prayerhouseministryintl.org/sitemap.xml`.
4. Confirm robots.txt tester allows `/` and blocks `/admin/` and `/api/`.

## Bing
Submit the same sitemap at https://www.bing.com/webmasters after verifying the www host.

## Looker Studio
Connect GA4 + GSC. Use the KPI table in `kpis_dashboard.md`.

## After each production deploy
Ping is optional (Google deprecated the ping endpoint; sitemap fetch is enough):
- Search Console → Sitemaps → resubmit if URLs were added
