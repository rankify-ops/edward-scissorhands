import { asset } from "@/lib/basePath";
import { site } from "@/content/site";
import { chairRail } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/Icons";

/*
 * "From the chair" — a full-bleed rail of vertical shots straight off the
 * shop's Instagram, drifting sideways under the hero.
 *
 * It drifts the opposite way to the gold text band above it, which reads as
 * deliberate counterpoint rather than two things sliding the same way. Same
 * seamless trick as the Marquee: two identical tracks and a -50% translate,
 * with the duplicate hidden from screen readers.
 *
 * The rail is also a real scroll container, so a phone can swipe it and a
 * reduced-motion reader gets a plain scrollable strip with the animation off.
 */
function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="chair-track" aria-hidden={hidden || undefined}>
      {chairRail.map((shot) => (
        <figure key={shot.src} className="chair-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(`/img/chair/${shot.src}-560.webp`)}
            srcSet={`${asset(`/img/chair/${shot.src}-320.webp`)} 320w, ${asset(
              `/img/chair/${shot.src}-560.webp`
            )} 560w`}
            sizes="(min-width: 1000px) 230px, 46vw"
            alt={shot.alt}
            width={560}
            height={996}
            loading="lazy"
            decoding="async"
          />
        </figure>
      ))}
    </div>
  );
}

export function ChairRail() {
  return (
    <section className="chair-rail" aria-labelledby="chair-rail-heading">
      <div className="wrap chair-head">
        <h2 className="eyebrow" id="chair-rail-heading">
          From the chair
        </h2>
        <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
          @edward_scissorhands_stkilda
          <ArrowUpRight />
        </a>
      </div>

      <div className="chair-viewport">
        <div className="chair-drift">
          <Track />
          <Track hidden />
        </div>
      </div>
    </section>
  );
}
