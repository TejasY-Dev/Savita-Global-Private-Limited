# Savita Global website update — deployment checklist

## What this source update changes

- Uses one route-aware SEO metadata manager in `src/App.tsx` so each public route sets its own title, description, canonical URL, Open Graph tags and robots directive.
- Adds `/buyer-guides` and `/privacy-policy` pages and includes them in the sitemap and site navigation/footer.
- Adds unique self-hosted illustrative SVG artwork for each catalogue item in vegetables, fruit products, snacks, bulk ingredients and towels/napkins.
- Improves product image alternative text, lazy loading and responsive image cards.
- Removes the duplicate AdSense loader from `index.html` and removes an unsupported footer claim that the company is “FSSAI, APEDA & IEC certified”.
- Keeps the existing enquiry form, API routes and dashboard files in place.

## Before pushing

1. Review every product form/specification and confirm that illustrative examples are still clearly labelled as examples.
2. Open the source project in the folder you use for GitHub/Vercel deployment.
3. Run `npm ci` (or `npm install` if `npm ci` cannot complete), then `npm run build`.
4. Fix any build error before publishing. Do not copy any `.env` file into a public repository.
5. Review the live site after Vercel finishes deploying: open all public routes, submit a test enquiry if safe to do so, and confirm the existing API still works.
6. View the live DOM and check `<title>`, `meta[name="description"]`, and `link[rel="canonical"]` on at least `/`, `/about`, `/bulk-food-ingredients`, `/value-added-snacks`, and `/towels-napkins`.
7. Open `/sitemap.xml` and `/robots.txt`. Confirm the sitemap loads and the robots rules do not block the site.

## Before requesting another AdSense review

- Verify that each page offers useful, distinct content and that examples are not presented as confirmed inventory, tests, certificates, buyers or completed exports.
- Review contact details, About content, privacy disclosures and all navigation links.
- Review Google AdSense Policy Center and address any other warnings shown in the account.
- If your site is intended to serve ads to people in the EEA, UK or Switzerland, check Google's current consent requirements and configure an eligible consent management platform through AdSense Privacy & messaging as appropriate. A policy page alone does not replace a required consent message.
- Request another review only after the changes are live and the site has been checked. Code changes cannot guarantee AdSense approval.

## Product artwork

Catalogue-card assets under `public/products/` are original SVG illustrations, not supplier product photography. Ask suppliers for current photographs, samples, specifications and applicable documents before making product commitments.
