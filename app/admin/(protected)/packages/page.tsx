import Link from "next/link";
import { getPackages } from "@/lib/content-store";

export default async function AdminPackagesPage() {
  const packages = await getPackages(true);
  return <><header className="admin-head"><div><h1>Packages</h1><p>Manage supplied journeys and prepare new packages as drafts before publishing.</p></div><Link className="admin-button" href="/admin/packages/new">Add package</Link></header><table className="admin-table"><thead><tr><th>PACKAGE</th><th>DESTINATION</th><th>PRICE</th><th>STATUS</th><th>UPDATED</th><th /></tr></thead><tbody>{packages.map(item => <tr key={item.id}><td><strong>{item.title}</strong></td><td>{item.destination}</td><td>{item.priceLabel}</td><td><span className={`status ${item.status}`}>{item.status}</span></td><td>{new Date(item.updatedAt).toLocaleDateString("en-IN")}</td><td><Link href={`/admin/packages/${item.id}`}>Edit</Link></td></tr>)}</tbody></table></>;
}
