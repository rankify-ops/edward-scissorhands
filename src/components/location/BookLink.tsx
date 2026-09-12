"use client";

import type { ReactNode } from "react";
import { useLocation } from "@/components/location/LocationProvider";

/*
 * A "book" link that follows the selected shop.
 *
 * St Kilda goes to its Fresha page. South Melbourne takes no online bookings,
 * so the same anchor becomes a tel: link. `children` render either way; pass
 * `walkInLabel` only where the wording itself has to change, which is true of
 * a button that says "Book a Chair" and false of a menu row or a team card
 * that carries its own content.
 *
 * This exists so the surrounding sections can stay server components: only the
 * anchor itself needs to know which shop is selected.
 */
export function BookLink({
  children,
  className,
  walkInLabel,
  /** Appended to the Fresha URL, e.g. "?modal=employee-profile". */
  suffix = "",
}: {
  children: ReactNode;
  className?: string;
  /** Replaces `children` where a shop takes no online bookings. */
  walkInLabel?: ReactNode;
  suffix?: string;
}) {
  const { shop } = useLocation();

  if (shop.booking) {
    return (
      <a
        className={className}
        href={`${shop.booking}${suffix}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (shop.phone) {
    return (
      <a className={className} href={`tel:${shop.phone}`}>
        {walkInLabel ?? children}
      </a>
    );
  }

  // No booking link and no number — send them to the door rather than nowhere.
  return (
    <a
      className={className}
      href={shop.directions}
      target="_blank"
      rel="noopener noreferrer"
    >
      {walkInLabel ?? children}
    </a>
  );
}
