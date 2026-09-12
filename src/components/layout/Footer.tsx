import { hoursSummary, nav, site } from "@/content/site";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Facebook, Instagram } from "@/components/ui/Icons";

export function Footer() {
  const { street, suburb, city, state, postcode } = site.address;

  return (
    <footer className="site-footer">
      {/* The closing shout, before the small print. */}
      <div className="wrap footer-cta">
        <Reveal variant="mask" as="span" className="display d-xl">
          Book a chair.
        </Reveal>
        <Reveal delay={120}>
          <p>Walk-ins welcome, seven days.</p>
          <a
            className="btn btn-gold btn-block"
            href={site.booking}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Appointment
          </a>
        </Reveal>
      </div>

      <div className="wrap">
        <span className="cutline" aria-hidden />
      </div>

      <div className="wrap footer-grid">
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/img/logo.png")}
            alt={site.name}
            width={240}
            height={143}
            loading="lazy"
          />
          <p>The longest established barber shop in St Kilda and Balaclava.</p>
        </div>

        <div className="footer-col">
          <h3>Visit</h3>
          <a href={site.directions} target="_blank" rel="noopener noreferrer">
            {street}
            <br />
            {suburb}, {city} {state} {postcode}
          </a>
        </div>

        <div className="footer-col">
          <h3>Hours</h3>
          <ul>
            {hoursSummary.map((h) => (
              <li key={h.days}>
                {h.days}
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Menu</h3>
          <ul className="footer-links">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href={site.booking} target="_blank" rel="noopener noreferrer">
                Book Appointment
              </a>
            </li>
          </ul>
          <div className="footer-social">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Edward Scissorhands on Instagram"
            >
              <Instagram />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Edward Scissorhands on Facebook"
            >
              <Facebook />
            </a>
          </div>
        </div>
      </div>

      <div className="wrap footer-base">
        <p>
          © {new Date().getFullYear()} {site.name}. Established{" "}
          {site.established}.
        </p>
        <p>
          {suburb} <span aria-hidden>·</span> {city}
        </p>
      </div>
    </footer>
  );
}
