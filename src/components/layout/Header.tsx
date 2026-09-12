"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { asset } from "@/lib/basePath";
import { Close, Menu, Scissors } from "@/components/ui/Icons";
import { OpenStatus } from "@/components/ui/OpenStatus";

/*
 * Kings Domain's header, rebuilt: crest left, pill CTA and a bare hamburger
 * right, and the same bar at every width — the desktop links are the only
 * thing that appears as the viewport grows. Opening the menu covers the page
 * with big stacked links on hairlines rather than sliding a drawer, which is
 * what both reference sites do and what reads best one-handed.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the overlay, and let Escape out of it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="site-header" data-scrolled={scrolled || undefined}>
        <div className="header-inner">
          <a href="#top" className="brand" aria-label={`${site.name} — home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/img/logo-sm.png")} alt={site.name} width={148} height={88} />
          </a>

          <nav className="header-nav" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <OpenStatus className="header-status" />
            <a
              className="btn btn-gold btn-sm"
              href={site.booking}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Appointment
            </a>
            <button
              type="button"
              className="hamburger"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <div className="menu-sheet" data-open={open || undefined} hidden={!open}>
        <nav aria-label="Menu">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${90 + i * 55}ms` }}
            >
              <span>{item.label}</span>
              <Scissors size={18} />
            </a>
          ))}
          <a
            href={site.booking}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="menu-book"
            style={{ transitionDelay: `${90 + nav.length * 55}ms` }}
          >
            <span>Book Appointment</span>
            <Scissors size={18} />
          </a>
        </nav>

        <div className="menu-foot">
          <OpenStatus />
          <p>
            {site.address.street}
            <br />
            {site.address.suburb}, {site.address.city} {site.address.state}{" "}
            {site.address.postcode}
          </p>
          <div className="menu-social">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
