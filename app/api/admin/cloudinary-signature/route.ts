import { createHash } from "node:crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST() {
  const session = await getServerSession(authOptions); if (session?.user.role !== "admin") return new Response("Unauthorized", { status: 401 });
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME; const apiKey = process.env.CLOUDINARY_API_KEY; const secret = process.env.CLOUDINARY_API_SECRET; if (!cloudName || !apiKey || !secret) return new Response("Cloudinary environment variables are not configured.", { status: 503 });
  const timestamp = Math.floor(Date.now() / 1000); const folder = "romanticeskaps"; const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${secret}`).digest("hex");
  return Response.json({ cloudName, apiKey, timestamp, folder, signature });
}
