import { config } from "dotenv";
import { resolve } from "path";
import postgres from "postgres";

config({ path: resolve(process.cwd(), ".env.local") });

const connectionString = process.env.DATABASE_URL;
console.log("URL host:", connectionString?.includes("neon.tech") ? "Neon" : connectionString);

const client = postgres(connectionString);

try {
  const users = await client`SELECT current_user, current_database()`;
  console.log("Connection OK:", users);

  const rows = await client`SELECT count(*) FROM users`;
  console.log("Users table OK:", rows);
} catch (err) {
  console.error("FAIL:", err.message);
} finally {
  await client.end();
}
