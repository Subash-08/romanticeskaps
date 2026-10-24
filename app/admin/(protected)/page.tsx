import Link from "next/link";
import { getDashboardCounts } from "@/lib/content-store";

export default async function AdminDashboard() {
  const counts = await getDashboardCounts();
  return <><header className="admin-head"><div><h1>Dashboard</h1><p>Content operations for romanticeskaps.</p></div></header><section className="admin-stats"><article className="admin-stat"><small>PACKAGE RECORDS</small><strong>{counts.packages}</strong></article><article className="admin-stat"><small>PUBLISHED PACKAGES</small><strong>{counts.publishedPackages}</strong></article><article className="admin-stat"><small>JOURNAL ARTICLES</small><strong>{counts.posts}</strong></article><article className="admin-stat"><small>PUBLISHED ARTICLES</small><strong>{counts.publishedPosts}</strong></article></section><section className="admin-panel" style={{marginTop:20}}><h2>Content priorities</h2><p>Keep package facts faithful to the supplied PDFs. Add original journal articles that answer real honeymoon-planning questions, then connect each article to relevant packages and older articles.</p><p className="admin-actions"><Link className="admin-button" href="/admin/packages/new">Add package</Link><Link className="admin-button admin-button-secondary" href="/admin/journal/new">Create journal article</Link></p></section></>;
}
