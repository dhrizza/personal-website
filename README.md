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
index.html            The whole site (single page, anchored sections)
assets/css/main.css   Styles — palette, type, layout, the hero scene
assets/js/main.js     Mobile nav + footer year (that's it — no framework)
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

Any static host works, but this repo is wired for **GitHub Pages** out of the
box via `.github/workflows/pages.yml`: every push to `main` publishes the site.
There's no build step — the workflow uploads the repo as-is.

One-time setup: **Settings → Pages → Source: GitHub Actions**. That's it.

To point a domain at it, add it under **Settings → Pages → Custom domain**, then
at your registrar create either four `A` records on `@` (`185.199.108.153`,
`185.199.109.153`, `185.199.110.153`, `185.199.111.153`) for an apex domain, or
one `CNAME` on `www` → `dhrizza.github.io`. Tick **Enforce HTTPS** once the
certificate provisions. With the Actions source, the custom domain lives in the
Pages settings — no `CNAME` file in the repo to keep in sync.

## Make it yours — the placeholders to fill in

Search the code for `TODO` and `[Your Name]`. The main spots:

- **Your name & bio** — the "The Tender" section in `index.html`.
- **A real photo of you** — replace the placeholder SVG in "The Tender"
  (something nature-y fits the theme).
- **Your links** — email, newsletter, GitHub, socials (Tender section + footer).
- **Wanderings** — swap the three placeholder essays for your real writing.
- **Field Notes** — your short, living entries; cross-link them freely.
- **Undergrowth** — your projects and experiments.
- **Hero photo** — self-hosted. Add your photo at **`assets/img/hero.jpg`**
  (see `assets/img/README.md`). The hero loads `../img/hero.jpg` and falls back
  to a moody gradient until the file is present, so the title stays legible
  either way. To restyle the mood later, just replace that file.

## Type & color

- Display face: **Fraunces** (soft, organic, a little "wonky")
- Body face: **Newsreader** (warm and literary)
- Palette: dusk sky, forest ink, warm paper, moss green, ochre accent

## Notes

- Fully responsive, keyboard-accessible, and respects `prefers-reduced-motion`.
- Animations (drifting swallows, swaying grass) are subtle and turn off for
  anyone who's asked their system to reduce motion.
