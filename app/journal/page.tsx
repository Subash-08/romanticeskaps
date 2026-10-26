import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InnerHeader, SiteFooter } from "@/components/SiteChrome";
import { getPosts } from "@/lib/content-store";

export const metadata: Metadata = { title: "Honeymoon Journal | romanticeskaps", description: "Original destination guides and practical honeymoon planning advice from romanticeskaps.", alternates: { canonical: "/journal" } };
export const revalidate = 3600;

export default async function JournalPage() {
  const articles = await getPosts();
  return <main id="top" className="inner-page"><InnerHeader />
    <section className="journal-page-hero"><div className="journal-page-heading"><p className="eyebrow"><span />ROMANTICESKAPS JOURNAL</p><h1>Honeymoon <em>notes.</em></h1></div><p className="journal-page-intro">Practical destination guides and thoughtful planning ideas for the journeys we currently offer.</p></section>
    {articles.length ? <section className="section journal-page-grid">{articles.map((article, index) => <article key={article.id} className={index === 0 && article.featured ? "featured" : ""}>{article.featuredImage ? <img src={article.featuredImage} alt={article.imageAlt} /> : <div className="journal-image-placeholder" />}<div><small>{article.category || "HONEYMOON PLANNING"}</small><h2>{article.title}</h2><p>{article.excerpt}</p><Link href={`/journal/${article.slug}`}>Read article <ArrowUpRight /></Link></div></article>)}</section> : <section className="section journal-empty"><p className="eyebrow"><span />COMING SOON</p><h2>Our first guides are being prepared.</h2><p>We will publish only approved, useful articles—no filler or unrelated sample content.</p><Link href="/packages">Explore the five packages <ArrowUpRight /></Link></section>}
    <SiteFooter /></main>;
}
