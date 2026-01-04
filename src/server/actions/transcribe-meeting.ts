"use server";

import path from "path";
import { spawn } from "child_process";
import { db } from "@/db";
import { meetings, transcripts } from "@/db/schema";
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

  // Mark as transcribing (single source of truth)
  await db
    .update(meetings)
    .set({ status: "transcribing" })
    .where(eq(meetings.id, meetingId));

  const scriptPath = path.join(process.cwd(), "scripts", "transcribe.py");
  const audioPath = path
    .join(process.cwd(), meeting.recordingPath)
    .replace(/\\/g, "/");

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

  await db.insert(transcripts).values({
    id: nanoid(),
    meetingId,
    text: transcriptText,
  });

  await db
    .update(meetings)
    .set({ status: "done" })
    .where(eq(meetings.id, meetingId));
}
