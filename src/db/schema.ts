// src/db/schema.ts
import {
  pgTable,
  varchar,
  timestamp,
  integer,
  boolean,
  text,
} from "drizzle-orm/pg-core";

/* ================= USERS ================= */
export const users = pgTable("users", {
  id: text("id").primaryKey(), // 🔥 TEXT, not UUID
  name: varchar("name", { length: 120 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password"),
  emailVerified: boolean("email_verified").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/* ================= MEETINGS ================= */
export const meetings = pgTable("meetings", {
  id: text("id").primaryKey(),
  ownerId: text("owner_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  durationMinutes: integer("duration_minutes").default(30).notNull(),


  status: varchar("status", { length: 32 })
  .default("processing")
  .notNull(),

  recordingPath: text("recording_path"),

  errorMessage: text("error_message"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});


/* ================= ACTION ITEMS ================= */
export const actionItems = pgTable("action_items", {
  id: text("id").primaryKey(),
  meetingId: text("meeting_id")
    .notNull()
    .references(() => meetings.id, { onDelete: "cascade" }),
  ownerId: text("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ================= TRANSCRIPTS ================= */
export const transcripts = pgTable("transcripts", {
  id: text("id").primaryKey(),
  meetingId: text("meeting_id")
    .notNull()
    .references(() => meetings.id, { onDelete: "cascade" }),

  text: text("text").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ================= SUMMARIES ================= */
export const summaries = pgTable("summaries", {
  id: text("id").primaryKey(),
  meetingId: text("meeting_id")
    .notNull()
    .references(() => meetings.id, { onDelete: "cascade" }),

  content: text("content").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: text("id").primaryKey(),
  meetingId: text("meeting_id")
    .notNull()
    .references(() => meetings.id, { onDelete: "cascade" }),

  role: text("role").notNull(), // "user" | "assistant"
  content: text("content").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});



/* ================= ACCOUNTS ================= */
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/* ================= SESSIONS ================= */
export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  token: text("token").notNull().unique(),

  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  expiresAt: timestamp("expires_at").notNull(),

  ipAddress: text("ip_address"),     // ✅ REQUIRED by Better Auth
  userAgent: text("user_agent"),     // ✅ REQUIRED by Better Auth

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});


/* ================= VERIFICATION TOKENS ================= */
export const verificationTokens = pgTable("verification_tokens", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
