import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "@/lib/auth";
import { getAllMeetings } from "@/server/queries/meetings";
import { MeetingRow } from "@/components/meetings/meeting-row";
import { Button } from "@/components/ui/button";

export default async function MeetingsPage() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/login");

  const meetings = await getAllMeetings(session.user.id);

  async function deleteMeetingAction(meetingId: string) {
    "use server";
    if (!session) throw new Error("Unauthorized");
    const { deleteMeeting } = await import(
      "@/server/actions/delete-meeting"
    );
    await deleteMeeting(meetingId, session.user.id);
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Meetings</h1>

        <Button asChild>
          <Link href="/dashboard/meetings/new">
            New meeting
          </Link>
        </Button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {meetings.map((m) => (
          <MeetingRow key={m.id} meeting={m} onDelete={deleteMeetingAction} />
        ))}

        {meetings.length === 0 && (
          <p className="text-sm text-slate-500">
            No meetings yet.
          </p>
        )}
      </div>
    </div>
  );
}
