"use client";

import { useLocation } from "@/components/location/LocationProvider";

/*
 * A caveat that only appears once the visitor switches to South Melbourne.
 *
 * The price list and the team grid are both St Kilda's: they come from that
 * shop's Fresha venue, which is the only one of the two that is a claimed
 * Fresha listing. South Melbourne publishes its service names but no prices and
 * no staff, so quietly showing St Kilda's numbers under a South Melbourne
 * heading would be stating something we have not verified.
 *
 * Rather than hide the sections — the work and the prices are still the best
 * thing on the page — the note says whose they are.
 */
export function StKildaOnlyNote({ children }: { children: React.ReactNode }) {
  const { shop } = useLocation();
  if (shop.id === "st-kilda") return null;

  return (
    <p className="loc-note" role="note">
      {children}
    </p>
  );
}
