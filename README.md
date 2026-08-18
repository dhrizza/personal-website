# Dhruv

A single-page personal site. Plain HTML with inline CSS and a bit of vanilla JS —
no build step, no dependencies, nothing to install.

## Structure

```
index.html   The whole site (styles, markup, and script all inline)
```

Fonts (Anton, Space Grotesk, JetBrains Mono) load from Google Fonts.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Any static host works — GitHub Pages, Netlify, Cloudflare Pages, etc.
For **GitHub Pages**: push to your default branch and enable Pages
(Settings → Pages → deploy from branch, root).

## Still to fill in

The site marks its own gaps with `+ TODO`-style tags. Currently:

- Vlog link URL in the History section
- Destination links for the four "Go deeper" cards
