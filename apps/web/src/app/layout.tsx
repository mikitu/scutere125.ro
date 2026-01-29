import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { fetchScootersForQuoteModal } from "@/data/scooters";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scutere125.ro | Scutere de calitate și accesibile conform legii B125 | Pe drum, cu încredere",
  description: "Descoperă cele mai bune scutere 125cc pentru permis B125. Honda, Yamaha și multe altele - scutere de calitate, fiabile și economice. Pe drum, cu încredere!",
  keywords: "scutere 125cc, scutere accesibile, scutere calitate, B125, permis B, Honda scutere, Yamaha scutere, SH Mode 125, PCX 125, Forza 125, scutere Romania",
  authors: [{ name: "Scutere125.ro" }],
  openGraph: {
    title: "Scutere 125cc • Mobilitate urbană",
    description: "Descoperă scutere 125cc legale cu permis B (B125). Economice, fiabile și perfecte pentru oraș.",
    url: "https://scutere125.ro",
    siteName: "Scutere125.ro",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/images/scutere125-og.png",
        width: 1200,
        height: 800,
        alt: "Scutere 125cc • Mobilitate urbană",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scutere 125cc • Mobilitate urbană",
    description: "Descoperă scutere 125cc legale cu permis B (B125). Economice, fiabile și perfecte pentru oraș.",
    images: ["/images/scutere125-og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scooters = await fetchScootersForQuoteModal();

  return (
    <html lang="ro">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <AppProviders scooters={scooters}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
