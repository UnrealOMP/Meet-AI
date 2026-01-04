import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { createMeeting } from "@/server/actions/create-meeting";
import { Button } from "@/components/ui/button";

export default async function NewMeetingPage() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/login");

  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const title = formData.get("title") as string;
        await createMeeting(session.user.id, title);
      }}
      className="max-w-md space-y-4"
    >
      <input
    name="title"
    required
    placeholder="Meeting title (e.g. Salary discussion)"
    className="w-full rounded-md bg-slate-900 border border-white/10 px-3 py-2 text-sm"
  />
      <h1 className="text-2xl font-semibold">Create meeting</h1>

      <p className="text-sm text-slate-400">
        A new meeting will be created and opened immediately.
      </p>

      <Button type="submit">Create meeting</Button>
    </form>
  );
}
