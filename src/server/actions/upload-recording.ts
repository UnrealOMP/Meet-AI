"use server";

import { db } from "@/db";
import { meetings } from "@/db/schema";
import { uploadRecordingToS3 } from "@/lib/s3";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function uploadRecording(
  meetingId: string,
  formData: FormData
) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file uploaded");

  const buffer = Buffer.from(await file.arrayBuffer());
  const key = await uploadRecordingToS3(
    meetingId,
    buffer,
    file.type || "audio/mpeg"
  );

  await db
    .update(meetings)
    .set({
      recordingPath: key,
      status: "uploaded",
    })
    .where(eq(meetings.id, meetingId));

  revalidatePath(`/dashboard/meetings/${meetingId}`);
}
