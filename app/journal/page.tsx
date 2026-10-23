import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InnerHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = { title: "Honeymoon Journal | romanticeskaps", description: "Planning guides, destination comparisons and honeymoon inspiration." };

const articles = [
  ["DESTINATION GUIDE", "Kerala or Andaman: which pace feels more like you?", "Backwater stillness and hill-country drives, compared with beaches and island ferries.", "/images/island.jpg"],
  ["PLANNING", "What a honeymoon package should explain clearly", "A practical checklist for stays, meals, transfers, activities, exclusions and flexibility.", "/images/island.jpg"],
  ["SEASONAL GUIDE", "When to plan a Kashmir honeymoon", "How snow, road conditions and local transport can shape the final itinerary.", "/images/dinner.jpg"],
  ["SLOW TRAVEL", "Leave one part of the honeymoon unplanned", "Why a little breathing room can become the most memorable part of the journey.", "/images/island.jpg"],
];

export default function JournalPage() {
  return <main id="top" className="inner-page"><InnerHeader />
    <section className="journal-page-hero"><p className="eyebrow"><span />THE JOURNAL</p><h1>Useful ideas for the <em>beginning of forever.</em></h1><p>Editorial placeholders for future destination guides, comparison articles and honest planning advice.</p></section>
    <section className="section journal-page-grid">{articles.map(([tag, title, copy, image], index) => <article key={title} className={index === 0 ? "featured" : ""}><img src={image} alt="" /><div><small>{tag} · SAMPLE ARTICLE</small><h2>{title}</h2><p>{copy}</p><Link href="#">Read when published <ArrowUpRight /></Link></div></article>)}</section>
    <SiteFooter /></main>;
}
