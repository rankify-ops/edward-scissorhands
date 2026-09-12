import { site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { BookingCard } from "@/components/ui/BookingCard";
import { ArrowDown, Star } from "@/components/ui/Icons";

/*
 * Full-bleed photograph, near-black wash, two columns.
 *
 * The rating leads — 5.0 from 2,600+ reviews is the strongest thing this shop
 * has to say, so it sits above the headline rather than being buried under the
 * buttons. Then the line that shouts, then the sentence that has to rank
 * ("longest established barber shop in St Kilda"), both inside the one h1.
 *
 * The booking card takes the right column on desktop and stacks under the CTAs
 * on phones, where the hero is top-aligned and content-height rather than a
 * forced 100svh — a full-height hero on a phone pushes the headline to the
 * bottom of the screen, which is exactly the wrong place for it.
 */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-media">
        <Photo
          name="hero"
          alt="Vintage leather and chrome barber chairs at Edward Scissorhands"
          widths={[900, 1600]}
          sizes="100vw"
          priority
        />
        <span className="hero-wash" />
      </div>

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <Reveal className="hero-rating" delay={60}>
            <span className="stars" aria-hidden>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </span>
            <a href={site.reviewsUrl} target="_blank" rel="noopener noreferrer">
              <strong>{site.rating.score}</strong> from {site.rating.count} reviews
              on {site.rating.source}
            </a>
          </Reveal>

          <Reveal className="eyebrow hero-eyebrow" delay={120}>
            Est. 1991 — {site.address.suburb}, {site.address.city}
          </Reveal>

          <h1 className="hero-title">
            <Reveal variant="mask" as="span" className="display d-xxl" delay={180}>
              Sharp since
            </Reveal>
            <Reveal
              variant="mask"
              as="span"
              className="display d-xxl hero-line-gold"
              delay={260}
            >
              1991.
            </Reveal>
            <Reveal as="span" className="hero-sub" delay={420}>
              The longest established barber shop in St Kilda — bespoke
              transformations from skilled, friendly barbers.
            </Reveal>
          </h1>

          <Reveal className="hero-actions" delay={500}>
            <a
              className="btn btn-gold btn-block"
              href={site.booking}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Appointment
            </a>
            <a className="btn btn-ghost btn-block" href="#services">
              See the Menu
            </a>
          </Reveal>
        </div>

        <Reveal className="hero-card" delay={360}>
          <BookingCard />
        </Reveal>
      </div>

      <a className="hero-cue" href="#story" aria-label="Skip to the story">
        <ArrowDown />
      </a>
    </section>
  );
}
