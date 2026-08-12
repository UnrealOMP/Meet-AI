"use server";

import { spawn } from "child_process";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { db } from "@/db";
import { meetings, transcripts } from "@/db/schema";
import {
  downloadRecordingFromS3,
  uploadTranscriptToS3,
} from "@/lib/s3";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function transcribeMeeting(meetingId: string) {
  const [meeting] = await db
    .select()
    .from(meetings)
    .where(eq(meetings.id, meetingId));

  if (!meeting || !meeting.recordingPath) {
    throw new Error("Recording not found");
  }

  await db
    .update(meetings)
    .set({ status: "transcribing" })
    .where(eq(meetings.id, meetingId));

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "meetai-"));
  const audioPath = path.join(tempDir, `${meetingId}.mp3`);

  try {
    const buffer = await downloadRecordingFromS3(meeting.recordingPath);
    await fs.writeFile(audioPath, buffer);

    const scriptPath = path.join(process.cwd(), "scripts", "transcribe.py");
    const transcriptText = await new Promise<string>((resolve, reject) => {
      const py = spawn("python", [scriptPath, audioPath], {
        cwd: process.cwd(),
      });

      let output = "";
      let error = "";

      py.stdout.on("data", (data) => {
        output += data.toString();
      });

      py.stderr.on("data", (data) => {
        error += data.toString();
      });

      py.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(error || "Python transcription failed"));
          return;
        }
        resolve(output.trim());
      });
    });

    if (!transcriptText) {
      throw new Error("Empty transcript");
    }

    await uploadTranscriptToS3(meetingId, transcriptText);

    await db.insert(transcripts).values({
      id: nanoid(),
      meetingId,
      text: transcriptText,
    });

    await db
      .update(meetings)
      .set({ status: "done" })
      .where(eq(meetings.id, meetingId));
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}
