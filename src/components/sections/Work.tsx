import { gallery, site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

/*
 * The portfolio. Every frame arrives behind the blade wipe (.snip), staggered
 * across the row, so scrolling this section looks like the page is being cut
 * open a panel at a time — the same gesture the rail scissors is making in the
 * gutter.
 */
export function Work() {
  return (
    <section className="section work" id="work">
      <div className="wrap">
        <div className="section-head">
          <Reveal className="eyebrow">The Work</Reveal>
          <h2 className="display d-xl">
            <Reveal variant="mask" as="span">
              Fades, line ups
            </Reveal>
            <Reveal variant="mask" as="span" delay={80}>
              and clean edges.
            </Reveal>
          </h2>
          <Reveal className="lede" delay={160}>
            Straight off the chair at 190 Carlisle Street. More on Instagram,
            updated most days.
          </Reveal>
        </div>

        <div className="work-grid">
          {gallery.map((shot, i) => (
            <Reveal
              key={shot.src}
              variant="snip"
              as="figure"
              className={`work-cell${shot.tall ? " is-tall" : ""}`}
              delay={(i % 3) * 140}
            >
              <Photo
                name={shot.src}
                alt={shot.alt}
                widths={[600, 1000]}
                sizes="(min-width: 1000px) 32vw, (min-width: 640px) 48vw, 92vw"
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="work-foot" delay={120}>
          <a
            className="btn btn-ghost btn-block"
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            More on Instagram
          </a>
        </Reveal>
      </div>
    </section>
  );
}
