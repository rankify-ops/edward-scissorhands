"use client";

import { useId, useState } from "react";
import { bookingOptions } from "@/content/site";
import { useLocation } from "@/components/location/LocationProvider";
import { LocationSwitch } from "@/components/location/LocationSwitch";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { ArrowUpRight, Pin, Scissors } from "@/components/ui/Icons";

/*
 * "Start your booking" — the card in the right of the hero, and where the
 * location choice lives, since which shop you mean is the first decision and
 * it changes everything under it.
 *
 * St Kilda is a Fresha venue, so the card is a service picker: choose a cut,
 * see what it costs and how long it takes, then hand off. (Fresha refuses to be
 * iframed — see the note on bookingOptions — so the choice is made here on the
 * client's own domain and handed over at the last step.)
 *
 * South Melbourne takes no online bookings at all, so rather than showing a
 * price list that cannot be booked and a button that goes nowhere useful, the
 * card says plainly that it is walk-ins and calls, and gives the number.
 *
 * The service list is a real radiogroup: arrow keys move the selection, the
 * group is one tab stop, and only the CTA navigates.
 */
export function BookingCard() {
  const { shop } = useLocation();
  const [picked, setPicked] = useState<string>(bookingOptions[0].id);
  const groupId = useId();

  const chosen = bookingOptions.find((o) => o.id === picked) ?? bookingOptions[0];

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

      <LocationSwitch label="Choose a shop" />

      {shop.booking ? (
        <>
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
            // A per-service Fresha deep link where the client has supplied one.
            href={chosen.url ?? shop.booking}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book {chosen.name}
            <ArrowUpRight size={15} />
          </a>

          <p className="book-fine">
            Final price confirmed at booking · Walk-ins welcome
          </p>
        </>
      ) : (
        <div className="book-walkin">
          <p className="book-walkin-lead">
            <strong>Walk-ins only</strong> at {shop.name}. No bookings are taken
            online — come in, or call ahead to check the wait.
          </p>

          <dl className="book-walkin-facts">
            <div>
              <dt>Where</dt>
              <dd>
                {shop.address.line1}
                {shop.address.line2 ? <>, {shop.address.line2}</> : null}
              </dd>
            </div>
            <div>
              <dt>Open</dt>
              <dd>
                {shop.hoursSummary.map((h) => h.time).join(" · ")}
              </dd>
            </div>
          </dl>

          {shop.phone ? (
            <a className="btn btn-gold book-cta" href={`tel:${shop.phone}`}>
              Call {shop.phoneDisplay}
            </a>
          ) : null}
          <a
            className="btn btn-ghost book-cta"
            href={shop.directions}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Pin size={15} />
            Get directions
          </a>
        </div>
      )}
    </div>
  );
}
