# dhrizza

A single-page personal site, live at [dhrizza.com](https://dhrizza.com).
Plain HTML with inline CSS and a bit of vanilla JS — no build step, no
dependencies, nothing to install.

## Structure

```
index.html            The whole site (styles, markup, and script all inline)
assets/img/           Images — see the README in there
CNAME                 Custom domain for GitHub Pages
.github/workflows/    Pages deploy, runs on every push to main
```

Fonts (Anton, Space Grotesk, JetBrains Mono) load from Google Fonts.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Pushing to `main` deploys to GitHub Pages via
`.github/workflows/deploy-pages.yml`, which serves the repo root at the
domain in `CNAME`. Nothing to build.

## The friend map

The world map in the "A friend in every country" section is an inline SVG
with one `<path>` per country, generated from
[Natural Earth](https://www.naturalearthdata.com/) 110m data (public domain)
and projected with Natural Earth 1. To add a country as the list grows:

1. Give its path `class="mc friend"` — paths carry `id="c-<country-name>"`.
2. Add it to the `.countries` list.
3. Update the tally in `.mapkey`.

## Still to fill in

- Hero picture at `assets/img/portrait.jpg`
- Destination links for the four "Go deeper" cards
