# Savita Global homepage animation update

## Files changed
- `src/pages/Home.tsx`: adds the new homepage hero motion details and scroll reveal wrappers to homepage content and cards.
- `src/index.css`: adds lightweight CSS-only hero movement, decorative orbital lines, reveal transitions, and hover states; respects reduced-motion preferences.
- `src/components/ScrollReveal.tsx`: new dependency-free IntersectionObserver reveal component.

## Install and test locally (Windows PowerShell)
1. Back up the current repository or create a Git branch before replacing files.
2. Copy these three files into the matching locations in your existing repository.
3. In PowerShell, run `npm.cmd install` if dependencies are not installed.
4. Run `npm.cmd run build` and resolve any reported errors before pushing.
5. Run `npm.cmd run dev`, inspect the homepage on desktop and mobile, then push to GitHub for Vercel deployment.

No new npm dependency is required. Existing API routes, Supabase integrations, analytics, SEO metadata and admin files are left unchanged.
