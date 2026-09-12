/*
 * Every piece of copy, price and name on the page lives here.
 * Sourced from the client's existing site and their Fresha listing —
 * nothing on this page is invented. Anything the client still owes us is
 * marked TODO so it is obvious in review.
 */

export const FRESHA =
  "https://www.fresha.com/en-GB/a/edward-scissorhands-balaclava-st-kilda-barber-melbourne-190-carlisle-street-g3vzbzld";

export const site = {
  name: "Edward Scissorhands Barber Shop",
  shortName: "Edward Scissorhands",
  established: 1991,
  url: "https://rankify-ops.github.io/edward-scissorhands",
  tagline: "The longest established barber shop in St Kilda.",
  booking: FRESHA,
  reviewsUrl: `${FRESHA}?reviews=true`,
  address: {
    street: "190 Carlisle Street",
    suburb: "St Kilda",
    city: "Melbourne",
    state: "VIC",
    postcode: "3182",
  },
  directions:
    "https://www.google.com/maps/dir//Edward+Scissorhands+Barbershop,+190+Carlisle+Street,+St+Kilda,+VIC+3182,+Australia",
  social: {
    instagram: "https://www.instagram.com/edward_scissorhands_stkilda/",
    facebook: "https://www.facebook.com/StKildaBarberShop/",
  },
  rating: { score: "5.0", count: "2,600+", source: "Fresha" },
} as const;

/*
 * Opening hours as [openHour, closeHour] in 24h local time, indexed by
 * JS getDay() — 0 is Sunday. The live OPEN/CLOSED chip in the header reads
 * this directly, so changing a time here changes the chip too.
 */
export const hours: Array<{ label: string; open: number; close: number }> = [
  { label: "Sunday", open: 9, close: 17 },
  { label: "Monday", open: 9, close: 19 },
  { label: "Tuesday", open: 9, close: 19 },
  { label: "Wednesday", open: 9, close: 19 },
  { label: "Thursday", open: 9, close: 19 },
  { label: "Friday", open: 9, close: 19 },
  { label: "Saturday", open: 9, close: 17 },
];

/** The two-line version shown in the footer and the Visit section. */
export const hoursSummary = [
  { days: "Monday — Friday", time: "9am — 7pm" },
  { days: "Saturday & Sunday", time: "9am — 5pm" },
];

export const services = [
  { name: "Standard Haircut", price: 48, note: "Wash, cut and style" },
  { name: "Skin Fade", price: 54, note: "Taken down to the skin, blended clean" },
  { name: "Zero Fade", price: 50, note: "Zero guard through the sides and back" },
  { name: "Scissor Cut / Long Hairstyle", price: 52, note: "Scissor-over-comb, no clippers" },
  { name: "Buzz Cut", price: 28, note: "Clipper only, single length" },
  { name: "Boys Cuts", price: 39, note: "Under 15" },
  { name: "Pensioner Trim", price: 35, note: "Seniors' rate, any day" },
];

export const team = [
  { name: "Mateo", role: "Master Barber", photo: "mateo" },
  { name: "Brandon", role: "Senior Barber", photo: "brandon" },
  { name: "Max", role: "Senior Barber", photo: "max" },
  { name: "Vlad", role: "Senior Barber", photo: "vlad" },
  { name: "Dilan", role: "Barber", photo: "dilan" },
  { name: "Elena", role: "Barber", photo: "elena" },
  { name: "Anna", role: "Barber", photo: "anna" },
  { name: "Wing", role: "Barber", photo: "wing" },
  // TODO client: these three have no portrait on the current site — a photo
  // each and they drop straight into the grid.
  { name: "Marcus J", role: "Barber", photo: null },
  { name: "Christian D", role: "Barber", photo: null },
  { name: "James S", role: "Barber", photo: null },
] as const;

/*
 * Four cuts lead, then the two shop shots. Alt text describes what is
 * actually in each frame — cut-5 is the Carlisle Street storefront in
 * daylight, not a haircut, whatever its filename suggests.
 */
export const gallery = [
  { src: "cut-1", alt: "Skin fade and sharp line up, finished at the chair", tall: true },
  { src: "cut-2", alt: "High fade with a sculpted full beard", tall: true },
  { src: "cut-4", alt: "Textured crop over a tight fade", tall: false },
  { src: "cut-3", alt: "Clean taper through the back and neckline", tall: true },
  { src: "cut-5", alt: "Edward Scissorhands on Carlisle Street in daylight", tall: false },
  { src: "chairs", alt: "Leather chairs and counter tools in the shop", tall: false },
];

/*
 * The drifting rail under the hero, built from the shop's Instagram.
 *
 * The archive in instagram-assets/ warns that a number of posts on the profile
 * are reposted brand campaigns rather than the client's own work, so this list
 * is deliberately narrow: every frame either has Edward Scissorhands branding
 * in it (the shopfront sign, the wall board, a branded tee or apron, a post
 * watermark) or is a close craft shot carrying no other shop's marks.
 *
 * Alt text describes the frame rather than naming anyone — the source posts
 * don't identify the barbers or the clients.
 */
export const chairRail = [
  { src: "chair-1", alt: "The Edward Scissorhands shopfront and lit signage" },
  { src: "chair-2", alt: "A barber in a shop tee working through the sides" },
  { src: "chair-3", alt: "A finished skin fade seen from behind the chair" },
  { src: "chair-4", alt: "A barber in a shop apron cutting through the top" },
  { src: "chair-5", alt: "Mid-cut beneath the shop's service board" },
  { src: "chair-6", alt: "A finished fade and beard line, close up" },
  { src: "chair-7", alt: "Inside the shop under the Edward Scissorhands sign" },
  { src: "chair-8", alt: "Detail work around the ear" },
  { src: "chair-9", alt: "A barber matching a client's reference photo" },
  { src: "chair-10", alt: "A cut in progress on the shop floor" },
];

/*
 * The hero booking card.
 *
 * Fresha cannot be embedded — their booking page sends
 * `frame-ancestors 'self' https://*.fresha.com …`, so an iframe on this domain
 * renders blank, and there is no public API. The supported route is a deep
 * link built in the partner dashboard (Online booking → Link builder), which
 * can target one service and also waives Fresha's new-client fee.
 *
 * So the card is native: the visitor picks here, and we hand off at the last
 * step. Prices and durations are the real ones off the Balaclava menu
 * (fresha/services-balaclava.csv), shown as "from" because the final price
 * depends on the barber and the length of the job.
 *
 * TODO client: paste a Link builder URL into `url` for each row and the card
 * will drop the visitor straight onto that service. Until then every row opens
 * the main booking page, which still works — it just costs one extra tap.
 */
export const bookingOptions = [
  {
    id: "standard",
    name: "Standard Haircut",
    from: 48,
    duration: "25–50 min",
    url: null,
  },
  {
    id: "skin-fade",
    name: "Skin Fade",
    from: 54,
    duration: "30–60 min",
    url: null,
  },
  {
    id: "cut-beard",
    name: "Haircut + Beard",
    from: 77,
    duration: "40–45 min",
    url: null,
  },
  {
    id: "razor-shave",
    name: "Hot Towel Razor Shave",
    from: 50,
    duration: "30–50 min",
    url: null,
  },
  {
    id: "boys",
    name: "Boys Cut",
    from: 39,
    duration: "25–30 min",
    url: null,
  },
] as const;

export const reviews = [
  {
    quote:
      "Best barber in St Kilda by a country mile. Mateo took the time to actually listen to what I wanted and the fade was razor sharp.",
    name: "Tom B.",
    via: "Fresha",
  },
  // TODO client: two more pulled from the Fresha review wall would fill this row.
];

export const nav = [
  { label: "Services", href: "#services" },
  { label: "The Work", href: "#work" },
  { label: "Our Barbers", href: "#team" },
  { label: "Visit", href: "#visit" },
];
