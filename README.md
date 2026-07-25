# Personal website

A single-page static site. One `index.html`, one `style.css`, and a few
lines of inline JS for the scroll-reveal effect. No build step, no framework.

- Near-black with one vivid accent, Space Grotesk + Space Mono, film-grain
  texture, fade/slide-in on scroll (respects reduced-motion).
- Sections have anchor IDs for deep links: `#worlds`, `#ai`, `#personal`,
  `#contact`.
- Search `index.html` for `TODO` to find the social-link placeholders
  (X, Instagram, GitHub) that still need real URLs.

## Preview locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

**Vercel:** `npm i -g vercel && vercel` from this folder, or import the repo
at vercel.com. No configuration needed; it detects a static site.

**Netlify:** drag this folder onto app.netlify.com/drop, or connect the repo.
Build command: none. Publish directory: `/` (root).

**Custom domain:** add the domain in your host's dashboard and point your
DNS at it (both hosts walk you through the exact records).
