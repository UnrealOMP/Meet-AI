// src/app/(app)/layout.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

// TODO: replace this with your real auth check
async function getCurrentUser() {
  // Example sketch; integrate Better Auth / your auth here
  // const session = await auth();
  // if (!session?.user) return null;
  // return session.user;
  return { id: "demo-user-id", name: "Demo User", email: "demo@meetai.dev" };
}

export default async function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar user={user} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/60">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
