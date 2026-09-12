"use client";

import { useId, useState } from "react";
import { bookingOptions, site } from "@/content/site";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { ArrowUpRight, Scissors } from "@/components/ui/Icons";

/*
 * "Start your booking" — the card in the right of the hero.
 *
 * Fresha refuses to be iframed (see the note on bookingOptions), so the choice
 * is made here on the client's own domain and handed off at the last step. The
 * point is that the visitor sees what things cost and how long they take before
 * they ever leave, rather than landing cold on a booking widget.
 *
 * Built as a real radiogroup rather than a list of links: arrow keys move the
 * selection, one tab stop, and the CTA is the only thing that navigates. The
 * first option is selected on load so the button is never a dead end.
 */
export function BookingCard() {
  const [picked, setPicked] = useState<string>(bookingOptions[0].id);
  const groupId = useId();

  const chosen = bookingOptions.find((o) => o.id === picked) ?? bookingOptions[0];
  const href = chosen.url ?? site.booking;

  const move = (delta: number) => {
    const i = bookingOptions.findIndex((o) => o.id === picked);
    const next = (i + delta + bookingOptions.length) % bookingOptions.length;
    setPicked(bookingOptions[next].id);
    // Keep focus with the selection, the way a radiogroup is expected to behave.
    document.getElementById(`${groupId}-${bookingOptions[next].id}`)?.focus();
  };

  return (
    <div className="book-card">
      <div className="book-card-head">
        <span className="eyebrow">Start your booking</span>
        <OpenStatus />
      </div>

      <div
        className="book-options"
        role="radiogroup"
        aria-label="Choose a service"
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
      >
        {bookingOptions.map((option) => {
          const active = option.id === picked;
          return (
            <button
              key={option.id}
              id={`${groupId}-${option.id}`}
              type="button"
              role="radio"
              aria-checked={active}
              // Only the selected row is tabbable, so the group is one stop.
              tabIndex={active ? 0 : -1}
              className="book-option"
              data-active={active || undefined}
              onClick={() => setPicked(option.id)}
            >
              <span className="book-option-mark" aria-hidden>
                <Scissors size={13} />
              </span>
              <span className="book-option-body">
                <span className="book-option-name">{option.name}</span>
                <span className="book-option-detail">{option.duration}</span>
              </span>
              <span className="book-option-meta">
                <strong>from A${option.from}</strong>
              </span>
            </button>
          );
        })}
      </div>

      <a
        className="btn btn-gold book-cta"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        Book {chosen.name}
        <ArrowUpRight size={15} />
      </a>

      <p className="book-fine">
        Final price confirmed at booking · Walk-ins welcome
      </p>
    </div>
  );
}
