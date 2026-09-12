# Edward Scissorhands Barber Shop

Free sample home page for Edward Scissorhands, 190 Carlisle Street, St Kilda.
Static Next.js export on GitHub Pages.

**Previews — two looks, same site:**

- Gold on black — https://rankify-ops.github.io/edward-scissorhands/
- White monochrome — https://rankify-ops.github.io/edward-scissorhands/white/

## Design brief

The client named two references: [kingsdomain.com.au](https://kingsdomain.com.au)
and [jinandko.com.au](https://www.jinandko.com.au). Both are near-black,
one-accent, huge-display-type barber sites that book through Fresha, so the
skeleton here is theirs:

| Borrowed from | What |
|---|---|
| Kings Domain | Near-black ground, oversized full-stop headlines, pill CTAs in the header, full-screen mobile menu of big stacked links on hairlines |
| Jin & Ko | Scrolling marquee band, prices visible on the page, portrait team grid |

Everything else — the gold, the crest, the copy, the photographs — is the
client's own. Gold is sampled straight out of their logo file (`#DCB52E`
highlights, `#A9800F` shadows, so `--gold` sits between at `#C9A227`).

## The running idea: "the cut"

Rather than bolting on one gimmick, the same gesture repeats at four scales:

1. **The travelling scissors** (`ScrollScissors.tsx`) — a pair of scissors rides
   the left gutter as you read. The line above it is solid gold (cut); below it
   is still perforated. Every 88px of scroll the blades swing 31° off the centre
   line and slam back shut, blade against blade, throwing off hair clippings
   that flutter down. A real snip is not symmetrical, so closing runs at 85ms
   and reopening at 230ms, which is most of what sells it.

   Both halves are drawn **shut** — blade straight up from the rivet, shank
   bending down to its bow — so rotation zero is the closed position and the
   animation only ever opens them. The first version drew them already crossed
   in an X and rotated from there, which left 81° between the blades at its
   tightest: they never actually met, however far it swung.

   Desktop only, and skipped entirely under `prefers-reduced-motion`; nothing in
   it uses React state, so a long page costs a few transform writes per frame.
2. **The blade wipe** (`.snip`) — photographs are revealed behind a travelling
   gold hairline instead of a fade.
3. **Perforated rules** (`.cutline`) — dividers are dashed, not solid.
4. **The menu leader** — hovering a price row runs a small scissors along the
   dotted leader between the service and its price.

### The hero booking card

The rating leads the page — 5.0 from 2,600+ reviews is the strongest thing this
shop has to say, so it sits above the headline rather than under the buttons.
The right of the fold is a native service picker: pick a cut, see what it costs
and how long it takes, then hand off to Fresha.

It has to be native, because **Fresha cannot be embedded**. Their booking page
sends `Content-Security-Policy: frame-ancestors 'self' https://*.fresha.com …`,
so an iframe on the client's own domain renders blank, and there is no public
API. The supported route is a deep link built in the partner dashboard
(Online booking → Link builder), which can target a single service and also
waives Fresha's new-client fee.

Until those links exist, every row opens the main booking page — one extra tap,
nothing broken. Paste a Link builder URL into `url` on a row in
`bookingOptions` and that row goes straight to the service.

The card is a real `radiogroup`: arrow keys move the selection, the group is one
tab stop, and only the CTA navigates. Prices come from
`fresha/services-balaclava.csv` and are shown as "from", because the final
number depends on the barber and the length of the job.

### Where the photography comes from

| Section | Source |
|---|---|
| Hero, Story, Reviews, Visit | The venue shots off the old site, which are higher resolution than the same three on Fresha |
| The Work | The shop's **Fresha portfolio**, pulled at 1200×1200 — six of the nine, leaving out a mannequin training head and two near-duplicates |
| Our Barbers | **Fresha employee avatars**, so the faces match whoever is actually taking bookings |
| From the chair | The shop's **Instagram** |

Fresha's venue page is client-rendered and mixes the shop's own images in with
a "venues nearby" carousel under the same partner account, so the scrape is
filtered on the alt text naming Edward Scissorhands. The `f_width` and
`f_quality` parameters on an `images.fresha.com` URL sit outside the signature,
so the same signed URL serves up to 1200px — worth knowing if more are needed.
Raw downloads are kept in `assets-raw/fresha/`.

### From-the-chair rail

A full-bleed strip of vertical stills off the shop's Instagram sits under the
hero, drifting the opposite way to the gold text band above it. Cards alternate
a small vertical offset so the strip has a pulse rather than a flat edge, and
they desaturate until hovered. Under `prefers-reduced-motion` the drift stops
and it becomes a plain scroll-snap strip — nothing is lost, it just holds still.

## Other moving parts

- **Live OPEN / CLOSED chip** — computed in `Australia/Melbourne`, not the
  visitor's timezone, from the `hours` table in `src/content/site.ts`. Change a
  time there and the chip follows.
- **Schema.org `HairSalon`** in `layout.tsx` — address, per-day opening hours,
  the full price list, all eleven barbers, and a `ReserveAction` pointing at
  Fresha.

## Two looks, one codebase

`NEXT_PUBLIC_THEME` picks the palette at build time and gets stamped onto
`<html data-theme>`; everything else is CSS.

- **`gold`** — the shop's own brass on near-black, the original.
- **`white`** — a monochrome light variation: off-white ground, black ink, no
  accent colour at all, and every photograph desaturated.

Almost all of the white theme is token reassignment. `--gold` simply becomes
ink, so every CTA, rule, marker and the scissors rail turn black without a
single component knowing there is a second theme. Only the handful of rules
that bake in a dark ground — the scrims over photography, the frosted bars, the
marquee band — are restated.

Two things needed real work rather than a token swap:

- **The logo.** The supplied artwork is gold-on-black with *white* letterforms,
  which cannot go on a white page — the letters disappear. The white theme uses
  a desaturated and levelled copy generated from the same source, where the
  brass lands as dark ink (`*-mono.png`, built by the script in the commit).
- **The hero scrim.** The dark theme darkens the photograph under light type.
  The white theme has to do the opposite, and the photograph is a mid-to-dark
  grey frame that fights black type. It is lifted to high key and sat behind a
  *horizontal* scrim rather than the dark theme's angled one — the copy column
  is a fixed band down the left, so its protection has to be a fixed band too.
  Phones get a flat heavy wash instead, since a single column has no clean side
  to hide the photograph in.

The deploy workflow exports the same source twice, each with its own basePath,
and nests the second inside the first so one Pages site serves both.

## Two shops, one codebase

There are two Edward Scissorhands, and to a visitor they are not the same kind
of business:

| | Balaclava / St Kilda | South Melbourne |
|---|---|---|
| Address | 190 Carlisle Street | Clarendon Centre, g11/261 Clarendon St |
| Booking | Fresha, online | **Walk-ins and phone only** |
| Hours | Mon–Fri 9–7, Sat–Sun 9–5 | Mon–Fri 9–6:30, Sat–Sun 9–5 |
| Reviews | 5.0 from 3,000+ | none published |
| Instagram | `@edward_scissorhands_stkilda` | `@edward_scissorhands_barber` |

South Melbourne's Fresha entry is an unclaimed listing that says outright the
business "is not currently affiliated with or partnered with Fresha", so there
is no online booking to link to and no review score to quote. `booking: null`
in `src/content/locations.ts` is what every component keys off: the hero card
becomes a walk-in panel with the phone number, the header CTA becomes "Call the
Shop", the sticky bar becomes "Call Now", and the hero drops the star rating
rather than borrowing St Kilda's.

The switcher is a segmented control rather than a dropdown — with only two
shops, showing both and filling one gold answers "which am I looking at" at a
glance. It appears three times: in the hero booking card, in the mobile menu,
and again at the top of Visit, which is where someone goes when they actually
want to travel somewhere. The choice is remembered in `localStorage` and syncs
across tabs.

The price list and the team grid are St Kilda's — that is the only claimed
Fresha venue, and South Melbourne publishes neither. Rather than show St Kilda's
numbers under a South Melbourne heading, both sections grow a one-line note
saying whose they are (`StKildaOnlyNote`).

### Building the South Melbourne site

Flip one constant:

```ts
// src/content/locations.ts
export const DEFAULT_LOCATION: LocationId = "south-melbourne";
```

That is a build-time default, not a runtime guess, so each shop's own site opens
on itself and the switcher still gets you to the other one. Change the repo name
in `.github/workflows/deploy.yml` and `site.url` to match wherever it deploys.

## Logo lockups

Two are built, switched by `LOGO` in `src/content/site.ts`:

- **`"wide"`** (current) — the horizontal lockup. Sized by width rather than
  height, because at 3.6:1 matching the crest's height would leave it about
  120px across and illegible: 148px wide on phones, 208px from 900px up.
- **`"crest"`** — the round badge, kept as a fallback.

Note the wide artwork reads `SCISSSORHANDS`, with three S's, where the crest,
the Instagram handle and the Fresha listing all spell it `SCISSORHANDS`. The
client has been told and wants it live as-is. Drop a corrected file in at
`public/img/logo-wide.png` and `logo-wide-sm.png` and nothing else changes.

It is not a PNG retouch: the three S glyphs are evenly pitched so one splices
out of the big word cleanly, but the cut runs the full height of the file and
takes the same slice out of `EDWARD` and `BARBER SHOP`, leaving `ÐWARD` and
`BABER SHOP`. It needs the lockup rebuilt.

## Still needed from the client

- [ ] **Two more reviews** off the Fresha wall, to turn the single pull quote
      into a row.
- [ ] **Fresha Link builder URLs** for the five services in the hero card, so
      each row deep-links to its own service instead of the main booking page.
- [ ] Confirm the price list is current. The Services section still carries the
      seven prices off the old site; the hero card uses the fuller Fresha menu
      captured in `fresha/services-balaclava.csv`.
- [ ] **A corrected horizontal logo** — the one in use spells the shop's name
      with three S's. See Logo lockups above.
- [ ] **Which South Melbourne phone number is right.** Three are published:
      +61 489 265 375 (Fresha), 0403 185 329 (Facebook) and (03) 9690 1604
      (Yelp). The site uses the Fresha one, listed there under "Call to book".
- [ ] **South Melbourne prices, team and photography.** Everything on the page
      bar the address, hours and phone is currently St Kilda's, and flagged as
      such when that shop is selected.
- [ ] Phone number — the current site doesn't publish one, so there is no
      click-to-call anywhere on the page.
- [ ] **Higher-resolution team portraits.** Fresha serves employee avatars at
      340×340, which is thin for a grid this size. Originals from the client
      would sharpen the team section noticeably.
- [ ] **Check the Instagram rail.** A couple of the eight stills look like
      reposts rather than shots taken at 190 Carlisle Street. Worth confirming
      before this moves to a live domain — swap any that aren't theirs by
      dropping a 9:16 file into `public/img/chair/` and editing `chairRail` in
      `src/content/site.ts`.

## Running it

```bash
npm install
npm run dev
```

Build the static export exactly as CI does:

```bash
NEXT_PUBLIC_BASE_PATH=/edward-scissorhands npm run build
```

On Git Bash that env var gets rewritten into a Windows path; prefix the command
with `MSYS_NO_PATHCONV=1` if the build output looks wrong.

## Going live on a real domain

Two changes, and they must happen together or every asset 404s:

1. Delete the `NEXT_PUBLIC_BASE_PATH` line from `.github/workflows/deploy.yml`.
2. Add `public/CNAME` containing the bare domain.

## Layout

```
src/
  app/
    globals.css      tokens, type scale, shared primitives, white theme
    components.css   per-section styles
    layout.tsx       fonts, metadata, JSON-LD
    page.tsx         section order
  components/
    location/        LocationProvider, LocationSwitch, BookLink,
                     StKildaOnlyNote
    layout/          Header (incl. full-screen menu), Footer, StickyBar
    sections/        Hero, Marquee, ChairRail, Story, Services, Work,
                     Reviews, Team, Visit
    ui/              ScrollScissors, BookingCard, OpenStatus, Reveal,
                     Photo, Icons
  content/site.ts       brand-level copy, prices, team, galleries
  content/locations.ts  the two shops, and DEFAULT_LOCATION
  lib/theme.ts          THEME, and which logo file each theme uses
fresha/              service, team and variant data captured from the
                     partner dashboard — the source for prices
```

`components.css` is imported at the top of `globals.css`, so its rules land
*before* the primitives and lose ties on specificity. Where a component has to
overrule a primitive it names both classes (`.reviews-quote.display`).
