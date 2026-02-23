# atakanzen.com

Personal website and blog built with [Astro](https://astro.build), deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Stack

- **Framework**: Astro 5 (static output)
- **Styling**: Tailwind CSS 4
- **Interactive**: Solid.js
- **Content**: MDX with remark-gfm, rehype-callouts, Dracula syntax highlighting
- **Fonts**: Jersey 20 (display), Nudica (body), JetBrains Mono (code)
- **Deploy**: Cloudflare Pages via Wrangler

## Commands

| Command          | Action                                      |
| :--------------- | :------------------------------------------ |
| `pnpm install`   | Install dependencies                        |
| `pnpm dev`       | Start local dev server at `localhost:4321`   |
| `pnpm build`     | Build production site to `./dist/`           |
| `pnpm preview`   | Preview build locally                       |
| `pnpm run deploy`| Build and deploy to Cloudflare Pages        |

## Image Compression

Photography images in `public/photographs/` are compressed for web delivery. Original full-resolution files are kept in `public/photographs/originals/` (gitignored).

To re-compress from originals:

```sh
# Requires: dwebp, cwebp (brew install webp), sips (macOS built-in)
cd public/photographs
for f in originals/*.webp; do
  name=$(basename "$f" .webp)
  dwebp "$f" -o "/tmp/${name}.png"
  sips --resampleWidth 1200 "/tmp/${name}.png" --out "/tmp/${name}_resized.png"
  cwebp -q 82 "/tmp/${name}_resized.png" -o "${name}.webp"
  rm -f "/tmp/${name}.png" "/tmp/${name}_resized.png"
done
```

This resizes images to 1200px wide and encodes at WebP quality 82, reducing total size from ~12MB to ~1MB.
