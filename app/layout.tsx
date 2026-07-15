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
  title: "KOIBOI MUSIC | Official Artist Hub",
  description:
    "Official KOIBOI MUSIC artist hub with booking, SoundCloud, Beatport, Apple Music, Instagram, Facebook, releases, live sets, and remixes.",
  openGraph: {
    title: "KOIBOI MUSIC | Official Artist Hub",
    description:
      "Booking, releases and official Koi Boi platform links: SoundCloud, Beatport, Apple Music, Instagram and Facebook.",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "KOIBOI MUSIC | Official Artist Hub",
    description:
      "Booking, releases and official Koi Boi platform links: SoundCloud, Beatport, Apple Music, Instagram and Facebook.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
