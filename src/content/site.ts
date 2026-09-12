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
  rating: { score: "5.0", count: "3,000+" },
} as const;

/*
 * Opening hours as [openHour, closeHour] in 24h local time, indexed by
 * JS getDay() — 0 is Sunday. The live OPEN/CLOSED chip in the header reads
 * this directly, so changing a time here changes the chip too.
 */
/*
 * Which logo lockup the header and footer use.
 *
 *   "crest"  the round badge — tall and square, so it renders small in a
 *            76-88px bar
 *   "wide"   the horizontal lockup — far better proportioned for a header,
 *            and what the client asked for
 *
 * Note the wide artwork reads SCISSSORHANDS, with three S's, where the crest,
 * the Instagram handle and the Fresha listing all spell it SCISSORHANDS. The
 * client has been told and wants it live regardless; swap in a corrected file
 * at public/img/logo-wide*.png and nothing else needs to change.
 */
export const LOGO: "crest" | "wide" = "wide";

export const logos = {
  crest: { header: "/img/logo-sm.png", footer: "/img/logo.png", headerH: [44, 56] },
  wide: { header: "/img/logo-wide-sm.png", footer: "/img/logo-wide.png", headerH: [26, 34] },
} as const;

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

/*
 * The current roster, taken from the shop's own Fresha listing along with each
 * barber's portrait — Fresha is the booking system, so it is the authority on
 * who is actually cutting. It lists eight; the old site listed eleven, five of
 * whom no longer appear (Brandon, Wing, Marcus J, Christian D, James S) and
 * three of whom had only a grey stock silhouette. Roles come from the team
 * export in fresha/team-balaclava.csv, with "Barber" where it was blank.
 */
/*
 * Typed rather than `as const`: every barber has a portrait today, so a const
 * assertion would narrow `photo` to a union of strings and make the monogram
 * fallback in Team.tsx unreachable — which TypeScript then rejects. Declaring
 * the field nullable keeps that path valid for the next barber who joins
 * before their photo does.
 */
export const team: Array<{ name: string; role: string; photo: string | null }> = [
  { name: "Pablo", role: "Barber", photo: "pablo" },
  { name: "Mateo", role: "Pro Barber", photo: "mateo" },
  { name: "Jack", role: "Barber", photo: "jack" },
  { name: "Max", role: "Professional Barber", photo: "max" },
  { name: "Vlad", role: "Pro Barber", photo: "vlad" },
  { name: "Dilan", role: "Pro Barber", photo: "dilan" },
  { name: "Elena", role: "Senior Barber", photo: "elena" },
  { name: "Anna", role: "Pro Barber", photo: "anna" },
];

/*
 * Straight off the shop's Fresha portfolio at 1200px — real finished cuts
 * rather than the mixed bag the old site carried. Three of the six have the
 * branded wall in frame, which does the "this is actually us" work for free.
 */
export const gallery = [
  { src: "work/w-4", alt: "Tight skin fade finished in the chair", tall: true },
  { src: "work/w-1", alt: "Slicked-back cut with a high disconnected fade", tall: true },
  { src: "work/w-5", alt: "A client in the chair at 190 Carlisle Street", tall: false },
  { src: "work/w-2", alt: "Modern mullet with a clean taper through the sides", tall: true },
  { src: "work/w-3", alt: "Blonde quiff with a scissor-cut top", tall: false },
  { src: "work/w-6", alt: "Textured crop over a low fade", tall: false },
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
