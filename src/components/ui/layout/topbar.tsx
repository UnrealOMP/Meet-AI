// src/components/layout/topbar.tsx
"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
  };
}

export function Topbar({ user }: TopbarProps) {
  const initials =
    user?.name
      ?.split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "ME";

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 lg:px-8 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="hidden md:flex items-center gap-3 text-sm text-slate-300">
        <span className="text-xs uppercase tracking-[0.18em] text-sky-400/80">
          Dashboard
        </span>
        <span className="text-slate-500">/</span>
        <span className="font-medium">Overview</span>
      </div>

      <div className="flex-1 flex justify-center px-4">
        <div className="w-full max-w-md flex items-center gap-2 bg-slate-900/80 border border-slate-700/80 rounded-2xl px-3 py-1.5">
          <Search className="h-4 w-4 text-slate-500" />
          <Input
            className="h-7 border-none bg-transparent text-xs placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search meetings, transcripts, or action items..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full border border-slate-700/70 bg-slate-900/60"
        >
          <Bell className="h-4 w-4 text-slate-300" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-slate-100 leading-tight">
              {user?.name || "Demo User"}
            </p>
            <p className="text-[10px] text-slate-400">
              {user?.email || "demo@meetai.dev"}
            </p>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 flex items-center justify-center text-xs font-semibold text-slate-950">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
