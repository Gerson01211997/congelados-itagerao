import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AppProvider from "@/providers/AppProvider";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://congelados-itagerao.com";
const siteName = "Congelados Itagerao";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Empanadas y Deditos Artesanales en Colombia | Congelados Itagerao",
  description:
    "Empanadas fritas y refrigeradas listas para disfrutar. Combos, deditos y más. Pide por WhatsApp fácil y rápido.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName,
    title: "Empanadas y Deditos Artesanales en Colombia | Congelados Itagerao",
    description:
      "Empanadas fritas y refrigeradas listas para disfrutar. Combos, deditos y más. Pide por WhatsApp fácil y rápido.",
    images: [
      {
        url: `${siteUrl}/Banner.png`,
        width: 1200,
        height: 630,
        alt: "Empanadas y deditos artesanales Congelados Itagerao",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Empanadas y Deditos Artesanales en Colombia | Congelados Itagerao",
    description:
      "Empanadas fritas y refrigeradas listas para disfrutar. Combos, deditos y más. Pide por WhatsApp fácil y rápido.",
    images: [`${siteUrl}/Banner.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: siteName,
    url: siteUrl,
    image: `${siteUrl}/Banner.png`,
    servesCuisine: ["Colombian"],
    priceRange: "$$",
  };

  return (
    <html lang="es">
      <body className={`${poppins.variable} antialiased`}>
        <Script
          id="schema-ld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>

        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
