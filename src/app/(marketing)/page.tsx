// src/app/(marketing)/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400" />
          <span className="font-semibold tracking-tight text-lg">
            Meet<span className="text-sky-400">AI</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <Link href="#product" className="hover:text-white transition">
            Product
          </Link>
          <Link href="#features" className="hover:text-white transition">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-white transition">
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-white transition">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" className="text-slate-300">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild className="bg-sky-500 hover:bg-sky-600">
            <Link href="/signup">Get started</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 px-6 lg:px-12 py-12 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs text-sky-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI agents that actually run your meetings
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            Let <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400">
              AI agents
            </span>{" "}
            host, capture & recap your calls.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl">
            MeetAI joins your video calls as an autonomous agent: it asks
            questions, tracks decisions, and instantly generates summaries,
            action items, and a searchable transcript.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-sky-500 hover:bg-sky-600">
              <Link href="/signup">Start for free</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-slate-600 bg-white/5 hover:bg-white/10"
            >
              <Link href="#features">See how it works</Link>
            </Button>
          </div>

          <p className="text-xs text-slate-400">
            No credit card required · Cancel anytime
          </p>
        </div>

        {/* Mock UI card */}
        <div className="relative">
          <div className="absolute -inset-16 bg-gradient-to-tr from-sky-500/20 via-indigo-500/10 to-emerald-400/5 blur-3xl opacity-60" />
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-2 w-16 rounded-full bg-slate-500/60" />
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                <div className="h-2 w-2 rounded-full bg-rose-400" />
              </div>
            </div>

            {/* Video grid mock */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 aspect-video rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 flex items-end p-3">
                <div className="px-2 py-1 rounded-full bg-black/40 text-xs text-slate-200">
                  You
                </div>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-tr from-sky-500/30 to-indigo-500/40 flex items-center justify-center">
                <span className="text-xs font-medium text-sky-50">
                  AI Agent
                </span>
              </div>
              <div className="aspect-square rounded-2xl bg-slate-800/80" />
              <div className="aspect-square rounded-2xl bg-slate-800/80" />
            </div>

            {/* Side panel mock */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="col-span-2 space-y-2">
                <div className="flex gap-1">
                  <div className="px-2 py-1 rounded-full bg-sky-500/20 text-sky-200 text-[10px]">
                    Summary
                  </div>
                  <div className="px-2 py-1 rounded-full bg-white/5 text-slate-300 text-[10px]">
                    Actions
                  </div>
                  <div className="px-2 py-1 rounded-full bg-white/5 text-slate-300 text-[10px]">
                    Transcript
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-2.5 rounded bg-slate-500/60 w-5/6" />
                  <div className="h-2.5 rounded bg-slate-600/60 w-4/6" />
                  <div className="h-2.5 rounded bg-slate-700/60 w-3/6" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-2 rounded bg-slate-600/70 w-5/6" />
                <div className="h-2 rounded bg-slate-600/70 w-4/6" />
                <div className="h-2 rounded bg-slate-700/70 w-3/6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You can add Features / Pricing / FAQ later */}
    </main>
  );
}
