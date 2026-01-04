"use server";

import { db } from "@/db";
import { actionItems } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid"; // ✅ ADD THIS

export async function createActionItem(
  meetingId: string,
  userId: string,
  title: string
) {
  await db.insert(actionItems).values({
    id: nanoid(),          // ✅ FIX
    meetingId,
    ownerId: userId,
    title,
    completed: false,
  });

  revalidatePath(`/dashboard/meetings/${meetingId}`);
}
