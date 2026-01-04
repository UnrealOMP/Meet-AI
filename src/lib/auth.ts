// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/db";          // your drizzle instance
import * as schema from "@/db/schema";

export const auth = betterAuth({
  appName: "MeetAI",

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      // expose all your tables (users, meetings, actionItems, accounts, sessions, verificationTokens, ...)
      ...schema,
      // and explicitly map Better Auth model names
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verificationTokens,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },

  plugins: [nextCookies()],

  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});
