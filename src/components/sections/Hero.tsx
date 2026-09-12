import { site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { ArrowDown, Star } from "@/components/ui/Icons";

/*
 * Full-bleed photograph, near-black wash, one enormous line of type — the
 * Kings Domain opening, with the client's own claim in it.
 *
 * The h1 carries both halves: the short line does the shouting, and the longer
 * one under it is the sentence that actually has to rank ("longest established
 * barber shop in St Kilda"). Both sit inside the one heading element.
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
        <Reveal className="eyebrow hero-eyebrow" delay={80}>
          Est. 1991 — {site.address.suburb}, {site.address.city}
        </Reveal>

        <h1 className="hero-title">
          <Reveal variant="mask" as="span" className="display d-xxl" delay={140}>
            Sharp since
          </Reveal>
          <Reveal
            variant="mask"
            as="span"
            className="display d-xxl hero-line-gold"
            delay={220}
          >
            1991.
          </Reveal>
          <Reveal as="span" className="hero-sub" delay={420}>
            The longest established barber shop in St Kilda — bespoke
            transformations from skilled, friendly barbers.
          </Reveal>
        </h1>

        <Reveal className="hero-actions" delay={520}>
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

        <Reveal className="hero-proof" delay={620}>
          <span className="stars" aria-hidden>
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </span>
          <a href={site.reviewsUrl} target="_blank" rel="noopener noreferrer">
            <strong>{site.rating.score}</strong> from {site.rating.count} reviews on{" "}
            {site.rating.source}
          </a>
          <span className="hero-proof-sep" aria-hidden />
          <OpenStatus />
        </Reveal>
      </div>

      <a className="hero-cue" href="#story" aria-label="Skip to the story">
        <ArrowDown />
      </a>
    </section>
  );
}
