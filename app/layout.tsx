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
  title: "KOIBOI MUSIC",
  description:
    "Mobile-first landing page for KOIBOI MUSIC live sets, releases, and sound design.",
  openGraph: {
    title: "KOIBOI MUSIC",
    description:
      "Bass-forward music with liquid motion. Live sets, releases, and sound design.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "KOIBOI MUSIC",
    description:
      "Bass-forward music with liquid motion. Live sets, releases, and sound design.",
    images: ["/og.png"],
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
