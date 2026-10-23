import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "romanticeskaps — Honeymoons, Thoughtfully Made",
  description: "romanticeskaps creates personal honeymoon journeys for two.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
