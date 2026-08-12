import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });
config();

const url = process.env.DATABASE_URL;
console.log("DATABASE_URL set:", !!url);
if (url) {
  try {
    const host = new URL(url.replace("postgresql://", "http://")).hostname;
    console.log("DATABASE_URL host:", host);
  } catch {
    console.log("DATABASE_URL parse failed");
  }
}
