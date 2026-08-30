# dhrizza

A single-page personal site, live at [dhrizza.com](https://dhrizza.com) —
drawn rather than designed: warm paper, thin wobbly ink, a field of grass
along the bottom edge, and a few birds that never quite land.

Plain HTML with inline CSS and a little vanilla JS. No build step, no
dependencies, nothing to install.

## Structure

```
index.html            The whole site (styles, markup, and script all inline)
assets/img/           Empty for now — the site is drawn, not photographed
CNAME                 Custom domain for GitHub Pages
.github/workflows/    Pages deploy, runs on every push to main
```

Fonts (EB Garamond for the words, Caveat for anything handwritten) load from
Google Fonts.

## How it's drawn

Every illustration is inline SVG — nothing is an image file.

- **Wobble.** Two SVG filters (`#rough`, `#rough-s`) push each stroke around
  with `feTurbulence` + `feDisplacementMap`, so a straight line never quite is.
- **Grass.** Generated in JS from a seeded RNG: one `<path>` per blade, each
  swaying on its own clock via `--dur` / `--d` / `--a` custom properties.
  Reseeded on resize so the band always fills the width.
- **Trees.** A small recursive branch function — trunk, split, split again,
  blossom at the tips. Same seeded RNG, so the grove looks identical on every
  reload.
- **Birds.** Two arcs each, flapping with `scaleY` while a `drift` keyframe
  carries them across.
- **Torn edges.** Each coloured section starts with a `.tear` SVG filled in
  that section's colour, so the paper looks ripped rather than ruled.
- **Arrival.** An `IntersectionObserver` adds `.in`, which fades sections up
  and lets the ink draw itself in via `pathLength="1"` and `stroke-dashoffset`.

Everything above is switched off under `prefers-reduced-motion: reduce`, and
the page reads fine with JavaScript disabled (a simpler set of trees stands in
for the generated grove, and the grass simply isn't there).

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Pushing to `main` deploys to GitHub Pages via
`.github/workflows/deploy-pages.yml`, which serves the repo root at the domain
in `CNAME`. Nothing to build.

## The friend map

The world map in "a friend in every country" is an inline SVG with one
`<path>` per country, generated from
[Natural Earth](https://www.naturalearthdata.com/) 110m data (public domain)
and projected with Natural Earth 1. Borders are drawn as dashed hairlines;
the countries with a friend in them are inked in. To add one as the list grows:

1. Give its path `class="mc friend"` — paths carry `id="c-<country-name>"`.
2. Add it to the `.countries` list.
3. Update the tally in `.mapkey` and the title note under the heading.

## Still to fill in

- Destinations for the four "still unfinished" cards — they point at `#`.
