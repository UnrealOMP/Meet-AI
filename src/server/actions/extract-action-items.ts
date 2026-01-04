"use server";

import { db } from "@/db";
import { actionItems, transcripts } from "@/db/schema";
import { nanoid } from "nanoid";
import { openai } from "@/lib/openai";
import { eq } from "drizzle-orm";

export async function extractActionItems(
  meetingId: string,
  userId: string
) {
  // 1️⃣ Get transcript
  const [transcript] = await db
    .select()
    .from(transcripts)
    .where(eq(transcripts.meetingId, meetingId));

  if (!transcript) return;

  // 2️⃣ Ask AI
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Extract clear actionable tasks from the meeting transcript. Return as a bullet list.",
      },
      {
        role: "user",
        content: transcript.text,
      },
    ],
  });

  const tasks =
    response.choices[0]?.message?.content
      ?.split("\n")
      .map((t) => t.replace(/^[-•]\s*/, "").trim())
      .filter(Boolean) ?? [];

  // 3️⃣ Save tasks
  for (const title of tasks) {
    await db.insert(actionItems).values({
      id: nanoid(),
      meetingId,
      ownerId: userId,
      title,
      completed: false,
    });
  }
}
