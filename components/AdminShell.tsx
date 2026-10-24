"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { BookOpen, Boxes, LayoutDashboard, LogOut } from "lucide-react";

export function AdminShell({ children, user }: { children: React.ReactNode; user: string }) {
  return <div className="admin-shell"><aside className="admin-sidebar"><Link href="/" className="admin-brand">romanticeskaps <span>ADMIN</span></Link><nav><Link href="/admin"><LayoutDashboard />Dashboard</Link><Link href="/admin/packages"><Boxes />Packages</Link><Link href="/admin/journal"><BookOpen />Journal</Link></nav><div className="admin-user"><span>{user}</span><button onClick={() => signOut({ callbackUrl: "/admin/login" })}><LogOut />Sign out</button></div></aside><main className="admin-main">{children}</main></div>;
}
