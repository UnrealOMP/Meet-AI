"use server";

import { db } from "@/db";
import { meetings } from "@/db/schema";
import { eq } from "drizzle-orm";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";


export async function uploadRecording(
  meetingId: string,
  formData: FormData
) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file uploaded");

  // ✅ Always save here
  const uploadDir = path.join(
    process.cwd(),
    "uploads",
    "meetings"
  );

  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(
    uploadDir,
    `${meetingId}.mp3`
  );

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  // ✅ Store RELATIVE path in DB (no public/)
  await db
    .update(meetings)
    .set({
      recordingPath: `uploads/meetings/${meetingId}.mp3`,
      status: "uploaded",
    })
    .where(eq(meetings.id, meetingId));
    revalidatePath(`/dashboard/meetings/${meetingId}`);

}
