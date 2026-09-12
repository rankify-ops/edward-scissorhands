"use client";

import { useEffect, useRef } from "react";

/*
 * The travelling scissors.
 * ────────────────────────
 * A pair of scissors rides the left gutter as you read. Everything above it is
 * a solid gold line — already cut. Everything below is still perforated. The
 * blades snip shut every SNIP_EVERY pixels of scroll and each snip throws off
 * a few hair clippings that flutter down the gutter.
 *
 * Two rules keep it cheap:
 *
 *   1. Nothing here is React state. Scroll position is written straight onto
 *      element styles inside one rAF loop, so a long page costs a handful of
 *      transform writes per frame and zero re-renders.
 *   2. It only exists where there is room for it — a gutter wide enough is a
 *      desktop-only luxury, and reduced-motion users get nothing at all. Both
 *      are checked with matchMedia before the loop is ever started.
 */

/** Pixels of scroll between snips — roughly a snip per flick of the wheel. */
const SNIP_EVERY = 88;
/** How far each blade swings off the centre line, so the pair opens to 2x. */
const OPEN_DEG = 31;
/**
 * Shut, in degrees. Not quite zero: at exactly zero the two halves sit on top
 * of one another and read as a single blade, so they stop a hair apart, which
 * is also where a real pair meets edge to edge.
 */
const SHUT_DEG = 1.5;
/*
 * A real snip is not symmetrical: the blades slam shut and then ease back
 * open. Driving the two halves of the cycle at different speeds is most of
 * what sells it.
 */
const CLOSE_MS = 85;
const OPEN_MS = 230;
/** Fraction of the viewport the scissors travels between page top and bottom. */
const TRAVEL_TOP = 0.12;
const TRAVEL_BOTTOM = 0.84;

export function ScrollScissors() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cutRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const bladeARef = useRef<SVGGElement>(null);
  const bladeBRef = useRef<SVGGElement>(null);
  const clippingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const roomy = window.matchMedia("(min-width: 1100px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let running = false;

    // Scroll distance banked since the last snip, and the current blade angle.
    let sinceSnip = 0;
    let lastY = window.scrollY;
    let angle = OPEN_DEG;
    let closing = true;

    const spawnClippings = (y: number) => {
      const host = clippingsRef.current;
      // A snip mid-flight can outrun the cleanup on a fast flick; cap the pile
      // rather than letting it grow unbounded.
      if (!host || host.childElementCount > 24) return;

      const n = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < n; i++) {
        const hair = document.createElement("i");
        hair.className = "clipping";
        hair.style.top = `${y}px`;
        hair.style.setProperty("--dx", `${(Math.random() - 0.5) * 54}px`);
        hair.style.setProperty("--dy", `${90 + Math.random() * 120}px`);
        hair.style.setProperty("--spin", `${(Math.random() - 0.5) * 260}deg`);
        hair.style.setProperty("--len", `${7 + Math.random() * 9}px`);
        hair.style.animationDelay = `${i * 70}ms`;
        hair.addEventListener("animationend", () => hair.remove(), { once: true });
        host.appendChild(hair);
      }
    };

    const frame = () => {
      raf = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0;

      const span = TRAVEL_BOTTOM - TRAVEL_TOP;
      const top = (TRAVEL_TOP + progress * span) * window.innerHeight;

      if (rigRef.current) rigRef.current.style.transform = `translate3d(0, ${top}px, 0)`;
      if (cutRef.current) cutRef.current.style.height = `${top}px`;

      // Bank the distance travelled and snip once it crosses the threshold.
      sinceSnip += Math.abs(y - lastY);
      lastY = y;
      if (sinceSnip >= SNIP_EVERY) {
        sinceSnip = 0;
        closing = !closing;
        // All the way shut, all the way open — no half measures.
        angle = closing ? SHUT_DEG : OPEN_DEG;
        const ms = closing ? CLOSE_MS : OPEN_MS;
        for (const g of [bladeARef.current, bladeBRef.current]) {
          if (g) g.style.transitionDuration = `${ms}ms`;
        }
        if (closing) spawnClippings(top);
      }

      if (bladeARef.current)
        bladeARef.current.style.transform = `rotate(${angle}deg)`;
      if (bladeBRef.current)
        bladeBRef.current.style.transform = `rotate(${-angle}deg)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      rootRef.current?.setAttribute("data-live", "true");
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      frame();
    };

    const stop = () => {
      if (!running) return;
      running = false;
      rootRef.current?.removeAttribute("data-live");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      if (clippingsRef.current) clippingsRef.current.replaceChildren();
    };

    const sync = () => (roomy.matches && !still.matches ? start() : stop());

    sync();
    roomy.addEventListener("change", sync);
    still.addEventListener("change", sync);

    return () => {
      roomy.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return (
    <div ref={rootRef} className="scissor-rail" aria-hidden>
      {/* Perforated full-height line — the part of the page not yet cut. */}
      <span className="rail-dashed" />
      {/* Solid gold, grown from the top down to the blades. */}
      <div ref={cutRef} className="rail-cut" />
      <div ref={clippingsRef} className="rail-clippings" />

      <div ref={rigRef} className="rail-rig">
        <svg width="46" height="46" viewBox="-2 -1 28 26" fill="none">
          {/*
           * Each half is drawn SHUT: blade straight up the centre line from the
           * rivet at (12, 13), then a shank bending down to its bow. Both halves
           * therefore lie on top of one another at rotation zero, and the
           * animation only ever opens them — which is why a full snip can
           * actually close, blade against blade.
           *
           * An earlier version drew the blades already crossed in an X and
           * rotated from there; that geometry left 81 degrees between them at
           * its tightest, so they never met however far it swung.
           */}
          <g ref={bladeARef} className="blade">
            <path
              d="M12 2.4 12 13 7.4 17.6"
              stroke="var(--gold-bright)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="5.9"
              cy="19.1"
              r="2.4"
              stroke="var(--gold-bright)"
              strokeWidth="1.5"
            />
          </g>
          <g ref={bladeBRef} className="blade">
            <path
              d="M12 2.4 12 13 16.6 17.6"
              stroke="var(--gold-bright)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="18.1"
              cy="19.1"
              r="2.4"
              stroke="var(--gold-bright)"
              strokeWidth="1.5"
            />
          </g>
          <circle cx="12" cy="13" r="1.15" fill="var(--gold-bright)" />
        </svg>
      </div>
    </div>
  );
}
