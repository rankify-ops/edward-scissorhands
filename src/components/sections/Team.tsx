import { team } from "@/content/site";
import { BookLink } from "@/components/location/BookLink";
import { StKildaOnlyNote } from "@/components/location/StKildaOnlyNote";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

/*
 * The eight barbers currently on the shop's Fresha listing, each a link
 * straight into their profile. Portraits come from Fresha too, so the faces
 * match whoever is actually taking bookings.
 *
 * The monogram fallback stays for any barber added later without a photo — it
 * reads as a deliberate card rather than a missing image — but nothing hits it
 * today.
 */
export function Team() {
  return (
    <section className="section team" id="team">
      <div className="wrap">
        <div className="section-head">
          <Reveal className="eyebrow">The Team</Reveal>
          <h2 className="display d-xl">
            <Reveal variant="mask" as="span">
              Eight chairs.
            </Reveal>
            <Reveal variant="mask" as="span" delay={80}>
              Eight specialties.
            </Reveal>
          </h2>
          <Reveal className="lede" delay={160}>
            Licensed, local and each obsessed with their craft. Tap any chair to
            book directly with them.
          </Reveal>
          <StKildaOnlyNote>
            This is the St Kilda team. South Melbourne has its own barbers —
            walk in and meet them.
          </StKildaOnlyNote>
        </div>

        <ul className="team-grid">
          {team.map((member, i) => (
            <Reveal as="li" key={member.name} delay={(i % 4) * 90}>
              <BookLink
                className="team-card"
                suffix="?modal=employee-profile"
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
              </BookLink>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
