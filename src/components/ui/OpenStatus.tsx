"use client";

import { useSyncExternalStore } from "react";
import { useLocation } from "@/components/location/LocationProvider";
import type { Shop } from "@/content/locations";

/*
 * Live OPEN / CLOSED for the selected shop, worked out in Melbourne time rather
 * than the visitor's — someone checking from Sydney or from a plane still sees
 * whether the door is open right now. The two shops keep different hours, so
 * this reads whichever one the switcher has selected.
 *
 * The page is a static export, so at build time there is no "now" to render.
 * The clock is therefore an external store: the server snapshot is empty, the
 * client snapshot is the current status, and a one-minute tick republishes it.
 * That is what useSyncExternalStore is for, and it avoids the setState-in-an-
 * effect the same logic would otherwise need.
 */

function melbourneNow() {
  // en-GB gives a stable "Sat, 14:07" shape to pull the parts back out of.
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Australia/Melbourne",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    day: days.indexOf(get("weekday")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
  };
}

/** 18.5 -> "6:30pm", 19 -> "7pm". Hours are stored as decimals. */
function clock(h: number) {
  const suffix = h >= 12 ? "pm" : "am";
  const whole = Math.floor(h);
  const twelve = whole > 12 ? whole - 12 : whole;
  const mins = Math.round((h - whole) * 60);
  return mins ? `${twelve}:${String(mins).padStart(2, "0")}${suffix}` : `${twelve}${suffix}`;
}

/* Snapshots are plain strings ("1|Open now · until 7pm") because the hook
 * compares them by identity — returning a fresh object each read would spin. */
function compute(shop: Shop): string {
  const { day, hour, minute } = melbourneNow();
  if (day < 0) return "";

  const today = shop.hours[day];
  const now = hour + minute / 60;

  if (now >= today.open && now < today.close) {
    return `1|Open now · until ${clock(today.close)}`;
  }

  // Before opening today, or after closing — either way, name the next time
  // the door is open rather than just saying "closed".
  const nextIdx = now < today.open ? day : (day + 1) % 7;
  const next = shop.hours[nextIdx];
  const when =
    nextIdx === day ? "today" : nextIdx === (day + 1) % 7 ? "tomorrow" : next.label;
  return `0|Closed · opens ${clock(next.open)} ${when}`;
}

/* One cache per shop id, so switching location cannot hand React a stale
 * string for the shop it is now rendering. */
const cache = new Map<string, string>();

function subscribe(onChange: () => void) {
  // A minute is plenty; the label only ever turns over on the hour.
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

export function OpenStatus({ className = "" }: { className?: string }) {
  const { shop } = useLocation();

  const getSnapshot = () => {
    const next = compute(shop);
    // Hand back the identical string while nothing has changed, so React can
    // bail out of the render.
    if (cache.get(shop.id) !== next) cache.set(shop.id, next);
    return cache.get(shop.id)!;
  };

  const value = useSyncExternalStore(subscribe, getSnapshot, () => "");
  const [flag, label] = value ? value.split("|") : ["", ""];

  return (
    <span className={`status ${className}`} data-open={flag === "1" || undefined}>
      <span className="status-dot" />
      {/* Non-breaking space holds the line's height before the first tick. */}
      {label || " "}
    </span>
  );
}
