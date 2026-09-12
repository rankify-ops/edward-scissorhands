import type { Metadata } from "next";
import { Archivo, Geist_Mono, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyBar } from "@/components/layout/StickyBar";
import { ScrollScissors } from "@/components/ui/ScrollScissors";
import { hours, services, site, team } from "@/content/site";
import { asset } from "@/lib/basePath";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    url: site.url,
    title,
    description,
    images: [{ url: asset("/img/hero-1600.webp"), width: 1600, height: 1067 }],
  },
  twitter: { card: "summary_large_image", title, description },
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

const pad = (h: number) => `${String(h).padStart(2, "0")}:00`;

const schema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": `${site.url}/#business`,
  name: site.name,
  url: site.url,
  description,
  image: `${site.url}/img/hero-1600.webp`,
  priceRange: "$$",
  foundingDate: String(site.established),
  currenciesAccepted: "AUD",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.suburb,
    addressRegion: site.address.state,
    postalCode: site.address.postcode,
    addressCountry: "AU",
  },
  areaServed: [
    { "@type": "City", name: "St Kilda, VIC" },
    { "@type": "City", name: "Balaclava, VIC" },
    { "@type": "City", name: "Melbourne, VIC" },
  ],
  sameAs: [site.social.instagram, site.social.facebook],
  openingHoursSpecification: hours.map((h, i) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: DAY[i],
    opens: pad(h.open),
    closes: pad(h.close),
  })),
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
      itemOffered: { "@type": "Service", name: s.name, description: s.note },
    })),
  },
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: site.booking,
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${archivo.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <body>
        <ScrollScissors />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyBar />
        <script
          type="application/ld+json"
          // Static, author-controlled JSON — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
