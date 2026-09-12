import { services, site } from "@/content/site";
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
        </div>

        <ul className="menu">
          {services.map((s, i) => (
            <Reveal as="li" key={s.name} className="menu-row" delay={i * 55}>
              <a href={site.booking} target="_blank" rel="noopener noreferrer">
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
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal className="services-foot" delay={120}>
          <p>
            Beard trims, hot towel straight razor shaves and student rates are on
            the full Fresha menu.
          </p>
          <a
            className="btn btn-gold btn-block"
            href={site.booking}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Chair
          </a>
        </Reveal>
      </div>
    </section>
  );
}
