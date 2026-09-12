"use client";

import { LOGO, nav, site } from "@/content/site";
import { logoSrc } from "@/lib/theme";
import { useLocation } from "@/components/location/LocationProvider";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Facebook, Instagram } from "@/components/ui/Icons";

export function Footer() {
  const { shop } = useLocation();
  const { line1, line2, suburb, city, state, postcode } = shop.address;

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
            href={shop.booking ?? `tel:${shop.phone}`}
            target={shop.booking ? "_blank" : undefined}
            rel={shop.booking ? "noopener noreferrer" : undefined}
          >
            {shop.booking ? "Book Appointment" : `Call ${shop.phoneDisplay}`}
          </a>
        </Reveal>
      </div>

      <div className="wrap">
        <span className="cutline" aria-hidden />
      </div>

      <div className="wrap footer-grid">
        <div className="footer-brand" data-lockup={LOGO}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(logoSrc("footer"))}
            alt={site.name}
            width={1200}
            height={332}
            loading="lazy"
          />
          <p>The longest established barber shop in St Kilda and Balaclava.</p>
        </div>

        <div className="footer-col">
          <h3>Visit</h3>
          <a href={shop.directions} target="_blank" rel="noopener noreferrer">
            {line1}
            <br />
            {line2 ? (
              <>
                {line2}
                <br />
              </>
            ) : null}
            {suburb}, {city} {state} {postcode}
          </a>
        </div>

        <div className="footer-col">
          <h3>Hours</h3>
          <ul>
            {shop.hoursSummary.map((h) => (
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
              <a
                href={shop.booking ?? `tel:${shop.phone}`}
                target={shop.booking ? "_blank" : undefined}
                rel={shop.booking ? "noopener noreferrer" : undefined}
              >
                {shop.booking ? "Book Appointment" : "Call the Shop"}
              </a>
            </li>
          </ul>
          <div className="footer-social">
            <a
              href={shop.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Edward Scissorhands on Instagram"
            >
              <Instagram />
            </a>
            <a
              href={shop.social.facebook}
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
