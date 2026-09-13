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

/*
 * Which logo file to use, given the lockup (LOGO) and the theme.
 *
 * The supplied artwork is gold-on-black. The white theme uses a desaturated
 * copy with the levels lifted, generated from the same source by
 * scripts/build-mono-logo.js, so the brass lands close to white.
 */
import { LOGO, logos } from "@/content/site";

export function logoSrc(slot: "header" | "footer") {
  const path = logos[LOGO][slot];
  return THEME === "white" ? path.replace(/(-sm)?\.png$/, "-mono$1.png") : path;
}
