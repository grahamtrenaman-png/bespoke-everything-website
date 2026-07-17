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
  title: "Bespoke Everything | Software • Services • Solutions",
  description:
    "Twenty years solving business problems. Bespoke Everything builds software, delivers expert services and creates bespoke solutions designed around the way organisations actually work.",
  openGraph: {
    title: "Bespoke Everything | Software • Services • Solutions",
    description:
      "Twenty years solving business problems. Built on experience. Accelerated by AI.",
    url: siteUrl,
    siteName: "Bespoke Everything",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bespoke Everything | Software • Services • Solutions",
    description:
      "Twenty years solving business problems. Built on experience. Accelerated by AI.",
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
