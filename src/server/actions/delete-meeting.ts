"use server";

import { db } from "@/db";
import { meetings } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteMeeting(meetingId: string, userId: string) {
  await db.delete(meetings).where(and(eq(meetings.id, meetingId), eq(meetings.ownerId, userId)));

  // ✅ THIS is the correct place
  revalidatePath("/dashboard/meetings");
}
