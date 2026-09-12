"use client";

import { useLocation } from "@/components/location/LocationProvider";
import { Pin } from "@/components/ui/Icons";

/*
 * The location switcher, as a segmented control rather than a dropdown.
 *
 * With only two shops, showing both at once and marking one is the clearest
 * possible answer to "which am I looking at" — a dropdown hides the fact that
 * there is a choice at all until you open it. The selected half is filled gold
 * and carries a pin, so it reads at a glance and not only by colour.
 *
 * It is a real radiogroup: arrow keys move between the two and the group is a
 * single tab stop.
 */
export function LocationSwitch({
  size = "md",
  label = "Location",
}: {
  size?: "sm" | "md";
  label?: string;
}) {
  const { shop, shops, setLocation } = useLocation();

  const move = (delta: number) => {
    const i = shops.findIndex((s) => s.id === shop.id);
    const next = shops[(i + delta + shops.length) % shops.length];
    setLocation(next.id);
  };

  return (
    <div
      className="loc-switch"
      data-size={size}
      role="radiogroup"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          move(1);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          move(-1);
        }
      }}
    >
      {shops.map((s) => {
        const active = s.id === shop.id;
        return (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            className="loc-option"
            data-active={active || undefined}
            onClick={() => setLocation(s.id)}
          >
            <Pin size={size === "sm" ? 12 : 14} />
            {s.name}
          </button>
        );
      })}
    </div>
  );
}
