import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { MongoClient, type Db } from "mongodb";
import type { HoneymoonPackage } from "@/lib/packages";
import { honeymoonPackages } from "@/lib/packages";

export type PublishStatus = "draft" | "published";

export type SeoFields = {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterCard: "summary" | "summary_large_image";
};

export type PackageRecord = HoneymoonPackage & SeoFields & {
  id: string;
  status: PublishStatus;
  featured: boolean;
  imageAlt: string;
  createdAt: string;
  updatedAt: string;
};

export type BlogPost = SeoFields & {
  id: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  status: PublishStatus;
  featured: boolean;
  featuredImage: string;
  imageAlt: string;
  category: string;
  tags: string[];
  relatedPostSlugs: string[];
  relatedPackageSlugs: string[];
  authorName: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: "admin";
  createdAt: string;
};

type ContentDatabase = { version: 1; users: AdminUser[]; packages: PackageRecord[]; posts: BlogPost[] };

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "content.json");
let writeQueue: Promise<unknown> = Promise.resolve();
let mongoClientPromise: Promise<MongoClient> | null = null;
let mongoReadyPromise: Promise<void> | null = null;

async function getMongoDatabase(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI; if (!uri) return null;
  mongoClientPromise ||= new MongoClient(uri, { maxPoolSize: 10, minPoolSize: 0, serverSelectionTimeoutMS: 8000 }).connect();
  const client = await mongoClientPromise;
  return client.db(process.env.MONGODB_DB || "romanticeskaps");
}

async function prepareMongo(database: Db) {
  mongoReadyPromise ||= (async () => {
    await Promise.all([
      database.collection("packages").createIndex({ slug: 1 }, { unique: true }),
      database.collection("posts").createIndex({ slug: 1 }, { unique: true }),
      database.collection("posts").createIndex({ status: 1, publishedAt: -1 }),
      database.collection("users").createIndex({ email: 1 }, { unique: true }),
    ]);
    await database.collection("packages").bulkWrite(seededPackages().map(item => ({ updateOne: { filter: { slug: item.slug }, update: { $setOnInsert: item }, upsert: true } })), { ordered: false });
  })();
  await mongoReadyPromise;
}

function seededPackages(): PackageRecord[] {
  const now = new Date().toISOString();
  return honeymoonPackages.map((item, index) => ({
    ...item,
    id: `package-${index + 1}`,
    status: "published",
    featured: index < 4,
    imageAlt: `${item.destination} honeymoon experience`,
    metaTitle: `${item.title} Honeymoon Package | romanticeskaps`,
    metaDescription: item.summary,
    canonicalUrl: "",
    noIndex: false,
    noFollow: false,
    ogTitle: item.title,
    ogDescription: item.summary,
    ogImage: item.image,
    twitterTitle: item.title,
    twitterDescription: item.summary,
    twitterImage: item.image,
    twitterCard: "summary_large_image",
    createdAt: now,
    updatedAt: now,
  }));
}

export async function initializeStore() {
  const mongo = await getMongoDatabase();
  if (mongo) { await prepareMongo(mongo); return; }
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(dataFile, "utf8");
  } catch {
    const initial: ContentDatabase = { version: 1, users: [], packages: seededPackages(), posts: [] };
    await writeFile(dataFile, JSON.stringify(initial, null, 2), "utf8");
  }
}

async function readStore(): Promise<ContentDatabase> {
  await initializeStore();
  return JSON.parse(await readFile(dataFile, "utf8")) as ContentDatabase;
}

async function updateStore<T>(mutate: (database: ContentDatabase) => T | Promise<T>): Promise<T> {
  const operation = writeQueue.then(async () => {
    const database = await readStore();
    const result = await mutate(database);
    const temporaryFile = `${dataFile}.${process.pid}.tmp`;
    await writeFile(temporaryFile, JSON.stringify(database, null, 2), "utf8");
    await rename(temporaryFile, dataFile);
    return result;
  });
  writeQueue = operation.then(() => undefined, () => undefined);
  return operation;
}

export async function getPackages(includeDrafts = false) {
  const mongo = await getMongoDatabase();
  if (mongo) { await prepareMongo(mongo); return await mongo.collection("packages").find(includeDrafts ? {} : { status: "published" }).project({ _id: 0 }).sort({ createdAt: 1 }).toArray() as unknown as PackageRecord[]; }
  const items = (await readStore()).packages;
  return items.filter(item => includeDrafts || item.status === "published");
}

export async function getPackageRecord(slug: string, includeDrafts = false) {
  return (await getPackages(includeDrafts)).find(item => item.slug === slug);
}

export async function savePackageRecord(record: PackageRecord) {
  const mongo = await getMongoDatabase();
  if (mongo) { await prepareMongo(mongo); const next = { ...record, updatedAt: new Date().toISOString() }; await mongo.collection("packages").replaceOne({ id: record.id }, next, { upsert: true }); return next; }
  return updateStore(database => {
    const index = database.packages.findIndex(item => item.id === record.id);
    record.updatedAt = new Date().toISOString();
    if (index < 0) database.packages.push(record);
    else database.packages[index] = record;
    return record;
  });
}

export function createEmptyPackage(): PackageRecord {
  const now = new Date().toISOString();
  return {
    id: randomUUID(), slug: "", code: "", title: "", destination: "", region: "", duration: "", nights: 0, days: 1,
    travellers: "2 adults", priceFrom: 0, priceLabel: "Price on request", mealPlan: "", summary: "", image: "", imagePosition: "center center",
    tags: [], highlights: [], stays: [], transport: [], itinerary: [], inclusions: [], exclusions: [], notes: [], cancellation: [],
    status: "draft", featured: false, imageAlt: "", metaTitle: "", metaDescription: "", canonicalUrl: "", noIndex: false, noFollow: false,
    ogTitle: "", ogDescription: "", ogImage: "", twitterTitle: "", twitterDescription: "", twitterImage: "", twitterCard: "summary_large_image",
    createdAt: now, updatedAt: now,
  };
}

export async function getPosts(includeDrafts = false) {
  const mongo = await getMongoDatabase();
  if (mongo) { await prepareMongo(mongo); return await mongo.collection("posts").find(includeDrafts ? {} : { status: "published" }).project({ _id: 0 }).sort({ publishedAt: -1, updatedAt: -1 }).toArray() as unknown as BlogPost[]; }
  const posts = (await readStore()).posts.filter(post => includeDrafts || post.status === "published");
  return posts.sort((a, b) => (b.publishedAt || b.updatedAt).localeCompare(a.publishedAt || a.updatedAt));
}

export async function getPostBySlug(slug: string, includeDrafts = false) {
  return (await getPosts(includeDrafts)).find(post => post.slug === slug);
}

export async function getPostById(id: string) {
  return (await getPosts(true)).find(post => post.id === id);
}

export async function savePostRecord(record: BlogPost) {
  const mongo = await getMongoDatabase();
  if (mongo) { await prepareMongo(mongo); const now = new Date().toISOString(); const next = { ...record, updatedAt: now, publishedAt: record.status === "published" ? (record.publishedAt || now) : record.publishedAt }; await mongo.collection("posts").replaceOne({ id: next.id }, next, { upsert: true }); return next; }
  return updateStore(database => {
    const now = new Date().toISOString();
    const next = { ...record, updatedAt: now, publishedAt: record.status === "published" ? (record.publishedAt || now) : record.publishedAt };
    const index = database.posts.findIndex(item => item.id === next.id);
    if (index >= 0) database.posts[index] = next;
    else database.posts.push(next);
    return next;
  });
}

export function createEmptyPost(): BlogPost {
  const now = new Date().toISOString();
  return { id: randomUUID(), title: "", slug: "", html: "", excerpt: "", status: "draft", featured: false, featuredImage: "", imageAlt: "", category: "", tags: [], relatedPostSlugs: [], relatedPackageSlugs: [], authorName: "romanticeskaps", publishedAt: null, createdAt: now, updatedAt: now, metaTitle: "", metaDescription: "", canonicalUrl: "", noIndex: false, noFollow: false, ogTitle: "", ogDescription: "", ogImage: "", twitterTitle: "", twitterDescription: "", twitterImage: "", twitterCard: "summary_large_image" };
}

export async function findUserByEmail(email: string) {
  const mongo = await getMongoDatabase();
  if (mongo) { await prepareMongo(mongo); return await mongo.collection("users").findOne({ email: email.toLowerCase() }, { projection: { _id: 0 } }) as AdminUser | null; }
  return (await readStore()).users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

export async function upsertAdminUser(user: Omit<AdminUser, "id" | "createdAt" | "role">) {
  const mongo = await getMongoDatabase();
  if (mongo) { await prepareMongo(mongo); const email = user.email.toLowerCase(); await mongo.collection("users").updateOne({ email }, { $set: { name: user.name, passwordHash: user.passwordHash, role: "admin" }, $setOnInsert: { id: randomUUID(), email, createdAt: new Date().toISOString() } }, { upsert: true }); return await findUserByEmail(email) as AdminUser; }
  return updateStore(database => {
    const existing = database.users.find(item => item.email.toLowerCase() === user.email.toLowerCase());
    if (existing) {
      existing.name = user.name;
      existing.passwordHash = user.passwordHash;
      return existing;
    }
    const next: AdminUser = { ...user, id: randomUUID(), role: "admin", createdAt: new Date().toISOString() };
    database.users.push(next);
    return next;
  });
}

export async function getDashboardCounts() {
  const mongo = await getMongoDatabase();
  if (mongo) { await prepareMongo(mongo); const [packages, publishedPackages, posts, publishedPosts] = await Promise.all([mongo.collection("packages").countDocuments(), mongo.collection("packages").countDocuments({ status: "published" }), mongo.collection("posts").countDocuments(), mongo.collection("posts").countDocuments({ status: "published" })]); return { packages, publishedPackages, posts, publishedPosts }; }
  const database = await readStore();
  return { packages: database.packages.length, publishedPackages: database.packages.filter(item => item.status === "published").length, posts: database.posts.length, publishedPosts: database.posts.filter(item => item.status === "published").length };
}
