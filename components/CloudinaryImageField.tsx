"use client";

import { ChangeEvent, useState } from "react";

export function CloudinaryImageField({ name, label, initialValue = "" }: { name: string; label: string; initialValue?: string }) {
  const [value, setValue] = useState(initialValue); const [state, setState] = useState("");
  async function upload(event: ChangeEvent<HTMLInputElement>) { const file = event.target.files?.[0]; if (!file) return; setState("Preparing upload…"); try { const signatureResponse = await fetch("/api/admin/cloudinary-signature", { method: "POST" }); if (!signatureResponse.ok) throw new Error(await signatureResponse.text()); const config = await signatureResponse.json(); const body = new FormData(); body.set("file", file); body.set("api_key", config.apiKey); body.set("timestamp", String(config.timestamp)); body.set("folder", config.folder); body.set("signature", config.signature); setState("Uploading…"); const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, { method: "POST", body }); if (!response.ok) throw new Error("Cloudinary upload failed"); const result = await response.json(); setValue(result.secure_url); setState("Uploaded"); } catch (error) { setState(error instanceof Error ? error.message : "Upload failed"); } }
  return <label>{label}<input name={name} value={value} onChange={event => setValue(event.target.value)} placeholder="https://res.cloudinary.com/..." /><span className="admin-upload"><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={upload} /><small>{state || "Upload to Cloudinary or paste an approved URL."}</small></span></label>;
}
