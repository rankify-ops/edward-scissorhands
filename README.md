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
   is still perforated. The blades snip shut every 260px of scroll and throw off
   hair clippings that flutter down. Desktop only, and skipped entirely under
   `prefers-reduced-motion`; nothing in it uses React state, so a long page costs
   a few transform writes per frame.
2. **The blade wipe** (`.snip`) — photographs are revealed behind a travelling
   gold hairline instead of a fade.
3. **Perforated rules** (`.cutline`) — dividers are dashed, not solid.
4. **The menu leader** — hovering a price row runs a small scissors along the
   dotted leader between the service and its price.

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

## Still needed from the client

- [ ] **Portraits for Marcus J, Christian D and James S.** The current site has
      the grey stock silhouette for all three; rather than ship that, those
      cards fall back to a gold monogram. Photos drop straight in — add the file
      to `public/img/team/` and set `photo` in `src/content/site.ts`.
- [ ] **Two more reviews** off the Fresha wall, to turn the single pull quote
      into a row.
- [ ] **Higher-resolution team photos** — the ones on the current site are
      340×340 avatars, which is thin for a large grid.
- [ ] Confirm the price list is current (taken from the existing site).
- [ ] Phone number — the current site doesn't publish one, so there is no
      click-to-call anywhere on the page.
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
    ui/              ScrollScissors, OpenStatus, Reveal, Photo, Icons
  content/site.ts    every price, name, address and link on the page
```

`components.css` is imported at the top of `globals.css`, so its rules land
*before* the primitives and lose ties on specificity. Where a component has to
overrule a primitive it names both classes (`.reviews-quote.display`).
