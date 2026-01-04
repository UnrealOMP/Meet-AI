"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function AutoRefresh({ enabled }: { enabled: boolean }) {
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // If disabled, always clear any existing interval
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Prevent multiple intervals
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      router.refresh();
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, router]);

  return null;
}
