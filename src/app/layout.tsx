// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "Meet AI – AI Meeting Agent Platform",
  description:
    "AI agents that join your meetings, run them, and send you the recap.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#050816] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
