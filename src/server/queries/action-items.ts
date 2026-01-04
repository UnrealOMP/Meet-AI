import { db } from "@/db";
import { actionItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getActionItemsForMeeting(meetingId: string) {
  return await db
    .select()
    .from(actionItems)
    .where(eq(actionItems.meetingId, meetingId));
}
