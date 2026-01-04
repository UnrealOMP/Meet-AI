"use server";

import { db } from "@/db";
import { actionItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function toggleActionItem(
  actionItemId: string,
  completed: boolean
) {
  await db
    .update(actionItems)
    .set({ completed })
    .where(eq(actionItems.id, actionItemId));
}
