import { services } from "@/content/site";
import { BookLink } from "@/components/location/BookLink";
import { StKildaOnlyNote } from "@/components/location/StKildaOnlyNote";
import { Reveal } from "@/components/ui/Reveal";
import { Scissors } from "@/components/ui/Icons";

/*
 * Prices on the page, not behind a booking widget — the one thing both
 * reference sites get right and most barber sites get wrong.
 *
 * Each row is a menu line: name and note left, price right, a perforated
 * leader running between them. Hovering a row draws the leader solid and slides
 * a scissors along it, so the list itself is the cut.
 */
export function Services() {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <div className="section-head">
          <Reveal className="eyebrow">The Menu</Reveal>
          <h2 className="display d-xl">
            <Reveal variant="mask" as="span">
              A cut for every
            </Reveal>
            <Reveal variant="mask" as="span" delay={80}>
              character.
            </Reveal>
          </h2>
          <Reveal className="lede" delay={160}>
            Walk in for a sharp standard cut, settle in for a hot-towel straight
            razor shave, or sit your son in our chair for a classic boys cut.
            Honest pricing, every chair.
          </Reveal>
          <StKildaOnlyNote>
            These are the St Kilda prices. South Melbourne is walk-in only and
            doesn&rsquo;t publish a price list — ask in store.
          </StKildaOnlyNote>
        </div>

        <ul className="menu">
          {services.map((s, i) => (
            <Reveal as="li" key={s.name} className="menu-row" delay={i * 55}>
              <BookLink>
                <span className="menu-name">
                  {s.name}
                  <em>{s.note}</em>
                </span>
                <span className="menu-leader" aria-hidden>
                  <Scissors size={15} />
                </span>
                <span className="menu-price">
                  A${s.price}
                  <span className="menu-cta">Book</span>
                </span>
              </BookLink>
            </Reveal>
          ))}
        </ul>

        <Reveal className="services-foot" delay={120}>
          <p>
            Beard trims, hot towel straight razor shaves and student rates are on
            the full menu at booking.
          </p>
          <BookLink className="btn btn-gold btn-block" walkInLabel="Call the Shop">
            Book a Chair
          </BookLink>
        </Reveal>
      </div>
    </section>
  );
}
