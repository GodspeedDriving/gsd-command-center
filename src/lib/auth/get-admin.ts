import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface AdminUser {
  userId: string;
  email: string;
  role: "owner" | "staff";
}

/**
 * Server-only guard for /admin pages. Redirects to /login if there's no
 * session, and to /unauthorized if the session exists but isn't listed in
 * the `admins` table (SPEC.md M1: "Only emails listed in an admins table
 * can access admin pages").
 */
export async function requireAdmin(): Promise<AdminUser> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: adminRow } = await supabase
    .from("admins")
    .select("user_id, email, role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) {
    redirect("/unauthorized");
  }

  return {
    userId: adminRow.user_id as string,
    email: adminRow.email as string,
    role: adminRow.role as "owner" | "staff",
  };
}
