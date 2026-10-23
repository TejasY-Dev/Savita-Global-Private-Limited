# Savita Global — Prajakta-inspired website refresh

This is a visual and content-structure refresh for Savita Global Private Limited. It uses the reference website's broad section rhythm—rotating hero, category gallery, quality approach, reasons to work with the company, buyer applications, sourcing flow, and buyer resources—while retaining Savita's own identity, products, contact details and wording.

## What changed

- Reworked the homepage into an editorial B2B sourcing landing page.
- Added six large visual category cards for dehydrated vegetables, dehydrated fruits, value-added snacks, bulk food ingredients, export supply services, and towels & napkins.
- Added a compact animated information strip, a quality/sourcing section, capability cards, buyer application areas, a four-step enquiry flow and practical buyer guide cards.
- Rebuilt the navigation with a contact strip, Products dropdown, mobile menu and enquiry CTA.
- Extended the visual system with responsive layouts, section reveals, image hover treatments, hover/focus states and reduced-motion handling.
- Updated homepage title and browser theme colour.
- Avoided inventing certifications, customer logos, client counts, export volumes or other business claims.

## Apply the patch to your existing repository

1. Back up your repository or make a Git commit before replacing files.
2. Extract `Savita-Global-Prajakta-Style-Refresh-Patch.zip` into the root of your existing project, preserving the included `src/...` paths. Allow matching files to be replaced.
3. Keep your own `.env` / Vercel / Supabase configuration intact. No secrets are included in this patch.
4. In Windows PowerShell, run:

   ```powershell
   npm.cmd install
   npm.cmd run build
   npm.cmd run dev
   ```

5. Check the homepage and inner pages at desktop and mobile widths, test the Product dropdown, enquiry form, phone/email links, admin login and accounts pages. Only deploy after the build and checks pass.
6. Commit and push the changed source to the branch connected to Vercel. Vercel should then build the deployment using the repository's configured project settings.

## Full source archive

The full source ZIP contains the project source and static public images, but intentionally excludes `node_modules`, `.git`, generated `dist` output and `.env*` files. If you use it as a replacement copy, preserve your existing local environment values and verify the Vercel project settings before deployment.

## Verification status

The edited TypeScript/JSX files passed a syntax transpilation check and the CSS parsed successfully. A full production build could not be verified in the preparation environment because `npm ci` timed out before dependencies were installed. Please run the build locally before pushing.
