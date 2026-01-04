"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// ✅ CORRECT BACKEND IMPORT
import { askMeetingQuestion } from "@/server/actions/ask-meeting-question";

export default function AiQuestionForm({
  meetingId,
  userId,
}: {
  meetingId: string;
  userId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (loading) return;

  const form = e.currentTarget;
  const formData = new FormData(form);
  const question = formData.get("question") as string;
  if (!question?.trim()) return;

  setLoading(true);

  try {
    await askMeetingQuestion(meetingId, userId, question);
  } catch {
    // ignore – message is already saved
  } finally {
    // 🔑 ALWAYS reset local state
    setLoading(false);
    form.reset();
    router.refresh();
  }
}


  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        name="question"
        placeholder="Ask a question…"
        disabled={loading}
        className="flex-1 rounded-md bg-slate-900 border border-white/10 px-3 py-2 text-sm"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-sky-500 px-3 py-2 text-sm font-medium text-white hover:bg-sky-600 disabled:opacity-50"
      >
        {loading ? "Thinking…" : "Ask"}
      </button>
    </form>
  );
}
