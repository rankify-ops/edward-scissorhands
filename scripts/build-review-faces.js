/*
 * The four head crops for the hero's review badge, cut from the Fresha
 * portfolio shots in assets-raw/fresha/. Crop boxes are fractions of the
 * 1200px square source — left, top, size — framed on each client's head.
 */
const sharp = require('sharp');

const jobs = [
  ['fp-8.jpg', 'face-1', 0.26, 0.20, 0.46],
  ['fp-4.jpg', 'face-2', 0.08, 0.08, 0.66],
  ['fp-9.jpg', 'face-3', 0.30, 0.26, 0.56],
  ['fp-7.jpg', 'face-4', 0.26, 0.18, 0.50],
];

(async () => {
  const S = 1200;
  for (const [src, name, l, t, sz] of jobs) {
    const px = Math.round(sz * S);
    await sharp(`assets-raw/fresha/${src}`)
      .extract({ left: Math.round(l * S), top: Math.round(t * S), width: px, height: px })
      .resize(160, 160)
      .webp({ quality: 85 })
      .toFile(`public/img/faces/${name}.webp`);
  }
  console.log(`${jobs.length} faces written`);
})();
