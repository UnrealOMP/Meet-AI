import { db } from "@/db";
import { transcripts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getTranscriptForMeeting(meetingId: string) {
  const [transcript] = await db
    .select()
    .from(transcripts)
    .where(eq(transcripts.meetingId, meetingId));

  return transcript ?? null;
}
