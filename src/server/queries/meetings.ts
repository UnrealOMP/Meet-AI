import { db } from "@/db";
import { meetings } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getMeetingById(
  meetingId: string,
  userId: string
) {
  const [meeting] = await db
    .select()
    .from(meetings)
    .where(eq(meetings.id, meetingId))
    .limit(1);

  // Security check (important)
  if (!meeting || meeting.ownerId !== userId) {
    return null;
  }

  return meeting;
}


export async function getAllMeetings(userId: string) {
  return await db
    .select()
    .from(meetings)
    .where(eq(meetings.ownerId, userId))
    .orderBy(desc(meetings.startedAt));
}


export async function getRecentMeetings(userId: string, limit = 5) {
  return await db
    .select({
      id: meetings.id,
      title: meetings.title,
      startedAt: meetings.startedAt,
      durationMinutes: meetings.durationMinutes,
      status: meetings.status,
    })
    .from(meetings)
    .where(eq(meetings.ownerId, userId))
    .orderBy(desc(meetings.startedAt))
    .limit(limit);
}
