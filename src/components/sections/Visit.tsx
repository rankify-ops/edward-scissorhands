import { hoursSummary, site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { Clock, Pin } from "@/components/ui/Icons";

/*
 * Address, hours and the closing CTA in one block. The live status chip sits
 * next to the hours rather than under them, so "open now" is read as part of
 * the same fact.
 */
export function Visit() {
  const { street, suburb, city, state, postcode } = site.address;

  return (
    <section className="section visit" id="visit">
      <div className="wrap visit-grid">
        <div className="visit-copy">
          <Reveal className="eyebrow">Visit Us</Reveal>
          <h2 className="display d-xl">
            <Reveal variant="mask" as="span">
              Walk in.
            </Reveal>
            <Reveal variant="mask" as="span" delay={80}>
              Or book ahead.
            </Reveal>
          </h2>

          <Reveal className="visit-facts" delay={160}>
            <div className="visit-fact">
              <span className="visit-fact-head">
                <Pin size={18} />
                Address
              </span>
              <a href={site.directions} target="_blank" rel="noopener noreferrer">
                {street}
                <br />
                {suburb}, {city} {state} {postcode}
              </a>
            </div>

            <div className="visit-fact">
              <span className="visit-fact-head">
                <Clock size={18} />
                Hours
              </span>
              <ul>
                {hoursSummary.map((h) => (
                  <li key={h.days}>
                    <span>{h.days}</span>
                    <span className="cutline" aria-hidden />
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
              <OpenStatus />
            </div>
          </Reveal>

          <Reveal className="visit-actions" delay={240}>
            <a
              className="btn btn-gold btn-block"
              href={site.booking}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Appointment
            </a>
            <a
              className="btn btn-ghost btn-block"
              href={site.directions}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </Reveal>
        </div>

        <Reveal variant="snip" as="figure" className="visit-photo" delay={120}>
          <Photo
            name="storefront-wide"
            alt="Edward Scissorhands on the corner of Carlisle and Chapel Streets, St Kilda"
            widths={[900, 1600]}
            sizes="(min-width: 1000px) 46vw, 92vw"
          />
        </Reveal>
      </div>
    </section>
  );
}
