# Edward Scissorhands Barber Shop

Free sample home page for Edward Scissorhands, 190 Carlisle Street, St Kilda.
Static Next.js export on GitHub Pages.

**Preview:** https://rankify-ops.github.io/edward-scissorhands/

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
   is still perforated. Every 165px of scroll the blades swing the full 27° and
   slam shut, throwing off hair clippings that flutter down; a real snip is not
   symmetrical, so closing runs at 105ms and reopening at 320ms, which is most
   of what sells it. Desktop only, and skipped entirely under
   `prefers-reduced-motion`; nothing in it uses React state, so a long page costs
   a few transform writes per frame.
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
- [ ] **Second location.** There is a South Melbourne shop (Clarendon Centre,
      g11/261 Clarendon St) with its own Fresha page. This page only covers
      Balaclava; a location switcher and per-location booking links are the
      obvious next step.
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
    globals.css      tokens, type scale, shared primitives
    components.css   per-section styles
    layout.tsx       fonts, metadata, JSON-LD
    page.tsx         section order
  components/
    layout/          Header (incl. full-screen menu), Footer, StickyBar
    sections/        Hero, Marquee, ChairRail, Story, Services, Work,
                     Reviews, Team, Visit
    ui/              ScrollScissors, BookingCard, OpenStatus, Reveal,
                     Photo, Icons
  content/site.ts    every price, name, address and link on the page
fresha/              service, team and variant data captured from the
                     partner dashboard — the source for prices
```

`components.css` is imported at the top of `globals.css`, so its rules land
*before* the primitives and lose ties on specificity. Where a component has to
overrule a primitive it names both classes (`.reviews-quote.display`).
