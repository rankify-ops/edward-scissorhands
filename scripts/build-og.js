/*
 * Link-preview cards, 1200x630 JPG (WebP is not reliably read by every
 * messenger's unfurler). The vintage chairs from the hero, darkened toward
 * the edges, with the logo in its own colours across the middle.
 *
 *   og-white.jpg  chairs in full black and white, for the white variation
 *   og-gold.jpg   chairs as the gold site shows them, mostly desaturated
 */
const sharp = require('sharp');

const W = 1200, H = 630;

const vignette = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="v" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.9"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#v)"/>
</svg>`);

async function card(out, saturation) {
  const photo = await sharp('public/img/hero-1600.webp')
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .modulate({ saturation, brightness: 0.95 })
    .toBuffer();
  const logo = await sharp('public/img/logo-wide.png').resize({ width: 760 }).toBuffer();
  const { height: lh } = await sharp(logo).metadata();
  await sharp(photo)
    .composite([
      { input: vignette },
      { input: logo, left: Math.round((W - 760) / 2), top: Math.round((H - lh) / 2) },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(`public/img/${out}`);
  console.log(`wrote ${out}`);
}

(async () => {
  await card('og-white.jpg', 0);
  await card('og-gold.jpg', 0.65);
})();
