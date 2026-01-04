import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

import { StatCards } from "@/components/ui/dashboard/stat-cards";
import { RecentMeetings } from "@/components/ui/dashboard/recent-meetings";

import { getDashboardStats } from "@/server/queries/dashboard";
import { getRecentMeetings } from "@/server/queries/meetings";

export default async function DashboardPage() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/login");

  const stats = await getDashboardStats(session.user.id);
  const meetings = await getRecentMeetings(session.user.id);

  const formattedMeetings = meetings.map((m) => ({
    id: m.id,
    title: m.title,
    date: m.startedAt.toISOString(),
    duration: `${m.durationMinutes} min`,
    participants: ["You", "AI Agent"],
    status: m.status,
  }));

  return (
    <div className="space-y-6">
      <StatCards stats={stats} />
      <RecentMeetings meetings={formattedMeetings} />
    </div>
  );
}
