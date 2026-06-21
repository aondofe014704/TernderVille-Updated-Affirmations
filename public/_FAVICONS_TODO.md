# Favicon TODO (5 minutes, do once, never again)

The browser tab icon currently uses `logo.png` which works but is suboptimal
on iOS, Windows tiles, and older browsers. Generate proper favicon variants:

## Steps

1. Go to https://realfavicongenerator.net/
2. Upload `public/logo.png` (the file you already have)
3. Configure (defaults are fine, optional tweaks):
   - **iOS:** set background to `#f97316` (Tenderville orange) for the rounded square
   - **Android:** set theme color to `#f97316`
   - **Windows:** set background to `#f97316`
   - **macOS Safari pinned tab:** monochrome, accept default
4. Click "Generate your Favicons and HTML code"
5. Download the ZIP
6. Extract the ZIP and drop ALL files into `public/` (overwrites the placeholders)
7. The included `site.webmanifest` will overwrite ours \u2014 fine, it is generated properly

## What you should end up with in public/

- `favicon.ico` (multi-resolution: 16x16, 32x32, 48x48)
- `favicon-16x16.png`, `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`, `android-chrome-512x512.png`
- `mstile-150x150.png` (Windows)
- `safari-pinned-tab.svg` (monochrome Safari)
- `site.webmanifest`
- `browserconfig.xml`

## After dropping the files

Replace your `app/layout.tsx` icons block to reference them all, or leave the
current setup \u2014 modern browsers will find them by convention even without
explicit references.

## Also: og-image.png

Right now `og-image.png` is just `logo.png` renamed. For proper WhatsApp /
Twitter / Facebook previews you want a real **1200x630** image with the school
name, tagline, and a photo of students. Tools to make one:
- https://www.canva.com/ (free, search "Open Graph image")
- https://og-playground.vercel.app/ (code-based)
- Or have your designer make one

Drop the 1200x630 PNG into `public/og-image.png` (overwrites the placeholder).
