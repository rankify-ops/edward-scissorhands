/*
 * Two looks, one codebase.
 *
 *   "gold"   the shop's own brass on near-black — the original
 *   "white"  the same near-black site with white in place of the brass, and
 *            every photograph in black and white
 *
 * Set at build time from NEXT_PUBLIC_THEME, stamped onto <html> as data-theme,
 * and everything else is CSS. The deploy workflow runs the build twice so both
 * live side by side under one Pages site — see .github/workflows/deploy.yml.
 */
export type Theme = "gold" | "white";

export const THEME: Theme =
  process.env.NEXT_PUBLIC_THEME === "white" ? "white" : "gold";
