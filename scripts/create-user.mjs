import { readFile, rename, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { hash } from "bcryptjs";
import { MongoClient } from "mongodb";

try { process.loadEnvFile?.(".env"); } catch {}

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME?.trim() || "romanticeskaps Admin";
if (!email || !password) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD before running npm run user:create.");
if (password.length < 12) throw new Error("ADMIN_PASSWORD must contain at least 12 characters.");

const passwordHash = await hash(password, 12);
if (process.env.MONGODB_URI) {
  const client = new MongoClient(process.env.MONGODB_URI); await client.connect(); const users = client.db(process.env.MONGODB_DB || "romanticeskaps").collection("users"); await users.createIndex({ email: 1 }, { unique: true }); await users.updateOne({ email }, { $set: { name, passwordHash, role: "admin" }, $setOnInsert: { id: randomUUID(), email, createdAt: new Date().toISOString() } }, { upsert: true }); await client.close();
} else {
  const databasePath = path.join(process.cwd(), "data", "content.json");
  if (!existsSync(databasePath)) { const initializer = spawnSync(process.execPath, [path.join(process.cwd(), "scripts", "init-db.mjs")], { stdio: "inherit", env: process.env }); if (initializer.status !== 0) throw new Error("Initialize the content store before creating a user."); }
  const database = JSON.parse(await readFile(databasePath, "utf8")); const existing = database.users.find(user => user.email.toLowerCase() === email); if (existing) { existing.name = name; existing.passwordHash = passwordHash; } else database.users.push({ id: randomUUID(), email, name, passwordHash, role: "admin", createdAt: new Date().toISOString() }); const temporary = `${databasePath}.${process.pid}.tmp`; await writeFile(temporary, JSON.stringify(database, null, 2), "utf8"); await rename(temporary, databasePath);
}
console.log("Admin user created or updated.");
