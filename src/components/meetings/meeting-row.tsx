"use client";

import Link from "next/link";

type Meeting = {
  id: string;
  ownerId: string;
  title: string;
  startedAt: Date;
  durationMinutes: number;
  status: string;
  recordingPath?: string | null;
  errorMessage?: string | null;
  createdAt: Date;
};

export function MeetingRow({ meeting, onDelete }: { meeting: Meeting; onDelete: (meetingId: string) => Promise<void> }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/80 p-4">
      <Link
        href={`/dashboard/meetings/${meeting.id}`}
        className="flex-1"
      >
        <p className="font-medium">{meeting.title}</p>
        <p className="text-xs text-slate-400">
          {new Date(meeting.startedAt).toLocaleString()}
        </p>
      </Link>

      {/* DELETE — server action via form */}
      <form
        action={async () => {
          await onDelete(meeting.id);
        }}
      >
        <button
          type="submit"
          className="text-xs text-red-400 hover:text-red-300"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
