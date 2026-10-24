import Link from "next/link";
import { getPosts } from "@/lib/content-store";

export default async function AdminJournalPage() {
  const posts = await getPosts(true);
  return <><header className="admin-head"><div><h1>Journal</h1><p>Original, answer-led content with controlled internal linking.</p></div><Link className="admin-button" href="/admin/journal/new">Create new blog</Link></header>{posts.length ? <table className="admin-table"><thead><tr><th>ARTICLE</th><th>CATEGORY</th><th>STATUS</th><th>UPDATED</th><th /></tr></thead><tbody>{posts.map(post => <tr key={post.id}><td><strong>{post.title}</strong><br /><small>/{post.slug}</small></td><td>{post.category || "Uncategorised"}</td><td><span className={`status ${post.status}`}>{post.status}</span></td><td>{new Date(post.updatedAt).toLocaleDateString("en-IN")}</td><td><Link href={`/admin/journal/${post.id}`}>Edit</Link></td></tr>)}</tbody></table> : <section className="admin-panel"><h2>No journal articles yet</h2><p>Create the first original article when you have approved content. No unrelated sample articles have been published.</p></section>}</>;
}
