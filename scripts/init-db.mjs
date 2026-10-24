import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const database = path.join(process.cwd(), "data", "content.json");
try { process.loadEnvFile?.(".env"); } catch {}
if (process.env.MONGODB_URI || !existsSync(database)) {
  console.log("Creating the content store through the application build...");
  const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
  const result = spawnSync(process.execPath, [nextBin, "build"], { stdio: "inherit", env: process.env });
  if (result.status !== 0 || !existsSync(database)) throw new Error("The content store could not be initialized.");
}
console.log("Content store ready with the five supplied honeymoon packages.");
