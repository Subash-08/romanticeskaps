"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FilterXSS } from "xss";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { createEmptyPackage, createEmptyPost, getPackageRecord, getPackages, getPostById, getPosts, savePackageRecord, savePostRecord, type BlogPost } from "@/lib/content-store";
import { slugify } from "@/lib/slugify";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin") redirect("/admin/login");
}

const text = (data: FormData, key: string) => String(data.get(key) || "").trim();
const checked = (data: FormData, key: string) => data.get(key) === "on";
const lines = (value: string) => value.split(/\r?\n/).map(item => item.trim()).filter(Boolean);
function jsonValue<T>(value: string, fallback: T): T { try { return JSON.parse(value) as T; } catch { return fallback; } }

export async function savePackageAction(data: FormData) {
  await requireAdmin();
  const current = await getPackageRecord(text(data, "slugOriginal"), true);
  if (!current) throw new Error("Package not found");
  const core = z.object({ title: z.string().min(3), slug: z.string().min(3), destination: z.string().min(2), summary: z.string().min(30), priceFrom: z.number().nonnegative(), days: z.number().int().positive(), nights: z.number().int().nonnegative() }).parse({ title: text(data, "title"), slug: slugify(text(data, "slug")), destination: text(data, "destination"), summary: text(data, "summary"), priceFrom: Number(text(data, "priceFrom")), days: Number(text(data, "days")), nights: Number(text(data, "nights")) });
  const record = {
    ...current, ...core,
    code: text(data, "code"), region: text(data, "region"), duration: text(data, "duration"), travellers: text(data, "travellers"), priceLabel: text(data, "priceLabel"), mealPlan: text(data, "mealPlan"), image: text(data, "image"), imagePosition: text(data, "imagePosition"), imageAlt: text(data, "imageAlt"),
    tags: lines(text(data, "tags")), highlights: lines(text(data, "highlights")), transport: lines(text(data, "transport")), inclusions: lines(text(data, "inclusions")), exclusions: lines(text(data, "exclusions")), notes: lines(text(data, "notes")), cancellation: lines(text(data, "cancellation")),
    stays: jsonValue(text(data, "stays"), current.stays), itinerary: jsonValue(text(data, "itinerary"), current.itinerary), status: text(data, "status") === "published" ? "published" as const : "draft" as const, featured: checked(data, "featured"),
    metaTitle: text(data, "metaTitle"), metaDescription: text(data, "metaDescription"), canonicalUrl: text(data, "canonicalUrl"), noIndex: checked(data, "noIndex"), noFollow: checked(data, "noFollow"), ogTitle: text(data, "ogTitle"), ogDescription: text(data, "ogDescription"), ogImage: text(data, "ogImage"), twitterTitle: text(data, "twitterTitle"), twitterDescription: text(data, "twitterDescription"), twitterImage: text(data, "twitterImage"), twitterCard: text(data, "twitterCard") === "summary" ? "summary" as const : "summary_large_image" as const,
  };
  await savePackageRecord(record);
  revalidatePath("/"); revalidatePath("/packages"); revalidatePath(`/packages/${record.slug}`); revalidatePath("/sitemap.xml");
  redirect(`/admin/packages/${record.id}?saved=1`);
}

export async function createPackageAction(data: FormData) {
  await requireAdmin();
  const current = createEmptyPackage();
  const title = z.string().min(3).parse(text(data, "title"));
  const slug = slugify(text(data, "slug") || title);
  if ((await getPackages(true)).some(item => item.slug === slug)) throw new Error("Another package already uses this slug.");
  const record = {
    ...current,
    title,
    slug,
    destination: z.string().min(2).parse(text(data, "destination")),
    summary: z.string().min(30).parse(text(data, "summary")),
    priceFrom: z.number().nonnegative().parse(Number(text(data, "priceFrom"))),
    days: z.number().int().positive().parse(Number(text(data, "days"))),
    nights: z.number().int().nonnegative().parse(Number(text(data, "nights"))),
    code: text(data, "code"), region: text(data, "region"), duration: text(data, "duration"), travellers: text(data, "travellers"), priceLabel: text(data, "priceLabel"), mealPlan: text(data, "mealPlan"), image: text(data, "image"), imagePosition: text(data, "imagePosition"), imageAlt: text(data, "imageAlt"),
    tags: lines(text(data, "tags")), highlights: lines(text(data, "highlights")), transport: lines(text(data, "transport")), inclusions: lines(text(data, "inclusions")), exclusions: lines(text(data, "exclusions")), notes: lines(text(data, "notes")), cancellation: lines(text(data, "cancellation")),
    stays: jsonValue(text(data, "stays"), []), itinerary: jsonValue(text(data, "itinerary"), []), status: "draft" as const,
    metaTitle: text(data, "metaTitle"), metaDescription: text(data, "metaDescription"), canonicalUrl: text(data, "canonicalUrl"), noIndex: checked(data, "noIndex"), noFollow: checked(data, "noFollow"), ogTitle: text(data, "ogTitle"), ogDescription: text(data, "ogDescription"), ogImage: text(data, "ogImage"), twitterTitle: text(data, "twitterTitle"), twitterDescription: text(data, "twitterDescription"), twitterImage: text(data, "twitterImage"), twitterCard: text(data, "twitterCard") === "summary" ? "summary" as const : "summary_large_image" as const,
  };
  await savePackageRecord(record);
  revalidatePath("/"); revalidatePath("/packages"); revalidatePath("/sitemap.xml"); revalidatePath("/llms.txt");
  redirect(`/admin/packages/${record.id}?saved=1`);
}

export async function saveBlogAction(data: FormData) {
  await requireAdmin();
  const current = text(data, "id") ? await getPostById(text(data, "id")) : createEmptyPost();
  if (!current) throw new Error("Article not found");
  const title = z.string().min(5).max(140).parse(text(data, "title"));
  const slug = slugify(text(data, "slug") || title);
  const duplicate = (await getPosts(true)).find(post => post.slug === slug && post.id !== current.id);
  if (duplicate) throw new Error("Another article already uses this slug.");
  const rawHtml = z.string().min(20).parse(text(data, "html"));
  const safeHtml = new FilterXSS({ whiteList: { h2: ["id"], h3: ["id"], h4: ["id"], p: ["class"], strong: [], em: [], b: [], i: [], ul: [], ol: [], li: [], blockquote: [], br: [], hr: [], a: ["href", "title", "target", "rel"], img: ["src", "alt", "width", "height", "loading"], figure: ["class"], figcaption: [], table: [], thead: [], tbody: [], tr: [], th: [], td: [] }, stripIgnoreTag: true, stripIgnoreTagBody: ["script", "style", "iframe", "object", "embed", "svg", "math", "noscript"] }).process(rawHtml);
  const status = text(data, "status") === "published" ? "published" as const : "draft" as const;
  const record: BlogPost = {
    ...current, title, slug, html: safeHtml, excerpt: z.string().min(20).max(320).parse(text(data, "excerpt")), status, featured: checked(data, "featured"), featuredImage: text(data, "featuredImage"), imageAlt: text(data, "imageAlt"), category: text(data, "category"), tags: lines(text(data, "tags").replaceAll(",", "\n")), relatedPostSlugs: data.getAll("relatedPostSlugs").map(String), relatedPackageSlugs: data.getAll("relatedPackageSlugs").map(String), authorName: text(data, "authorName") || "romanticeskaps",
    metaTitle: text(data, "metaTitle"), metaDescription: text(data, "metaDescription"), canonicalUrl: text(data, "canonicalUrl"), noIndex: checked(data, "noIndex"), noFollow: checked(data, "noFollow"), ogTitle: text(data, "ogTitle"), ogDescription: text(data, "ogDescription"), ogImage: text(data, "ogImage"), twitterTitle: text(data, "twitterTitle"), twitterDescription: text(data, "twitterDescription"), twitterImage: text(data, "twitterImage"), twitterCard: text(data, "twitterCard") === "summary" ? "summary" : "summary_large_image",
  };
  const saved = await savePostRecord(record);
  revalidatePath("/"); revalidatePath("/journal"); revalidatePath(`/journal/${saved.slug}`); revalidatePath("/journal/feed.xml"); revalidatePath("/sitemap.xml");
  redirect(`/admin/journal/${saved.id}?saved=1`);
}
