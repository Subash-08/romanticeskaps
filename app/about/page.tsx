import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, HeartHandshake, MapPinned } from "lucide-react";
import { InnerHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = { title: "About | romanticeskaps", description: "How romanticeskaps plans thoughtful honeymoons for two." };

export default function AboutPage() {
  const steps = [["01", "Listen", "We begin with how you want the honeymoon to feel, not a fixed package."], ["02", "Shape", "We compare routes, stays and experiences around your time and priorities."], ["03", "Refine", "You receive clear options and can adjust the pace before confirmation."], ["04", "Support", "One planning contact keeps the practical details together."]];
  return <main id="top" className="inner-page"><InnerHeader />
    <section className="about-hero"><div><p className="eyebrow"><span />ABOUT ROMANTICESKAPS</p><h1>Planning with care.<br /><em>Travelling with ease.</em></h1><p>romanticeskaps is being shaped as a focused honeymoon-planning studio: personal enough to listen, structured enough to make every detail clear.</p></div><img src="/images/dinner.jpg" alt="Romantic dinner overlooking the water" /></section>
    <section id="how-it-works" className="section about-process"><div className="split-head"><div><p className="eyebrow"><span />HOW IT WORKS</p><h2>Four calm steps from idea to itinerary.</h2></div><div><p>This workflow is designed to connect cleanly to a future admin system for packages, enquiries, content and customer communication.</p></div></div><div className="about-step-grid">{steps.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="section about-values"><article><Compass /><h3>Thoughtful routes</h3><p>Every day should add meaning without making the trip feel rushed.</p></article><article><MapPinned /><h3>Clear details</h3><p>Stays, meals, transfers and exclusions are visible before confirmation.</p></article><article><HeartHandshake /><h3>Human planning</h3><p>Technology supports the process; a real conversation shapes the journey.</p></article></section>
    <section className="simple-cta"><h2>Begin with a place—or simply a feeling.</h2><Link href="/enquiry">Plan our honeymoon <ArrowUpRight /></Link></section><SiteFooter /></main>;
}
