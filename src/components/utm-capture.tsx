"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const TRACKED_PARAMS = ["utm_source", "utm_campaign", "utm_content", "fbclid"];
export const UTM_STORAGE_KEY = "gsd_attribution";

/**
 * Persists ad-attribution params to localStorage on first landing so the
 * reservation form (M3) can attach them to a lead even if the visitor
 * clicks through to /reserve without the query string still in the URL.
 */
function UtmCaptureInner() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const found: Record<string, string> = {};
    for (const key of TRACKED_PARAMS) {
      const value = searchParams.get(key);
      if (value) found[key] = value;
    }
    if (Object.keys(found).length === 0) return;

    try {
      window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(found));
    } catch {
      // localStorage unavailable (private browsing, etc.) — safe to skip.
    }
  }, [searchParams]);

  return null;
}

export function UtmCapture() {
  return (
    <Suspense fallback={null}>
      <UtmCaptureInner />
    </Suspense>
  );
}
