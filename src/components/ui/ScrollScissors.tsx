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

/** Pixels of scroll between snips. Roughly one per section at a normal pace. */
const SNIP_EVERY = 260;
/** How far the blades swing open, in degrees either side of closed. */
const OPEN_DEG = 13;
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
        angle = closing ? 1.5 : OPEN_DEG;
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
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          {/*
           * Both halves pivot about the same point, so rotating one by +a and
           * the other by -a opens and closes the blades cleanly. transform-box
           * and transform-origin are set in CSS, in user units on the viewBox.
           */}
          <g ref={bladeARef} className="blade">
            <path
              d="M8.6 15.8 19.4 3.2"
              stroke="var(--gold-bright)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle
              cx="6.6"
              cy="19"
              r="2.6"
              stroke="var(--gold-bright)"
              strokeWidth="1.5"
            />
          </g>
          <g ref={bladeBRef} className="blade">
            <path
              d="M15.4 15.8 4.6 3.2"
              stroke="var(--gold-bright)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle
              cx="17.4"
              cy="19"
              r="2.6"
              stroke="var(--gold-bright)"
              strokeWidth="1.5"
            />
          </g>
          <circle cx="12" cy="13.4" r="1.15" fill="var(--gold-bright)" />
        </svg>
      </div>
    </div>
  );
}
