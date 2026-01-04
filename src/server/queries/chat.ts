import { db } from "@/db";
import { chatMessages } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function getChatForMeeting(meetingId: string) {
  return db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.meetingId, meetingId))
    .orderBy(asc(chatMessages.createdAt));
}
