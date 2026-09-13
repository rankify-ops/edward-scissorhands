/*
 * The four head crops for the hero's review badge — the shop's own barbers,
 * from their Fresha avatars in assets-raw/fresha/. Crop boxes are fractions
 * of each source square — left, top, size — framed on the face.
 */
const sharp = require('sharp');

const jobs = [
  ['t-mateo.jpg', 'face-1', 0.18, 0.04, 0.64],
  ['t-jack.png', 'face-2', 0.18, 0.04, 0.64],
  ['t-max.jpg', 'face-3', 0.18, 0.04, 0.64],
  ['t-vlad.jpg', 'face-4', 0.18, 0.04, 0.64],
];

(async () => {
  for (const [src, name, l, t, sz] of jobs) {
    const file = `assets-raw/fresha/${src}`;
    const { width: S } = await sharp(file).metadata();
    const px = Math.round(sz * S);
    await sharp(file)
      .extract({ left: Math.round(l * S), top: Math.round(t * S), width: px, height: px })
      .resize(160, 160)
      .webp({ quality: 85 })
      .toFile(`public/img/faces/${name}.webp`);
  }
  console.log(`${jobs.length} faces written`);
})();
