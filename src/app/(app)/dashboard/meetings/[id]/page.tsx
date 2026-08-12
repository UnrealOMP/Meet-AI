import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AiQuestionForm from "./AiQuestionForm";

import { auth } from "@/lib/auth";
import { getMeetingById } from "@/server/queries/meetings";
import { getActionItemsForMeeting } from "@/server/queries/action-items";
import { getTranscriptForMeeting } from "@/server/queries/transcripts";
import { getSummaryForMeeting } from "@/server/queries/summaries";
import { getChatForMeeting } from "@/server/queries/chat";

import { createActionItem } from "@/server/actions/create-action-item";
import { toggleActionItem } from "@/server/actions/toggle-action-item";
import { startTranscription } from "@/server/actions/start-transcription";


import { AutoRefresh } from "@/components/ui/auto-refresh";

export const dynamic = "force-dynamic";

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const meeting = await getMeetingById(id, session.user.id);

  if (!meeting) redirect("/dashboard");

  const actionItems = await getActionItemsForMeeting(meeting.id);
  const transcript = await getTranscriptForMeeting(meeting.id);
  const summary = await getSummaryForMeeting(meeting.id);
  const chat = await getChatForMeeting(meeting.id);

  const isProcessing =
    meeting.status === "processing" ||
    meeting.status === "transcribing";

  /**
   * 🔑 Correct auto-refresh condition
   * - refresh while transcribing
   * - refresh once after done if transcript not loaded yet
   */
  const shouldAutoRefresh =
  meeting.status === "transcribing" ;






  return (
    <div className="space-y-6 max-w-3xl">
      {/* Auto refresh (client only, stable) */}
      <AutoRefresh enabled={shouldAutoRefresh} />

      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold">{meeting.title}</h1>
        <p className="text-sm text-slate-400 mt-1">
          {new Date(meeting.startedAt).toLocaleString()} ·{" "}
          {meeting.durationMinutes} min
        </p>
      </div>

      {/* ===== STATUS ===== */}
      {meeting.status === "transcribing" && (
        <p className="text-xs text-yellow-400">
          ⏳ Transcribing… this may take a minute
        </p>
      )}

      {meeting.status === "done" && (
        <p className="text-xs text-green-400">
          ✅ Transcription completed
        </p>
      )}

      {/* ===== AI SUMMARY ===== */}
      <div className="rounded-xl border border-white/10 bg-slate-950/80 p-4">
        <h2 className="font-medium mb-2">AI summary</h2>

        {summary ? (
          <div className="text-sm whitespace-pre-wrap text-slate-300">
            {summary.content}
          </div>
        ) : !transcript ? (
          <p className="text-sm text-slate-400">
            Transcript required before generating summary.
          </p>
        ) : (
          <p className="text-sm text-slate-400">
            Summary will be generated automatically.
          </p>
        )}
      </div>

      {/* ===== TRANSCRIPT ===== */}
      <div className="rounded-xl border border-white/10 bg-slate-950/80 p-4">
        <h2 className="font-medium mb-3">Transcript</h2>

        {!transcript || !transcript.text ? (
  <p className="text-sm text-slate-400">
    Transcript will appear after processing.
  </p>
) : (
  <div className="text-sm whitespace-pre-wrap text-slate-300">
    {transcript.text}
  </div>
)}

      </div>



{/* ===== AI CHAT ===== */}
<div className="rounded-xl border border-white/10 bg-slate-950/80 p-4">
  <h2 className="font-medium mb-3">
    Ask AI about this meeting
  </h2>

  <div className="space-y-3 mb-4">
    {chat.length === 0 && (
      <p className="text-sm text-slate-400">
        Ask questions about the meeting transcript.
      </p>
    )}

    {chat.map((msg) => (
      <div
        key={msg.id}
        className={`text-sm rounded-md p-3 ${
          msg.role === "user"
            ? "bg-slate-800"
            : "bg-slate-900"
        }`}
      >
        <span className="block text-xs text-slate-500 mb-1">
          {msg.role === "user" ? "You" : "AI"}
        </span>
        {msg.content}
      </div>
    ))}
  </div>

  <AiQuestionForm
    meetingId={meeting.id}
    userId={session.user.id}
  />
</div>



      {/* ===== RECORDING UPLOAD ===== */}
      <div className="rounded-xl border border-white/10 bg-slate-950/80 p-4">
        <h2 className="font-medium mb-3">Upload recording</h2>

        {meeting.recordingPath ? (
          <p className="text-sm text-green-400">
            Recording uploaded ✔
          </p>
        ) : (
          <form
            action={async (formData) => {
              "use server";
              const { uploadRecording } = await import(
                "@/server/actions/upload-recording"
              );
              await uploadRecording(meeting.id, formData);
            }}
            className="flex gap-3 items-center"
          >
            <input
              type="file"
              name="file"
              accept="audio/*"
              required
              disabled={isProcessing}
            />

            <button
              type="submit"
              disabled={isProcessing}
              className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-50"
            >
              Upload
            </button>
          </form>
        )}
      </div>

      {/* ===== TRANSCRIBE ===== */}
      {meeting.recordingPath && meeting.status === "uploaded" && (
        <form
          action={async () => {
            "use server";
            await startTranscription(
              meeting.id,
              session.user.id
            );
          }}
        >
          <button 
          disabled={meeting.status !== "uploaded"}
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
            Transcribe recording
          </button>
        </form>
      )}

      {/* ===== ACTION ITEMS ===== */}
      <div className="rounded-xl border border-white/10 bg-slate-950/80 p-4">
        <h2 className="font-medium mb-3">Action items</h2>

        {actionItems.length === 0 ? (
          <p className="text-sm text-slate-400">
            No action items yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {actionItems.map((item) => (
              <form
                key={item.id}
                action={async () => {
                  "use server";
                  await toggleActionItem(
                    item.id,
                    !item.completed
                  );
                }}
                className="flex items-center gap-3"
              >
                <button
                  type="submit"
                  className={`h-4 w-4 rounded-full border ${
                    item.completed
                      ? "bg-green-500 border-green-500"
                      : "border-slate-400"
                  }`}
                />
                <span
                  className={`text-sm ${
                    item.completed
                      ? "line-through text-slate-500"
                      : ""
                  }`}
                >
                  {item.title}
                </span>
              </form>
            ))}
          </ul>
        )}

        <form
          action={async (formData) => {
            "use server";
            if (isProcessing) return;

            const title = formData.get("title") as string;
            if (!title) return;

            await createActionItem(
              meeting.id,
              session.user.id,
              title
            );
          }}
          className="mt-4 flex gap-2"
        >
          <input
            name="title"
            disabled={isProcessing}
            placeholder={
              isProcessing
                ? "Processing meeting…"
                : "Add an action item…"
            }
            className="flex-1 rounded-md bg-slate-900 border border-white/10 px-3 py-2 text-sm"
          />

          <button
            type="submit"
            disabled={isProcessing}
            className="rounded-md bg-sky-500 px-3 py-2 text-sm font-medium text-white hover:bg-sky-600 disabled:opacity-50"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}