/*
 * The two shops.
 *
 * They are not the same kind of business to a visitor: Balaclava / St Kilda is
 * a full Fresha venue with online booking, a price list and 3,000+ reviews;
 * South Melbourne sits inside the Clarendon Centre and takes walk-ins and phone
 * calls only — its Fresha entry is an unclaimed listing that says outright the
 * business "is not currently affiliated with or partnered with Fresha", so
 * there is no online booking to link to and no review score to quote.
 *
 * Everything that differs between them lives here, and `booking: null` is what
 * every component keys off to switch from "book online" to "walk in or call".
 *
 * DEFAULT_LOCATION is a build-time constant, not a runtime guess. This build
 * opens on St Kilda; the South Melbourne site is the same codebase with the
 * constant flipped, so each shop's own page leads with itself.
 */

export type LocationId = "st-kilda" | "south-melbourne";

export const DEFAULT_LOCATION: LocationId = "st-kilda";

const ST_KILDA_FRESHA =
  "https://www.fresha.com/en-GB/a/edward-scissorhands-balaclava-st-kilda-barber-melbourne-190-carlisle-street-g3vzbzld";

export interface Shop {
  id: LocationId;
  /** Short label for the switcher. */
  name: string;
  /** Fuller name, for headings and the address block. */
  label: string;
  address: {
    line1: string;
    line2?: string;
    suburb: string;
    city: string;
    state: string;
    postcode: string;
  };
  directions: string;
  /** [open, close] in decimal local hours, indexed by JS getDay() — 0 is Sunday. */
  hours: Array<{ label: string; open: number; close: number }>;
  hoursSummary: Array<{ days: string; time: string }>;
  /** Null where the shop takes no online bookings. */
  booking: string | null;
  reviewsUrl: string | null;
  rating: { score: string; count: string } | null;
  /** E.164 for the href; the display string is what a human reads. */
  phone: string | null;
  phoneDisplay: string | null;
  social: { instagram: string; facebook: string };
  /** The one-line claim under the hero headline. */
  blurb: string;
  /** Headline stat for the Story band. */
  stat: { value: string; label: string };
}

export const shops: Shop[] = [
  {
    id: "st-kilda",
    name: "St Kilda",
    label: "Balaclava / St Kilda",
    address: {
      line1: "190 Carlisle Street",
      suburb: "St Kilda",
      city: "Melbourne",
      state: "VIC",
      postcode: "3182",
    },
    directions:
      "https://www.google.com/maps/dir//Edward+Scissorhands+Barbershop,+190+Carlisle+Street,+St+Kilda,+VIC+3182,+Australia",
    hours: [
      { label: "Sunday", open: 9, close: 17 },
      { label: "Monday", open: 9, close: 19 },
      { label: "Tuesday", open: 9, close: 19 },
      { label: "Wednesday", open: 9, close: 19 },
      { label: "Thursday", open: 9, close: 19 },
      { label: "Friday", open: 9, close: 19 },
      { label: "Saturday", open: 9, close: 17 },
    ],
    hoursSummary: [
      { days: "Monday — Friday", time: "9am — 7pm" },
      { days: "Saturday & Sunday", time: "9am — 5pm" },
    ],
    booking: ST_KILDA_FRESHA,
    reviewsUrl: `${ST_KILDA_FRESHA}?reviews=true`,
    rating: { score: "5.0", count: "3,000+" },
    // TODO client: no phone number is published for St Kilda anywhere.
    phone: null,
    phoneDisplay: null,
    social: {
      instagram: "https://www.instagram.com/edward_scissorhands_stkilda/",
      facebook: "https://www.facebook.com/StKildaBarberShop/",
    },
    blurb:
      "The longest established barber shop in St Kilda — bespoke transformations from skilled, friendly barbers.",
    stat: { value: "34", label: "Years on Carlisle St" },
  },
  {
    id: "south-melbourne",
    name: "South Melbourne",
    label: "South Melbourne",
    address: {
      line1: "Clarendon Centre",
      line2: "g11/261 Clarendon Street",
      suburb: "South Melbourne",
      city: "Melbourne",
      state: "VIC",
      postcode: "3205",
    },
    directions:
      "https://maps.google.com/?daddr=Clarendon%20Centre%2C%20g11%2F261%20Clarendon%20St%2C%20South%20Melbourne%20VIC%203205%2C%20Australia",
    hours: [
      { label: "Sunday", open: 9, close: 17 },
      { label: "Monday", open: 9, close: 18.5 },
      { label: "Tuesday", open: 9, close: 18.5 },
      { label: "Wednesday", open: 9, close: 18.5 },
      { label: "Thursday", open: 9, close: 18.5 },
      { label: "Friday", open: 9, close: 18.5 },
      { label: "Saturday", open: 9, close: 17 },
    ],
    hoursSummary: [
      { days: "Monday — Friday", time: "9am — 6:30pm" },
      { days: "Saturday & Sunday", time: "9am — 5pm" },
    ],
    // Walk-ins and phone only — see the note at the top of this file.
    booking: null,
    reviewsUrl: null,
    rating: null,
    // TODO client: three different numbers are published for this shop —
    // +61 489 265 375 (Fresha), 0403 185 329 (Facebook) and (03) 9690 1604
    // (Yelp). This is the one Fresha lists under "Call to book".
    phone: "+61489265375",
    phoneDisplay: "0489 265 375",
    social: {
      instagram: "https://www.instagram.com/edward_scissorhands_barber/",
      facebook: "https://www.facebook.com/BarberSouthMelbourne/",
    },
    blurb:
      "Inside the Clarendon Centre — walk in for a sharp cut from the same team, seven days a week.",
    stat: { value: "7", label: "Days a week" },
  },
];

export const shopById = (id: LocationId): Shop =>
  shops.find((s) => s.id === id) ?? shops[0];

export const defaultShop = shopById(DEFAULT_LOCATION);
