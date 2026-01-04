"use server";

import { db } from "@/db";
import { chatMessages, transcripts } from "@/db/schema";
import { openai } from "@/lib/openai";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function askMeetingQuestion(
  meetingId: string,
  userId: string,
  question: string
) {
  // 1️⃣ Get transcript (STRICT grounding)
  const [transcript] = await db
    .select()
    .from(transcripts)
    .where(eq(transcripts.meetingId, meetingId));

  if (!transcript) {
    return "⚠️ Transcript not available yet.";
  }

  // 2️⃣ Save user message
  await db.insert(chatMessages).values({
    id: nanoid(),
    meetingId,
    role: "user",
    content: question,
  });

  // 3️⃣ Build messages (THIS WAS MISSING ❌)
  const messages: Array<{ role: "system" | "user"; content: string }> = [
    {
      role: "system",
      content:
        "You are an AI assistant. Answer ONLY using the meeting transcript. If the answer is not in the transcript, say you don't know.",
    },
    {
      role: "user",
      content: `Transcript:\n${transcript.text}\n\nQuestion:\n${question}`,
    },
  ];

  let answer = "";

try {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  answer = response.choices[0].message.content ?? "";
} catch (err: unknown) {
  const error = err as { status?: number };
  if (error?.status === 429) {
    answer = "⚠️ AI quota exceeded. Please add credits to continue.";
  } else {
    answer = "❌ AI failed to respond.";
  }
}

// ALWAYS save assistant message
await db.insert(chatMessages).values({
  id: nanoid(),
  meetingId,
  role: "assistant",
  content: answer,
});

return answer;

}
