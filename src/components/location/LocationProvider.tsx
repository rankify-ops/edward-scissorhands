"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCATION,
  shopById,
  shops,
  type LocationId,
  type Shop,
} from "@/content/locations";

/*
 * Which shop the page is showing.
 *
 * The choice lives in localStorage, which makes it an external store rather
 * than React state — so it is read with useSyncExternalStore instead of an
 * effect that calls setState. The server snapshot is always DEFAULT_LOCATION,
 * which is what the static HTML is built with; React uses that for the
 * hydration pass and then re-renders with the stored value, so a returning
 * visitor who picked the other shop lands on it without the markup ever
 * mismatching.
 *
 * The `storage` event is subscribed to as well, so switching shops in one tab
 * moves the others with it.
 */

const KEY = "es-location";

const isValid = (v: unknown): v is LocationId =>
  typeof v === "string" && shops.some((s) => s.id === v);

/* Cached so getSnapshot returns a stable value — returning a fresh read every
 * time would have React re-rendering forever. */
let current: LocationId | null = null;
const listeners = new Set<() => void>();

function read(): LocationId {
  if (current !== null) return current;
  try {
    const saved = localStorage.getItem(KEY);
    current = isValid(saved) ? saved : DEFAULT_LOCATION;
  } catch {
    // Private browsing and blocked site data both throw here; the default is a
    // perfectly good answer, so there is nothing to handle.
    current = DEFAULT_LOCATION;
  }
  return current;
}

function write(next: LocationId) {
  if (current === next) return;
  current = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    // The choice still applies for this visit, it just will not be remembered.
  }
  for (const fn of listeners) fn();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Another tab changing the value writes straight to storage, bypassing
  // write(), so the cache has to be dropped before notifying.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    current = isValid(e.newValue) ? e.newValue : DEFAULT_LOCATION;
    onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

interface Ctx {
  shop: Shop;
  shops: Shop[];
  setLocation: (id: LocationId) => void;
}

const LocationContext = createContext<Ctx | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const id = useSyncExternalStore(subscribe, read, () => DEFAULT_LOCATION);
  const setLocation = useCallback((next: LocationId) => write(next), []);

  return (
    <LocationContext.Provider value={{ shop: shopById(id), shops, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used inside <LocationProvider>");
  return ctx;
}
