/*
 * Two looks, one codebase.
 *
 *   "gold"   the shop's own brass on near-black — the original
 *   "white"  a monochrome light variation: white ground, black ink, no accent
 *            colour at all, and every photograph desaturated
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
 * The supplied artwork is gold-on-black with white letterforms, which cannot
 * go on a white page — the letters would disappear. The white theme therefore
 * uses a desaturated and levelled copy, generated from the same source, where
 * the brass lands as dark ink.
 */
import { LOGO, logos } from "@/content/site";

export function logoSrc(slot: "header" | "footer") {
  const path = logos[LOGO][slot];
  return THEME === "white" ? path.replace(/(-sm)?\.png$/, "-mono$1.png") : path;
}
