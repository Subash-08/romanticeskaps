import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Users } from "lucide-react";
import { InnerHeader, SiteFooter } from "@/components/SiteChrome";
import { formatPrice, honeymoonPackages } from "@/lib/packages";

export const metadata: Metadata = {
  title: "Honeymoon Packages | romanticeskaps",
  description: "Explore romanticeskaps honeymoon packages across India, with editable itineraries, stays and inclusions.",
};

export default function PackagesPage() {
  return <main id="top" className="inner-page">
    <InnerHeader />
    <section className="packages-hero">
      <p className="eyebrow"><span />PACKAGES FOR TWO</p>
      <h1>Choose a beginning.<br /><em>Make it yours.</em></h1>
      <p>These sample journeys are built from current package references. Dates, stays and experiences can be reshaped before your proposal is confirmed.</p>
      <div className="packages-hero-facts"><span>05 curated routes</span><span>Private planning</span><span>Editable itineraries</span></div>
    </section>

    <section className="package-index section">
      <div className="package-index-intro"><p className="eyebrow"><span />ALL HONEYMOONS</p><h2>Five ways to get away together.</h2></div>
      <div className="package-list-grid">
        {honeymoonPackages.map((item, index) => <article className="package-list-card" key={item.slug}>
          <Link className="package-list-image" href={`/packages/${item.slug}`}><img src={item.image} alt={`${item.destination} honeymoon`} style={{ objectPosition: item.imagePosition }} /><span>0{index + 1}</span></Link>
          <div className="package-list-copy">
            <p className="package-region"><MapPin size={14} />{item.region}</p>
            <h2><Link href={`/packages/${item.slug}`}>{item.title}</Link></h2>
            <p>{item.summary}</p>
            <div className="package-card-facts"><span><CalendarDays size={15} />{item.duration}</span><span><Users size={15} />{item.travellers}</span></div>
            <div className="package-card-bottom"><div><small>STARTING FROM</small><strong>{formatPrice(item.priceFrom)}</strong><span>per couple</span></div><Link aria-label={`View ${item.title}`} href={`/packages/${item.slug}`}><ArrowUpRight /></Link></div>
          </div>
        </article>)}
      </div>
    </section>
    <SiteFooter />
  </main>;
}
