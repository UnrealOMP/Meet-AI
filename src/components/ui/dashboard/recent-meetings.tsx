import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: string[];
  status: string;
}

interface RecentMeetingsProps {
  meetings: Meeting[];
}

export function RecentMeetings({ meetings }: RecentMeetingsProps) {
  return (
    <Card className="border-white/10 bg-slate-950/80">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div>
          <CardTitle className="text-sm font-medium text-slate-100">
            Recent meetings
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">
            Open a recap to see summary, transcript, and AI chat.
          </p>
        </div>

        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-slate-600/70 bg-slate-900/60 text-xs"
        >
          <Link href="/dashboard/meetings">
            View all
            <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-2">
        {meetings.map((m) => (
          <div
            key={m.id}
            className="flex items-center justify-between rounded-xl px-2 py-2 hover:bg-slate-900/70 transition"
          >
            <div>
              <p className="text-sm text-slate-100">{m.title}</p>
              <p className="text-[11px] text-slate-500">
                {m.participants.join(" · ")}
              </p>
            </div>

            <Button
              asChild
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full border border-slate-700/70 bg-slate-900/60"
            >
              <Link href={`/dashboard/meetings/${m.id}`}>
                <Play className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        ))}

        {meetings.length === 0 && (
          <p className="text-xs text-slate-500 text-center py-6">
            No meetings yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
