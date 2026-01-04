"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    setLoading(true);
    setError(null);

    const { error } = await signIn.email(
      { email, password },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
      }
    );

    if (error) {
      setError(error.message || "Invalid email or password");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050816]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-xl"
      >
        <h1 className="text-xl font-semibold text-slate-50">Log in</h1>
        <p className="text-xs text-slate-400">
          Welcome back. Enter your credentials to continue.
        </p>

        <div className="space-y-2 text-sm">
          <label className="block text-slate-300">Email</label>
          <Input name="email" type="email" required />
        </div>

        <div className="space-y-2 text-sm">
          <label className="block text-slate-300">Password</label>
          <Input name="password" type="password" required />
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/60 rounded-md px-2 py-1">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-600"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </Button>

        <p className="text-[11px] text-slate-500">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-sky-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </main>
  );
}
