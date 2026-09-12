"use client";

import { useSyncExternalStore } from "react";
import { hours } from "@/content/site";

/*
 * Live OPEN / CLOSED, worked out in the shop's own timezone rather than the
 * visitor's — someone checking from Sydney or from a plane still sees whether
 * Carlisle Street is open right now.
 *
 * The page is a static export, so at build time there is no "now" to render.
 * The clock is therefore an external store: the server snapshot is empty, the
 * client snapshot is the current status, and a one-minute tick republishes it.
 * That is what useSyncExternalStore is for, and it avoids the setState-in-an-
 * effect that the same logic would otherwise need.
 *
 * Snapshots are plain strings ("1|Open now · until 7pm") because the hook
 * compares them by identity — returning a fresh object each read would spin.
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

const hour12 = (h: number) => (h > 12 ? `${h - 12}pm` : `${h}am`);

function snapshot(): string {
  const { day, hour, minute } = melbourneNow();
  if (day < 0) return "";

  const today = hours[day];
  const now = hour + minute / 60;

  if (now >= today.open && now < today.close) {
    return `1|Open now · until ${hour12(today.close)}`;
  }

  // Before opening today, or after closing — either way, name the next
  // time the door is open rather than just saying "closed".
  const nextIdx = now < today.open ? day : (day + 1) % 7;
  const next = hours[nextIdx];
  const when =
    nextIdx === day ? "today" : nextIdx === (day + 1) % 7 ? "tomorrow" : next.label;
  return `0|Closed · opens ${hour12(next.open)} ${when}`;
}

let cached = "";

function getSnapshot() {
  const next = snapshot();
  // Hand back the identical string while nothing has changed, so React can
  // bail out of the render.
  if (next !== cached) cached = next;
  return cached;
}

/** Nothing to show until there is a real clock — see the note above. */
const getServerSnapshot = () => "";

function subscribe(onChange: () => void) {
  // A minute is plenty; the label only ever turns over on the hour.
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

export function OpenStatus({ className = "" }: { className?: string }) {
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [flag, label] = value ? value.split("|") : ["", ""];

  return (
    <span className={`status ${className}`} data-open={flag === "1" || undefined}>
      <span className="status-dot" />
      {/* Non-breaking space holds the line's height before the first tick. */}
      {label || " "}
    </span>
  );
}
