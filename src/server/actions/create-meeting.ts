"use server";

import { db } from "@/db";
import { meetings } from "@/db/schema";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";

export async function createMeeting(userId: string, title: string) {
  const [meeting] = await db
    .insert(meetings)
    .values({
      id: nanoid(),
      ownerId: userId,
      title,
      durationMinutes: 30,
      status: "new", // ✅ FIXED
      recordingPath: null,
    })
    .returning();

  redirect(`/dashboard/meetings/${meeting.id}`);
}
