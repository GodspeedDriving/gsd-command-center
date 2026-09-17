"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { sendMagicLink, type SendMagicLinkResult } from "./actions";

const initialState: SendMagicLinkResult | null = null;

function ExpiredLinkNotice() {
  const searchParams = useSearchParams();
  const linkExpired = searchParams.get("error") === "link_expired";

  if (!linkExpired) return null;

  return (
    <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-neutral-800">
      That link already expired or was already used. Please request a new
      one below.
    </p>
  );
}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    sendMagicLink,
    initialState,
  );

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
      <div className="w-full max-w-sm">
        <h1 className="font-heading mb-1 text-2xl font-bold text-brand-blue">
          GSD Admin
        </h1>
        <p className="mb-6 text-sm text-neutral-600">
          Enter your email and we&apos;ll send you a link to log in. No
          password needed.
        </p>

        {!state && (
          <Suspense fallback={null}>
            <ExpiredLinkNotice />
          </Suspense>
        )}

        <form action={formAction} className="flex flex-col gap-3">
          <label htmlFor="email" className="text-sm font-medium">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="rounded-lg border border-neutral-300 px-4 py-3 text-base"
          />
          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-full bg-brand-blue px-6 py-3 text-base font-semibold text-white disabled:opacity-60"
          >
            {pending ? "Sending..." : "Send login link"}
          </button>
        </form>

        {state && (
          <p
            role="status"
            className={`mt-4 text-sm ${state.ok ? "text-green-700" : "text-brand-red"}`}
          >
            {state.message}
          </p>
        )}
      </div>
    </main>
  );
}
