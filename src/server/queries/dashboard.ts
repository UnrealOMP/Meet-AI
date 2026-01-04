// src/server/queries/dashboard.ts
import { db } from "@/db";
import { meetings, actionItems } from "@/db/schema";
import { eq, gte } from "drizzle-orm";

export async function getDashboardStats(userId: string) {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const meetingsThisWeek = await db
    .select()
    .from(meetings)
    .where(
      gte(meetings.startedAt, startOfWeek)
    );

  const actionItemsCount = await db
    .select()
    .from(actionItems)
    .where(eq(actionItems.ownerId, userId));

  return {
    meetingsThisWeek: meetingsThisWeek.length,
    hoursSaved: meetingsThisWeek.length * 0.75,
    actionItems: actionItemsCount.length,
  };
}
