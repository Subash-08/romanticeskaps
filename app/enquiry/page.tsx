import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { InnerHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = { title: "Plan Your Honeymoon | romanticeskaps", description: "Start a personal honeymoon enquiry with romanticeskaps." };

export default async function EnquiryPage({ searchParams }: { searchParams: Promise<{ package?: string }> }) {
  const selected = (await searchParams).package || "";
  return <main id="top" className="inner-page">
    <InnerHeader />
    <section className="enquiry-layout">
      <div className="enquiry-intro"><p className="eyebrow"><span />START TOGETHER</p><h1>Tell us what the two of you imagine.</h1><p>Share the useful details now. A planner can refine the route, compare stays and prepare a clear proposal later.</p><div className="enquiry-promises"><span>One planning contact</span><span>Customisable itinerary</span><span>Clear inclusions</span></div></div>
      <EnquiryForm initialPackage={selected} />
    </section>
    <SiteFooter />
  </main>;
}
