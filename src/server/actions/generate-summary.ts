"use server";

import { nanoid } from "nanoid";
import { db } from "@/db";
import { summaries, transcripts } from "@/db/schema";
import { openai } from "@/lib/openai";
import { eq } from "drizzle-orm";
import { extractActionItems } from "./extract-action-items";

export async function generateSummary(
  meetingId: string,
  userId: string
) {
  // 1️⃣ Get transcript
  const [transcript] = await db
    .select()
    .from(transcripts)
    .where(eq(transcripts.meetingId, meetingId));

  if (!transcript) {
  return;
}


  // 2️⃣ Generate summary
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You summarize meetings. Be concise, structured, and clear.",
      },
      {
        role: "user",
        content: transcript.text,
      },
    ],
  });

  const summary =
    response.choices[0]?.message?.content ?? "No summary generated.";

  // 3️⃣ Save summary
  await db.insert(summaries).values({
    id: nanoid(),
    meetingId,
    content: summary,
  });

  // 4️⃣ Auto-extract action items 🔥
  await extractActionItems(meetingId, userId);
}
