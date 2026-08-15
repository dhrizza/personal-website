# A Digital Wilderness

A personal website built as a *digital wilderness* — a wild patch of the internet
that's tended by hand, not tamed into a feed. Inspired by the [digital gardens](https://www.technologyreview.com/2020/09/03/1007716/digital-gardens-let-you-cultivate-your-own-little-bit-of-the-internet/)
idea, but leaning into the wildness: nature front and center, a landscape you
wander rather than a timeline you scroll, and content that's allowed to be
half-grown.

Everything on the site carries a **growth stage**:

- 🌱 **Seed** — just planted, a rough thought
- 🌿 **Sapling** — taking shape, still growing
- 🌳 **Wildwood** — rooted, but never truly finished

## Structure

```
index.html                   The whole site (single page, anchored sections)
assets/css/main.css          Styles — palette, type, layout, the hero scene
assets/js/main.js            Mobile nav, footer year, and the friend map
assets/js/world-map-data.js  Generated country outlines (don't hand-edit)
tools/gen-map.mjs            Regenerates that file (you'll rarely need it)
```

No build step, no dependencies. It's plain HTML/CSS/JS so it stays easy to
tend and will host anywhere.

## Run it locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Any static host works — GitHub Pages, Netlify, Cloudflare Pages, etc.
For **GitHub Pages**: push to your default branch and enable Pages
(Settings → Pages → deploy from branch, root).

## Make it yours — the placeholders to fill in

Search the code for `TODO` and `[Your Name]`. The main spots:

- **Your name & bio** — the "The Tender" section in `index.html`.
- **A real photo of you** — replace the placeholder SVG in "The Tender"
  (something nature-y fits the theme).
- **Your links** — email, newsletter, GitHub, socials (Tender section + footer).
- **Wanderings** — swap the three placeholder essays for your real writing.
- **Field Notes** — your short, living entries; cross-link them freely.
- **Undergrowth** — your projects and experiments.
- **The friend map** — the country list at the bottom of `index.html` is seeded
  with a few places you've actually spent time. Replace it with your real list
  (see "The friend map" below), and point the "Say hello" link at your email.
- **Hero photo** — self-hosted. Add your photo at **`assets/img/hero.jpg`**
  (see `assets/img/README.md`). The hero loads `../img/hero.jpg` and falls back
  to a moody gradient until the file is present, so the title stays legible
  either way. To restyle the mood later, just replace that file.

## The friend map

The last section of the site (`#friendmap`) is a world map of the countries
where there's a friend, working toward one in every country. A small bar at the
very top of the page (`.beacon`) links straight down to it, because North Korea
is the country hardest to reach and the one most worth an open invitation.

**To add a country, add a line to the list in `index.html`:**

```html
<ul class="friendmap__list" id="friend-countries" data-wanted="North Korea">
  <li>India</li>
  <li>Netherlands</li>
  ...
</ul>
```

That list is the only thing to edit. The map reads it, highlights those
countries in green, and updates the tally underneath ("N countries so far,
M to go", out of 195). Everyday spellings work — `USA`, `UK`, `South Korea`,
`Ivory Coast`, `Czech Republic` all match. If an entry matches nothing, the
browser console says which one, so check there if a country doesn't light up.
Countries too small to draw at this resolution (Singapore, Malta, Mauritius
and friends) appear as dots.

`data-wanted` marks the one country being actively looked for. It's drawn in
ochre with a slow pulse instead of green.

With JavaScript off, the list is still there in plain text — the map is the
decoration, the list is the content.

Country outlines come from [Natural Earth](https://www.naturalearthdata.com/)
(public domain) at 110m, projected with Natural Earth I. To regenerate them:

```bash
cd tools
npm install d3-geo@3 topojson-client@3 world-atlas@2
node gen-map.mjs
```

## Type & color

- Display face: **Fraunces** (soft, organic, a little "wonky")
- Body face: **Newsreader** (warm and literary)
- Palette: dusk sky, forest ink, warm paper, moss green, ochre accent

## Notes

- Fully responsive, keyboard-accessible, and respects `prefers-reduced-motion`.
- Animations (drifting swallows, swaying grass) are subtle and turn off for
  anyone who's asked their system to reduce motion.
