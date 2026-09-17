import "server-only";
import { createClient } from "@/lib/supabase/server";

export interface PublicPackage {
  code: string;
  name: string;
  sessionsCount: number;
  hoursPerSession: number;
  audienceMd: string | null;
  includesMd: string | null;
}

export interface PublicFaq {
  question: string;
  answerMd: string;
}

export interface PublicPolicy {
  key: string;
  title: string;
  bodyMd: string;
}

export interface PublicTestimonial {
  studentNameDisplay: string;
  quote: string;
  packageCode: string | null;
  photoPath: string | null;
}

export async function getPublicPackages(): Promise<PublicPackage[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("packages")
    .select(
      "code, name, sessions_count, hours_per_session, audience_md, includes_md",
    )
    .eq("active", true)
    .order("display_order", { ascending: true });

  return (data ?? []).map((row) => ({
    code: row.code,
    name: row.name,
    sessionsCount: row.sessions_count,
    hoursPerSession: row.hours_per_session,
    audienceMd: row.audience_md,
    includesMd: row.includes_md,
  }));
}

export async function getPublicFaqs(): Promise<PublicFaq[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("question, answer_md")
    .eq("owner_confirmed", true)
    .order("sort_order", { ascending: true });

  return (data ?? []).map((row) => ({
    question: row.question,
    answerMd: row.answer_md,
  }));
}

export async function getPublicPolicies(): Promise<PublicPolicy[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("policies")
    .select("key, title, body_md")
    .eq("owner_confirmed", true);

  return (data ?? []).map((row) => ({
    key: row.key,
    title: row.title,
    bodyMd: row.body_md,
  }));
}

export async function getPublicTestimonials(): Promise<PublicTestimonial[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("student_name_display, quote, package_code, photo_path")
    .eq("published", true)
    .eq("permission_confirmed", true);

  return (data ?? []).map((row) => ({
    studentNameDisplay: row.student_name_display,
    quote: row.quote,
    packageCode: row.package_code,
    photoPath: row.photo_path,
  }));
}
