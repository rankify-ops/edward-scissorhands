"use client";

import { useLocation } from "@/components/location/LocationProvider";
import { asset } from "@/lib/basePath";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { BookingCard } from "@/components/ui/BookingCard";
import { ArrowDown, Star } from "@/components/ui/Icons";

/*
 * Full-bleed photograph, near-black wash, two columns.
 *
 * The rating leads — 5.0 from 3,000+ reviews is the strongest thing this shop
 * has to say, so it sits above the headline rather than being buried under the
 * buttons. Straight into the line that shouts, then the sentence that has to
 * rank ("longest established barber shop in St Kilda"), both inside the one h1.
 * The year and suburb are carried by the headline and the sub-line already, so
 * there is no eyebrow between them.
 *
 * The booking card takes the right column on desktop and stacks under the CTAs
 * on phones, where the hero is top-aligned and content-height rather than a
 * forced 100svh — a full-height hero on a phone pushes the headline to the
 * bottom of the screen, which is exactly the wrong place for it.
 */
export function Hero() {
  const { shop } = useLocation();

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
          {/* Only St Kilda has a review score to lead with; South Melbourne
              is not a claimed Fresha venue, so it has none to quote. */}
          {shop.rating ? (
            <Reveal className="hero-rating" delay={60}>
              {/* Four real clients off the shop's Fresha portfolio, in colour
                  in both themes — the faces are the proof, not decoration. */}
              <span className="rating-faces" aria-hidden>
                {[1, 2, 3, 4].map((n) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={n}
                    src={asset(`/img/faces/face-${n}.webp`)}
                    alt=""
                    width={160}
                    height={160}
                  />
                ))}
              </span>
              <span className="rating-body">
                <span className="stars stars-lg" aria-hidden>
                  <Star size={20} />
                  <Star size={20} />
                  <Star size={20} />
                  <Star size={20} />
                  <Star size={20} />
                </span>
                {shop.reviewsUrl ? (
                  <a href={shop.reviewsUrl} target="_blank" rel="noopener noreferrer">
                    <strong>Over {shop.rating.count.replace("+", "")}</strong>{" "}
                    5-star reviews
                  </a>
                ) : (
                  <span>
                    <strong>Over {shop.rating.count.replace("+", "")}</strong>{" "}
                    5-star reviews
                  </span>
                )}
              </span>
            </Reveal>
          ) : null}

          <h1 className="hero-title">
            <Reveal variant="mask" as="span" className="display d-xxl" delay={140}>
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
              {shop.blurb}
            </Reveal>
          </h1>

          <Reveal className="hero-actions" delay={500}>
            <a
              className="btn btn-gold btn-block"
              href={shop.booking ?? `tel:${shop.phone}`}
              target={shop.booking ? "_blank" : undefined}
              rel={shop.booking ? "noopener noreferrer" : undefined}
            >
              {shop.booking ? "Book Appointment" : `Call ${shop.phoneDisplay}`}
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
