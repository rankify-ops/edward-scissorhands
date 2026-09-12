"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Pin, Scissors } from "@/components/ui/Icons";

/*
 * Phone-only bottom bar. It stays out of the way until the hero is behind you
 * — showing it immediately would cover the hero's own CTA with the same words.
 */
export function StickyBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky-bar" data-shown={shown || undefined}>
      <a
        className="btn btn-gold"
        href={site.booking}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Scissors size={16} />
        Book Now
      </a>
      <a
        className="btn btn-ghost"
        href={site.directions}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Pin size={16} />
        Directions
      </a>
    </div>
  );
}
