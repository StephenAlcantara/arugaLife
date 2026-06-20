# ArugaLife

A lively, animated landing page for **ArugaLife** — a warm, empathetic Filipino
company that brings together caring services for every season of life. Its flagship
service, **Evera**, is a retirement benefits plan offered in partnership with the
Philippine Retirement Authority (PRA). Soft sage greens, warm cream, and terracotta
accents, with Filipino touches throughout (bahay kubo, bayanihan, swaying palms,
and drifting leaves).

The site ships as a **single self-contained `index.html`** — all styles, scripts,
fonts, and SVG art are inlined into one file. No build step, no external requests,
nothing to break on deploy.

## Files

| File | What it is |
|------|------------|
| `index.html` | The entire site — markup, styles, scripts, fonts, and art, all inlined |
| `vercel.json` | Optional clean-URL config for Vercel |
| `README.md` | This file |

## Features

- **Intro splash** — a 5-second branded loading screen (logo, name, and greeting)
  plays on first paint, then fades away.
- **Scroll reveals** — each section gently fades and rises into view as you scroll.
- **Responsive** — adapts down to small phones, with a slide-in hamburger menu.
- **Single CTA** — every "Start your journey" button scrolls to the sign-up section.
- **Bilingual copy** — language switcher in the navbar.
- **Respects `prefers-reduced-motion`** — animations and drifting leaves disable
  automatically for visitors who set *reduce motion* in their OS.

## Run locally

Just open `index.html` in a browser. Or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to Vercel (via GitHub)

1. Push the files to your repo:
   ```bash
   git add .
   git commit -m "Update ArugaLife site"
   git push
   ```
2. Go to **vercel.com → Add New → Project**, import the repo.
3. Framework preset: **Other** (it's a static site). Leave the build command empty
   and the output directory as the repo root.
4. Click **Deploy**. Vercel serves `index.html` automatically.

> Prefer the CLI? Run `npx vercel` in this folder and follow the prompts.

## Editing

`index.html` is a compiled, self-contained bundle, so it isn't meant to be
hand-edited. To make changes, update the source design and re-export a fresh
`index.html`, then commit it.

- **Evera link** points to the Evera retirement plan site.
- A brief "Unpacking…" splash shows for a moment while the page unpacks itself on
  load — this is normal for a self-contained bundle.

## Accessibility & robustness

- Responsive down to small phones, with a slide-in mobile menu.
- `prefers-reduced-motion` is respected (animations + drifting leaves disabled).
- A thumbnail splash is shown as a no-JS fallback while the page loads.
