import { reviews, site } from "@/content/site";
import { shopById } from "@/content/locations";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Star } from "@/components/ui/Icons";

/*
 * One review, set as a full-width pull quote over the shop interior rather
 * than three cards in a row. With a single quote to show, a card grid would
 * only advertise the two missing ones — and a 5.0 from 2,600 reviews is the
 * number doing the real persuading anyway.
 */
export function Reviews() {
  const lead = reviews[0];
  // The review wall belongs to St Kilda, which is the only claimed venue —
  // it does not follow the switcher.
  const stKilda = shopById("st-kilda");

  return (
    <section className="reviews">
      <div className="reviews-media">
        <Photo
          name="chairs"
          alt="Leather chairs and counter tools inside Edward Scissorhands"
          widths={[800, 1400]}
          sizes="100vw"
        />
        <span className="reviews-wash" />
      </div>

      <div className="wrap reviews-inner">
        <Reveal className="reviews-score">
          <span className="stars" aria-hidden>
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
          </span>
          <strong>{site.rating.score}</strong>
          <span>from {site.rating.count} reviews</span>
        </Reveal>

        <Reveal delay={120}>
          <blockquote className="display d-lg reviews-quote">
            &ldquo;{lead.quote}&rdquo;
          </blockquote>
          <p className="reviews-by">
            {lead.name} <span aria-hidden>—</span> via {lead.via}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <a
            className="btn btn-ghost btn-block"
            href={stKilda.reviewsUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read all {site.rating.count} reviews
          </a>
        </Reveal>
      </div>
    </section>
  );
}
