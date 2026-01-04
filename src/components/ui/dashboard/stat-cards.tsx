import { CalendarClock, Clock3, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardsProps {
  stats: {
    meetingsThisWeek: number;
    hoursSaved: number;
    actionItems: number;
  };
}

export function StatCards({ stats }: StatCardsProps) {
  const items = [
    {
      label: "Meetings this week",
      value: stats.meetingsThisWeek,
      icon: CalendarClock,
      helper: "AI agent on every call.",
    },
    {
      label: "Hours saved",
      value: stats.hoursSaved,
      icon: Clock3,
      helper: "No more manual note-taking.",
      suffix: "h",
    },
    {
      label: "New action items",
      value: stats.actionItems,
      icon: ListChecks,
      helper: "Auto-tracked across meetings.",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card
            key={item.label}
            className="border-sky-500/20 bg-slate-950/80 shadow-xl"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-slate-300">
                {item.label}
              </CardTitle>
              <Icon className="h-4 w-4 text-sky-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                {item.value}
                {item.suffix && (
                  <span className="text-lg text-slate-300 ml-0.5">
                    {item.suffix}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">{item.helper}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
