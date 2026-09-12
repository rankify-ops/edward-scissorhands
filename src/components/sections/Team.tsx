import { site, team } from "@/content/site";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

/*
 * Eleven barbers, each a link straight into their Fresha profile.
 *
 * Three of them have no portrait on the client's current site — rather than
 * shipping the grey stock silhouette that is sitting there now, those cards
 * fall back to a gold monogram on the shop's own black. It reads as a
 * deliberate card instead of a missing image, and it is obvious to the client
 * which three photos we still need.
 */
export function Team() {
  return (
    <section className="section team" id="team">
      <div className="wrap">
        <div className="section-head">
          <Reveal className="eyebrow">The Team</Reveal>
          <h2 className="display d-xl">
            <Reveal variant="mask" as="span">
              Eleven chairs.
            </Reveal>
            <Reveal variant="mask" as="span" delay={80}>
              Eleven specialties.
            </Reveal>
          </h2>
          <Reveal className="lede" delay={160}>
            Licensed, local and each obsessed with their craft. Tap any chair to
            book directly with them.
          </Reveal>
        </div>

        <ul className="team-grid">
          {team.map((member, i) => (
            <Reveal as="li" key={member.name} delay={(i % 4) * 90}>
              <a
                className="team-card"
                href={`${site.booking}?modal=employee-profile`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="team-photo">
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={asset(`/img/team/${member.photo}.webp`)}
                      alt={`${member.name}, ${member.role} at Edward Scissorhands`}
                      width={520}
                      height={640}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="team-monogram" aria-hidden>
                      {member.name.charAt(0)}
                    </span>
                  )}
                </span>
                <span className="team-meta">
                  <strong>{member.name}</strong>
                  <em>{member.role}</em>
                  <ArrowUpRight />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
