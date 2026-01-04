// src/server/actions/start-transcription.ts
"use server";
import { revalidatePath } from "next/cache";



import { enqueue } from "@/server/queue/meeting-queue";

export async function startTranscription(meetingId: string, userId: string) {
  enqueue({ type: "transcribe", meetingId, userId });
  
revalidatePath(`/dashboard/meetings/${meetingId}`);
}
