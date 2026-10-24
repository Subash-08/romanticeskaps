import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "romanticeskaps — Honeymoons, Thoughtfully Made",
  description: "romanticeskaps creates personal honeymoon journeys for two.",
  applicationName: "romanticeskaps",
  alternates: { canonical: "/" },
  openGraph: { siteName: "romanticeskaps", type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "TravelAgency", name: "romanticeskaps", url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", areaServed: "India", description: "Personal honeymoon planning and curated journeys for couples." }).replace(/</g, "\\u003c") }} />{children}</body>
    </html>
  );
}
