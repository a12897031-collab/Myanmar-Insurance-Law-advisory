# Apex Legal & Insurance Advisory Myanmar

A modern, responsive, single-page legal advisory website prototype built with HTML5, CSS3 and vanilla JavaScript.

## Run locally

Serve this folder with any static web server, for example:

```sh
python3 -m http.server 3000
```

Open `http://localhost:3000`. The page uses a locally included SVG skyline fallback, so its layout remains usable without the Manus-managed preview artwork.

## Project files

- `index.html` — semantic page structure, metadata, framework overview, service cards, resources, estimator and consultation form.
- `styles.css` — responsive visual system, typography, layout and accessibility states.
- `script.js` — navigation, service expansions, resource filters, advisory checklist estimator and confirmation dialog.
- `assets/yangon-hero-fallback.svg` — self-contained local hero illustration.
- `public/apex-mark.svg` — custom firm monogram and site icon.
- `manus-routes.json` — route manifest for the one-page website.
- `app.config.ts` — Manus project brand mark metadata.

## Important notes

The consultation form validates the requested fields and opens a confirmation dialog, but does not transmit or retain submissions. The estimator provides an illustrative review-priority score and checklist; it is not a legal opinion, premium calculation or measured risk score. Legal content is general information only. Verify current primary materials, notices and approvals for the relevant facts before acting. The live preview may show additional generated hero artwork served from a Manus-managed URL; the ZIP includes a local illustration fallback.
