// drizzle.config.ts
import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";

dotenv.config({ path: ".env.local" });
dotenv.config();

const config = {
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations", // 🔥 THIS IS THE FIX
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;

export default config;
  