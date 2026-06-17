# Evera

A lively, animated landing page for **Evera**, a warm, empathetic Filipino company
that brings together caring services for every season of life. Its flagship service,
**Aruga Life**, is a retirement benefits plan offered in partnership with the
Philippine Retirement Authority (PRA). Soft sage greens, warm cream, and terracotta
accents, with Filipino touches throughout (bahay kubo, bayanihan, jeepney, swaying
palms, and drifting leaves).

Pure **HTML + CSS + vanilla JS**, no build step, no frameworks, no external
images. Everything is inline animated SVG, so nothing can break on deploy.

## Files

| File | What it is |
|------|------------|
| `index.html` | Page structure & content |
| `styles.css` | All styling, palette, and animations |
| `script.js`  | Scroll reveals, counters, mobile menu, drifting leaves |
| `vercel.json` | Optional clean-URL config for Vercel |

## Run locally

Just open `index.html` in a browser. Or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to Vercel (via GitHub)

1. Create a new repo on GitHub and push these files:
   ```bash
   git init
   git add .
   git commit -m "Evera landing page"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. Go to **vercel.com → Add New → Project**, import the repo.
3. Framework preset: **Other** (it's a static site). Leave build command empty
   and output directory as the repo root.
4. Click **Deploy**. Done. Vercel serves `index.html` automatically.

> Prefer the CLI? Run `npx vercel` in this folder and follow the prompts.

## Customizing

- **Colors** live as CSS variables at the top of `styles.css` (`:root`).
- **Copy** is all in `index.html`.
- **Founders**: the six placeholders are named "Founder 1" to "Founder 6" with a
  silhouette avatar each. Swap the names, roles, and (later) photos in the
  `.founders__grid` block of `index.html`. To use a photo, replace the inline
  `<svg>` inside `.founder__avatar` with an `<img>`.
- **Aruga Life link** points to `https://evera-arugalife.vercel.app` (the
  "Explore Aruga Life" button in the services section).
- **Animations** are toggled off automatically for visitors who set
  *reduce motion* in their OS.

## Accessibility & robustness

- Responsive down to small phones, with a slide-in mobile menu.
- Keyboard focus is visible; service and founder cards are focusable.
- The custom cursor only appears on devices with a real mouse (fine pointer) and
  is skipped under *reduce motion*; touch and keyboard users keep the native cursor.
- `prefers-reduced-motion` is respected (animations + drifting leaves disabled).
- If JavaScript is disabled, all content still shows (no-JS fallback included).


