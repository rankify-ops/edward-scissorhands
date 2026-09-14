import type { Metadata } from "next";
import { Archivo, Geist_Mono, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyBar } from "@/components/layout/StickyBar";
import { PreviewGate } from "@/components/PreviewGate";
import { ScrollScissors } from "@/components/ui/ScrollScissors";
import { services, site, team } from "@/content/site";
import { shops } from "@/content/locations";
import { LocationProvider } from "@/components/location/LocationProvider";
import { BASE_PATH, asset } from "@/lib/basePath";
import { THEME } from "@/lib/theme";
import "./globals.css";

// Archivo does the shouting, Inter the talking, Geist Mono the labelling.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

const title = "Edward Scissorhands Barber Shop | St Kilda, Melbourne";
const description =
  "The longest established barber shop in St Kilda and Balaclava, cutting since 1991. Skin fades, hot towel straight razor shaves, beard sculpts and boys cuts. Walk-ins welcome, seven days.";

/*
 * Absolute URLs for the link preview, built from the origin plus this build's
 * basePath. site.url already carries "/edward-scissorhands", and asset() adds
 * the basePath again, so resolving one against the other doubled the path and
 * every unfurler got a 404 — build them explicitly instead.
 */
const ORIGIN = new URL(site.url).origin;
const pageUrl = `${ORIGIN}${BASE_PATH}/`;
const ogImage = {
  url: `${ORIGIN}${BASE_PATH}/img/${THEME === "white" ? "og-white.jpg" : "og-gold.jpg"}`,
  width: 1200,
  height: 630,
  alt: "Edward Scissorhands Barber Shop — vintage barber chairs",
};

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    url: pageUrl,
    title,
    description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  icons: {
    icon: [
      { url: asset("/img/icon-32.png"), sizes: "32x32" },
      { url: asset("/img/icon-192.png"), sizes: "192x192" },
    ],
    apple: asset("/img/icon-180.png"),
  },
  other: { "geo.region": "AU-VIC", "geo.placename": "St Kilda" },
};

const DAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** 18.5 -> "18:30". Hours are stored as decimals. */
const iso = (h: number) => {
  const whole = Math.floor(h);
  const mins = Math.round((h - whole) * 60);
  return `${String(whole).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

/*
 * One HairSalon entity per shop, in a @graph — they are two physical places
 * with different addresses and hours, so describing them as one would be
 * wrong. Only St Kilda carries the price list and the ReserveAction, because
 * only St Kilda takes online bookings; South Melbourne gets its phone number
 * instead.
 */
const schema = {
  "@context": "https://schema.org",
  "@graph": shops.map((shop) => ({
    "@type": "HairSalon",
    "@id": `${site.url}/#${shop.id}`,
    name: `${site.name} — ${shop.label}`,
    url: site.url,
    description,
    image: `${site.url}/img/hero-1600.webp`,
    priceRange: "$$",
    currenciesAccepted: "AUD",
    ...(shop.phone ? { telephone: shop.phone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: [shop.address.line1, shop.address.line2]
        .filter(Boolean)
        .join(", "),
      addressLocality: shop.address.suburb,
      addressRegion: shop.address.state,
      postalCode: shop.address.postcode,
      addressCountry: "AU",
    },
    areaServed: [{ "@type": "City", name: `${shop.address.suburb}, VIC` }],
    sameAs: [shop.social.instagram, shop.social.facebook],
    openingHoursSpecification: shop.hours.map((h, i) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY[i],
      opens: iso(h.open),
      closes: iso(h.close),
    })),
    ...(shop.id === "st-kilda"
      ? {
          foundingDate: String(site.established),
          employee: team.map((m) => ({
            "@type": "Person",
            name: m.name,
            jobTitle: m.role,
          })),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Barbering services",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              price: s.price,
              priceCurrency: "AUD",
              itemOffered: {
                "@type": "Service",
                name: s.name,
                description: s.note,
              },
            })),
          },
        }
      : {}),
    ...(shop.booking
      ? {
          potentialAction: {
            "@type": "ReserveAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: shop.booking,
              actionPlatform: [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform",
              ],
            },
          },
        }
      : {}),
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      data-theme={THEME}
      className={`${archivo.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <body>
        <LocationProvider>
          <ScrollScissors />
          <Header />
          <main>{children}</main>
          <Footer />
          <StickyBar />
        </LocationProvider>
        {/* Gold and /white builds share one preview: same site slug, one timer. */}
        <PreviewGate site="edward-scissorhands" staffPath="/staff-52ab2c" clientName="Edward Scissorhands" />
        <script
          type="application/ld+json"
          // Static, author-controlled JSON — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
