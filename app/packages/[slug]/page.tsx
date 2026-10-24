import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Clock3, MapPin, Users, X } from "lucide-react";
import { InnerHeader, SiteFooter } from "@/components/SiteChrome";
import { formatPrice } from "@/lib/packages";
import { getPackageRecord, getPackages } from "@/lib/content-store";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getPackages()).map(item => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = await getPackageRecord((await params).slug);
  if (!item) return {};
  return { title: item.metaTitle || `${item.title} | romanticeskaps`, description: item.metaDescription || item.summary, alternates: { canonical: item.canonicalUrl || `/packages/${item.slug}` }, robots: { index: !item.noIndex, follow: !item.noFollow }, openGraph: { title: item.ogTitle || item.title, description: item.ogDescription || item.summary, images: item.ogImage ? [item.ogImage] : [item.image], type: "website" }, twitter: { card: item.twitterCard, title: item.twitterTitle || item.title, description: item.twitterDescription || item.summary, images: item.twitterImage ? [item.twitterImage] : [item.image] } };
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = await getPackageRecord((await params).slug);
  if (!item) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const structuredData = { "@context": "https://schema.org", "@type": "TouristTrip", name: item.title, description: item.summary, touristType: "Honeymoon couples", itinerary: item.itinerary.map(day => ({ "@type": "TouristAttraction", name: `Day ${day.day}: ${day.title}`, description: day.description })), offers: { "@type": "Offer", priceCurrency: "INR", price: item.priceFrom, url: `${baseUrl}/packages/${item.slug}`, availability: "https://schema.org/LimitedAvailability" }, provider: { "@type": "TravelAgency", name: "romanticeskaps", url: baseUrl } };

  return <main id="top" className="inner-page package-detail-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <InnerHeader />
    <section className="package-detail-hero">
      <img src={item.image} alt={`${item.destination} landscape`} style={{ objectPosition: item.imagePosition }} />
      <div className="package-detail-shade" />
      <div className="package-detail-copy">
        <Link className="detail-back" href="/packages"><ArrowLeft size={16} /> All packages</Link>
        <p className="eyebrow eyebrow-light"><span />{item.region} · {item.code}</p>
        <h1>{item.title}</h1>
        <p>{item.summary}</p>
        <div className="detail-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </div>
      <aside className="package-booking-card">
        <small>PACKAGE ESTIMATE</small><strong>{formatPrice(item.priceFrom)}</strong><span>per couple</span>
        <div><p><Clock3 />{item.duration}</p><p><Users />{item.travellers}</p><p><MapPin />{item.destination}</p></div>
        <Link href={`/enquiry?package=${item.slug}`}>Customise this journey <ArrowUpRight /></Link>
        <em>Rates and availability are reconfirmed before booking.</em>
      </aside>
    </section>

    <section className="detail-overview section">
      <div className="detail-intro"><p className="eyebrow"><span />THE JOURNEY</p><h2>A clear plan, with room to make it personal.</h2><p>{item.mealPlan}. Dates, stays and availability are reconfirmed before booking.</p></div>
      <div className="detail-highlights">{item.highlights.map((highlight, index) => <article key={highlight}><span>0{index + 1}</span><strong>{highlight}</strong></article>)}</div>
    </section>

    <section className="itinerary-section">
      <div className="section itinerary-inner">
        <div className="itinerary-heading"><p className="eyebrow eyebrow-light"><span />DAY BY DAY</p><h2>The route, one day at a time.</h2><p>Inspired by the clarity of a field journal: each day has one focus, practical context, and space for approved updates.</p></div>
        <div className="itinerary-timeline">{item.itinerary.map(day => <article key={day.day}>
          <div className="day-number"><span>DAY</span><strong>{String(day.day).padStart(2, "0")}</strong></div>
          <div><h3>{day.title}</h3>{day.distance && <small>{day.distance}</small>}<p>{day.description}</p></div>
        </article>)}</div>
      </div>
    </section>

    <section className="section stay-section">
      <div className="stay-heading"><p className="eyebrow"><span />STAYS & MOVEMENT</p><h2>Where you stay, and how you travel.</h2></div>
      <div className="stay-grid">{item.stays.map(stay => <article key={`${stay.place}-${stay.property}`}><span>{stay.nights} NIGHT{stay.nights > 1 ? "S" : ""}</span><h3>{stay.place}</h3><strong>{stay.property}</strong><p>{stay.room}</p><p>{stay.meals}</p></article>)}</div>
      <div className="transport-list">{item.transport.map(value => <p key={value}><ArrowUpRight size={16} />{value}</p>)}</div>
    </section>

    <section className="section package-terms">
      <div className="term-card included"><p className="eyebrow"><span />INCLUDED</p><h2>Part of your package</h2>{item.inclusions.map(value => <p key={value}><Check size={17} />{value}</p>)}</div>
      <div className="term-card excluded"><p className="eyebrow"><span />NOT INCLUDED</p><h2>Plan separately</h2>{item.exclusions.map(value => <p key={value}><X size={17} />{value}</p>)}</div>
    </section>

    <section className="section practical-section">
      <div><p className="eyebrow"><span />GOOD TO KNOW</p><h2>Practical notes before confirmation.</h2></div>
      <div className="practical-list">{item.notes.map((note, index) => <article key={note}><span>0{index + 1}</span><p>{note}</p></article>)}{item.cancellation?.map((note, index) => <article key={note}><span>C{index + 1}</span><p>{note}</p></article>)}</div>
    </section>

    <section className="package-detail-cta"><p>READY WHEN YOU ARE</p><h2>Let’s shape this into <em>your honeymoon.</em></h2><Link href={`/enquiry?package=${item.slug}`}>Start an enquiry <ArrowUpRight /></Link></section>
    <SiteFooter />
  </main>;
}
