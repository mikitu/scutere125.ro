import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scutere125.ro | Scutere ieftine conform legii B125 | Pe drum, cu încredere",
  description: "Descoperă cele mai bune scutere 125cc pentru permis B125. Honda SH Mode, PCX 125, Forza 125 - scutere ieftine, fiabile și economice. Pe drum, cu încredere!",
  keywords: "scutere 125cc, scutere ieftine, B125, permis B, Honda scutere, SH Mode 125, PCX 125, Forza 125, scutere Romania",
  authors: [{ name: "Scutere125.ro" }],
  openGraph: {
    title: "Scutere125.ro | Scutere ieftine conform legii B125",
    description: "Descoperă cele mai bune scutere 125cc pentru permis B125. Pe drum, cu încredere!",
    url: "https://scutere125.ro",
    siteName: "Scutere125.ro",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scutere125.ro | Scutere ieftine conform legii B125",
    description: "Descoperă cele mai bune scutere 125cc pentru permis B125. Pe drum, cu încredere!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
