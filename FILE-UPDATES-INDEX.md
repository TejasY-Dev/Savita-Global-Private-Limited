# Savita Global — exact file updates

This update archive preserves the repository-relative paths. Extract it over the existing repository folder and allow the included files to replace matching files. Keep your existing `.git` directory and local environment files; this archive intentionally contains no `.env` files, `node_modules`, or build output.

## Corrected existing code

- `index.html` — removes the duplicate AdSense loader, updates default SEO text, and adds Organization JSON-LD. The wrong site-wide static canonical tag is removed; the React app now sets the canonical URL for each route.
- `src/App.tsx` — one route-aware metadata manager for title, description, robots, canonical URL and social metadata; private account/admin routes receive `noindex`.
- `src/components/CatalogGrid.tsx` — adds responsive product-specific catalogue illustrations and alt text.
- `src/components/CategoryHero.tsx` — supports a meaningful image alt text.
- `src/components/CTA.tsx` — covers food products and home textiles, not just dehydrated products.
- `src/components/Navbar.tsx` and `src/components/Footer.tsx` — add Buyer Guides and the Privacy Policy, expose key routes, and remove an unsupported certification claim.
- `src/pages/Home.tsx` — adds original buyer-enquiry guidance and a link to the B2B guides.
- `src/pages/DehydratedVegetables.tsx`, `DehydratedFruits.tsx`, `ValueAddedSnacks.tsx`, `BulkFoodIngredients.tsx`, `TowelsNapkins.tsx` — add distinct product-specific illustrations; remove conflicting page-level metadata effects so the central SEO manager stays consistent.
- `src/pages/Contact.tsx`, `ExportProcess.tsx`, `QualitySystem.tsx` — remove conflicting page-local metadata effects; the route-aware SEO manager now sets those metadata fields.
- `public/sitemap.xml` — adds the two new public pages and updates the listed public-page last-modified date.

## New pages and assets

- `src/pages/BuyerGuides.tsx` — original practical B2B enquiry checklists for dehydrated foods, snacks, spices and textiles.
- `src/pages/PrivacyPolicy.tsx` — website privacy, form, analytics and advertising disclosures; review it against your actual operating practices before relying on it as a legal document.
- `public/products/` — original self-hosted SVG product illustrations, each with an individual file and accessible alt text in the catalogue. These are illustrations, not photos of confirmed supplier inventory.
- `DEPLOY_AND_ADSENSE_CHECKLIST.md` — local build, deployment, SEO and AdSense re-review checks.

## Validation status

- 29 TypeScript/TSX source files passed syntax transpilation checks.
- All 35 SVG files passed XML parsing.
- All 36 catalogue image references resolve to an asset.
- The sitemap parsed as valid XML and the AdSense loader appears once in `index.html`.
- A full Vite/TypeScript build could not be completed in the packaging environment because dependency installation failed. Run `npm ci` and `npm run build` on your development machine before pushing.
