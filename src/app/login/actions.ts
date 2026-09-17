"use server";

import { createClient } from "@/lib/supabase/server";

export interface SendMagicLinkResult {
  ok: boolean;
  message: string;
}

export async function sendMagicLink(
  _prev: SendMagicLinkResult | null,
  formData: FormData,
): Promise<SendMagicLinkResult> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { ok: false, message: "Please enter your email address." };
  }

  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteUrl}/auth/confirm`,
    },
  });

  if (error) {
    console.error("signInWithOtp error:", error.status, error.message);
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  return {
    ok: true,
    message: "Check your email — we sent you a link to log in.",
  };
}
