import type { Metadata } from "next";
import { Baloo_2, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const baloo2 = Baloo_2({
  variable: "--font-baloo-2",
  subsets: ["latin"],
  weight: ["600"],
});

const siteUrl = "https://bespoke-everything.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Preview",
  description: "Private preview.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${baloo2.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
