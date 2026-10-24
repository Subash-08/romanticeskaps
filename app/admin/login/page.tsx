import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import "../admin.css";

export default async function AdminLoginPage() {
  if (await getServerSession(authOptions)) redirect("/admin");
  return <main className="admin-login-page"><section className="admin-login-card"><small>ROMANTICESKAPS ADMIN</small><h1>Welcome back.</h1><p>Sign in to manage the five packages, journal and search metadata.</p><AdminLoginForm /></section></main>;
}
