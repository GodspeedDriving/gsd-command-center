-- GSD Command Center — Row Level Security
-- Run after 0001_init_schema.sql.
--
-- Model: admins (rows in public.admins matching auth.uid()) can do everything.
-- The public (anon key, no login) can only:
--   - read published/confirmed public content (packages, faqs, testimonials, policies)
--   - insert a new lead (the reservation form) — status/score are always forced
--     to safe defaults by a trigger, regardless of what the client sends
-- Everything else (students, sessions, payments, money, templates, etc.) is
-- admin-only in Phase 1. The payment-proof-upload-by-reservation-code flow
-- (M6) and the availability calendar read (M4) will add narrow, purpose-built
-- RPCs later rather than opening these tables directly to anon.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins a where a.user_id = auth.uid()
  );
$$;

-- Force safe defaults on publicly-submitted leads so the anon key can never
-- self-promote a lead's status/score or backdate consent.
create or replace function public.enforce_public_lead_defaults()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    new.status := 'new';
    new.score := null;
    new.consent_privacy_at := case when new.consent_privacy_at is not null then now() else null end;
    new.consent_policy_at := case when new.consent_policy_at is not null then now() else null end;
  end if;
  return new;
end;
$$;
create trigger enforce_public_lead_defaults before insert on public.leads
  for each row execute function public.enforce_public_lead_defaults();

-- ---------------------------------------------------------------------------
-- Enable RLS everywhere
-- ---------------------------------------------------------------------------
alter table public.admins enable row level security;
alter table public.units enable row level security;
alter table public.blocked_dates enable row level security;
alter table public.packages enable row level security;
alter table public.curriculum_items enable row level security;
alter table public.leads enable row level security;
alter table public.followups enable row level security;
alter table public.students enable row level security;
alter table public.enrollments enable row level security;
alter table public.sessions enable row level security;
alter table public.session_logs enable row level security;
alter table public.reschedules enable row level security;
alter table public.waitlist enable row level security;
alter table public.payments enable row level security;
alter table public.charges enable row level security;
alter table public.expenses enable row level security;
alter table public.ad_spend enable row level security;
alter table public.policies enable row level security;
alter table public.templates enable row level security;
alter table public.faqs enable row level security;
alter table public.testimonials enable row level security;
alter table public.settings enable row level security;
alter table public.audit_log enable row level security;

-- ---------------------------------------------------------------------------
-- Admin-full-access policy on every table
-- ---------------------------------------------------------------------------
create policy admin_all on public.admins for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.units for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.blocked_dates for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.packages for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.curriculum_items for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.leads for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.followups for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.students for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.enrollments for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.sessions for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.session_logs for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.reschedules for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.waitlist for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.payments for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.charges for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.expenses for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.ad_spend for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.policies for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.templates for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.faqs for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.testimonials for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.settings for all using (public.is_admin()) with check (public.is_admin());
create policy admin_all on public.audit_log for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Public (anon) read access to published/confirmed public content
-- ---------------------------------------------------------------------------
create policy public_read_active_packages on public.packages
  for select to anon using (active = true);

create policy public_read_confirmed_faqs on public.faqs
  for select to anon using (owner_confirmed = true);

create policy public_read_published_testimonials on public.testimonials
  for select to anon using (published = true and permission_confirmed = true);

create policy public_read_confirmed_policies on public.policies
  for select to anon using (owner_confirmed = true);

-- ---------------------------------------------------------------------------
-- Public (anon) can create leads — the reservation form (M3).
-- The BEFORE INSERT trigger above strips any attempt to set status/score.
-- ---------------------------------------------------------------------------
create policy public_insert_leads on public.leads
  for insert to anon with check (true);
