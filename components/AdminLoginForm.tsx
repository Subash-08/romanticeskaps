"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter(); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setError(""); const data = new FormData(event.currentTarget); const result = await signIn("credentials", { email: data.get("email"), password: data.get("password"), redirect: false }); setLoading(false); if (result?.error) setError("Invalid email or password."); else { router.push("/admin"); router.refresh(); } }
  return <form className="admin-login-form" onSubmit={submit}><label>Email<input name="email" type="email" autoComplete="username" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p role="alert">{error}</p>}<button disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button></form>;
}
