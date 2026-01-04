import { db } from "@/db";
import { summaries } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSummaryForMeeting(meetingId: string) {
  const [summary] = await db
    .select()
    .from(summaries)
    .where(eq(summaries.meetingId, meetingId));

  return summary;
}
