import { db } from "@/db";
import { meetings, transcripts } from "@/db/schema";
import { openai } from "@/lib/openai";
import { eq } from "drizzle-orm";
import { generateSummary } from "@/server/actions/generate-summary";
import { extractActionItems } from "@/server/actions/extract-action-items";
import { revalidatePath } from "next/cache";

export async function processTranscriptionJob(
  meetingId: string,
  userId: string
) {
  const [meeting] = await db
    .select()
    .from(meetings)
    .where(eq(meetings.id, meetingId));

  if (!meeting || !meeting.recordingPath) {
    throw new Error("Recording not found");
  }

  // Transcribe
  const transcription = await openai.audio.transcriptions.create({
    file: await fetch(meeting.recordingPath).then(r => r.blob()),
    model: "gpt-4o-transcribe",
  });

  await db.insert(transcripts).values({
    id: crypto.randomUUID(),
    meetingId,
    text: transcription.text,
  });

  try {
  await generateSummary(meetingId, userId);
  await extractActionItems(meetingId, userId);

  await db
    .update(meetings)
    .set({
      status: "done",
      errorMessage: null,
    })
    .where(eq(meetings.id, meetingId));
} catch (err) {
  await db
    .update(meetings)
    .set({
      status: "failed",
      errorMessage:
        err instanceof Error ? err.message : "Unknown error",
    })
    .where(eq(meetings.id, meetingId));

  throw err;
}

  revalidatePath(`/dashboard/meetings/${meetingId}`);
}
