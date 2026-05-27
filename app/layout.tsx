import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Brew Haven — Specialty Coffee",
  description:
    "A cozy specialty coffee shop serving single-origin brews, handcrafted espresso drinks, and freshly baked pastries.",
  keywords: ["coffee shop", "specialty coffee", "café", "espresso", "brew"],
  openGraph: {
    title: "Brew Haven — Specialty Coffee",
    description: "Crafted with care. Served with soul.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body bg-cream-50 text-brown-800 antialiased">
        {children}
      </body>
    </html>
  );
}