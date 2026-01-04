// src/components/layout/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  FileText,
  MessageCircle,
  Bot,
  CreditCard,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/meetings", label: "Meetings", icon: Video },
  { href: "/dashboard/transcripts", label: "Transcripts", icon: FileText },
  { href: "/dashboard/chat", label: "AI Chat", icon: MessageCircle },
  { href: "/dashboard/agents", label: "Agents", icon: Bot },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-60 border-r border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="h-16 flex items-center px-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400" />
          <span className="font-semibold tracking-tight text-lg">
            Meet<span className="text-sky-400">AI</span>
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl transition",
                "text-slate-300 hover:text-white hover:bg-slate-800/80",
                isActive &&
                  "bg-sky-500/15 text-sky-100 border border-sky-500/40"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-white/10 text-xs text-slate-400">
        <p>AI agents that actually run your meetings.</p>
      </div>
    </aside>
  );
}
