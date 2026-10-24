import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, Heart, MapPin } from "lucide-react";
import { InnerHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = { title: "Gallery | romanticeskaps", description: "Honeymoon inspiration from romanticeskaps." };

export default function GalleryPage() {
  return <main id="top" className="inner-page gallery-page"><InnerHeader />
    <section className="gallery-page-hero"><p className="eyebrow"><span />YOUR JOURNEY</p><h1>See where your <em>story</em> could take you.</h1><p>A glimpse of private stays, shared discoveries and the beautiful in-between moments that make a honeymoon yours.</p></section>
    <section className="section gallery gallery-showcase"><div className="film"><img src="/images/island.jpg" alt="Aerial view of a tropical island resort" /><span className="film-overlay" /><span className="film-disc"><ArrowUpRight /><b>EXPLORE THE STORY</b></span><span className="film-meta"><b>ROMANTICESKAPS · HONEYMOON JOURNEY</b><i>INDIA → ISLANDS</i></span></div><p className="quiet-line">Some beginnings are better felt than explained.</p></section>
    <section className="section gallery-moments"><div className="split-head"><div><p className="eyebrow"><span />SMALL MOMENTS</p><h2>A honeymoon is more than a destination.</h2></div><div><p>It is a quieter morning, an unplanned stop and the feeling that every detail has room for both of you.</p></div></div><div className="gallery-moment-grid"><article><img src="/images/dinner.jpg" alt="Candlelit dinner overlooking the water" /><div><Heart /><h3>Made for two</h3><p>Private moments shaped around connection.</p></div></article><article><img src="/images/pool.jpg" alt="Private pool beside tropical water" /><div><Compass /><h3>Room to slow down</h3><p>Stays chosen for atmosphere and ease.</p></div></article><article><img src="/images/island.jpg" alt="Tropical island coastline" /><div><MapPin /><h3>A sense of place</h3><p>Experiences that stay with you after home.</p></div></article></div></section>
    <section className="simple-cta"><h2>Ready to turn inspiration into a journey?</h2><Link href="/packages">Explore packages <ArrowUpRight /></Link></section><SiteFooter />
  </main>;
}
