-- GSD Command Center — initial schema
-- Run this in the Supabase SQL Editor (or via `supabase db push`) before 0002_rls.sql.
-- See SPEC.md Section 7 for the data model this implements.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- admins
-- ---------------------------------------------------------------------------
create table public.admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  email text not null unique,
  role text not null default 'owner' check (role in ('owner', 'staff')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.admins
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- units (instructor + vehicle pairs)
-- ---------------------------------------------------------------------------
create table public.units (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  transmission text not null check (transmission in ('AT', 'MT')),
  instructor_name text not null,
  vehicle_label text not null,
  vehicle_owned boolean not null default false,
  instructor_day_rate numeric(10, 2) not null default 0,
  vehicle_day_rate numeric(10, 2) not null default 0,
  active boolean not null default true,
  teaching_days int[] not null default '{1,2,3,4,5,6}', -- 0=Sun .. 6=Sat
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.units
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- blocked_dates
-- ---------------------------------------------------------------------------
create table public.blocked_dates (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references public.units (id) on delete cascade, -- null = all units
  date date not null,
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.blocked_dates
  for each row execute function public.set_updated_at();
create index blocked_dates_unit_date_idx on public.blocked_dates (unit_id, date);

-- ---------------------------------------------------------------------------
-- packages
-- ---------------------------------------------------------------------------
create table public.packages (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  sessions_count int not null check (sessions_count > 0),
  hours_per_session numeric(4, 1) not null check (hours_per_session > 0),
  price_weekday numeric(10, 2) not null check (price_weekday >= 0),
  price_weekend numeric(10, 2) not null check (price_weekend >= 0),
  display_order int not null default 0,
  audience_md text,
  includes_md text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.packages
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- curriculum_items
-- ---------------------------------------------------------------------------
create table public.curriculum_items (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages (id) on delete cascade,
  title text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.curriculum_items
  for each row execute function public.set_updated_at();
create index curriculum_items_package_idx on public.curriculum_items (package_id);

-- ---------------------------------------------------------------------------
-- leads
-- ---------------------------------------------------------------------------
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  mobile text,
  email text,
  fb_name text,
  contact_pref text check (contact_pref in ('viber', 'sms', 'messenger', 'call')),
  transmission text check (transmission in ('AT', 'MT', 'not_sure')),
  experience text check (
    experience in ('never', 'tried_a_few_times', 'can_drive_not_confident', 'returning_after_break')
  ),
  goal text check (goal in ('pass_lto', 'daily_city_driving', 'company_car', 'just_start', 'other')),
  nervousness int check (nervousness between 1 and 5),
  lessons_for text check (lessons_for in ('myself', 'my_child', 'someone_else')),
  license_status text check (license_status in ('none', 'student_permit', 'license', 'expired')),
  permit_expiry date,
  permit_file_path text,
  package_id uuid references public.packages (id),
  day_type text check (day_type in ('weekday', 'weekend')),
  preferred_dates jsonb not null default '[]',
  meeting_area text,
  source text,
  utm jsonb not null default '{}',
  fbclid text,
  score text check (score in ('hot', 'warm', 'cold')),
  status text not null default 'new' check (
    status in (
      'new', 'contacted', 'qualified', 'reserved', 'paid_deposit', 'enrolled',
      'completed', 'waitlist', 'needs_permit', 'lost', 'spam'
    )
  ),
  lost_reason text,
  consent_privacy_at timestamptz,
  consent_policy_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.leads
  for each row execute function public.set_updated_at();
create index leads_status_idx on public.leads (status);
create index leads_created_at_idx on public.leads (created_at);

-- ---------------------------------------------------------------------------
-- followups
-- ---------------------------------------------------------------------------
create table public.followups (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  due_at timestamptz not null,
  channel text check (channel in ('viber', 'sms', 'call', 'messenger')),
  template_id uuid,
  done_at timestamptz,
  snoozed_until timestamptz,
  outcome text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.followups
  for each row execute function public.set_updated_at();
create index followups_due_at_idx on public.followups (due_at) where done_at is null;

-- ---------------------------------------------------------------------------
-- students
-- ---------------------------------------------------------------------------
create table public.students (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads (id),
  full_name text not null,
  mobile text,
  email text,
  guardian_name text,
  guardian_mobile text,
  license_type text check (license_type in ('student_permit', 'license')),
  license_expiry date,
  license_file_path text,
  unit_id uuid references public.units (id),
  status text not null default 'active' check (status in ('active', 'completed', 'dropped')),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.students
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- enrollments
-- ---------------------------------------------------------------------------
create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  package_id uuid not null references public.packages (id),
  day_type text not null check (day_type in ('weekday', 'weekend')),
  price numeric(10, 2) not null,
  deposit_due numeric(10, 2),
  balance_due_date date,
  valid_until date,
  status text not null default 'pending' check (
    status in ('pending', 'active', 'completed', 'cancelled')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.enrollments
  for each row execute function public.set_updated_at();
create index enrollments_student_idx on public.enrollments (student_id);

-- ---------------------------------------------------------------------------
-- sessions
-- ---------------------------------------------------------------------------
create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.enrollments (id) on delete cascade,
  unit_id uuid references public.units (id),
  session_no int not null check (session_no > 0),
  date date,
  start_time time,
  hours numeric(4, 1) not null,
  status text not null default 'unscheduled' check (
    status in ('unscheduled', 'held', 'booked', 'completed', 'cancelled', 'no_show')
  ),
  hold_expires_at timestamptz,
  meeting_point text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.sessions
  for each row execute function public.set_updated_at();
create index sessions_enrollment_idx on public.sessions (enrollment_id);
create index sessions_unit_date_idx on public.sessions (unit_id, date);

-- One booking per unit per date: a cancelled session frees the date back up.
create unique index sessions_unit_date_unique
  on public.sessions (unit_id, date)
  where date is not null and status <> 'cancelled';

-- Dedicated-instructor enforcement: a session's unit must match its student's unit.
create or replace function public.enforce_session_unit_matches_student()
returns trigger
language plpgsql
as $$
declare
  student_unit_id uuid;
begin
  if new.unit_id is null then
    return new;
  end if;

  select s.unit_id into student_unit_id
  from public.enrollments e
  join public.students s on s.id = e.student_id
  where e.id = new.enrollment_id;

  if student_unit_id is not null and student_unit_id <> new.unit_id then
    raise exception
      'Session unit % does not match student''s dedicated unit %',
      new.unit_id, student_unit_id;
  end if;

  return new;
end;
$$;
create trigger enforce_session_unit before insert or update on public.sessions
  for each row execute function public.enforce_session_unit_matches_student();

-- ---------------------------------------------------------------------------
-- session_logs
-- ---------------------------------------------------------------------------
create table public.session_logs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null unique references public.sessions (id) on delete cascade,
  skills_covered jsonb not null default '[]',
  strengths text,
  improve text,
  next_focus text,
  confidence int check (confidence between 1 and 5),
  remarks text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.session_logs
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- reschedules
-- ---------------------------------------------------------------------------
create table public.reschedules (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  old_date date,
  new_date date,
  reason text not null check (reason in ('student', 'weather', 'gsd', 'no_show')),
  hours_notice numeric(6, 1),
  fee_amount numeric(10, 2) not null default 0,
  waived boolean not null default false,
  waive_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.reschedules
  for each row execute function public.set_updated_at();
create index reschedules_session_idx on public.reschedules (session_id);

-- ---------------------------------------------------------------------------
-- waitlist
-- ---------------------------------------------------------------------------
create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  transmission text not null check (transmission in ('AT', 'MT')),
  priority boolean not null default false,
  notified_at timestamptz,
  status text not null default 'active' check (status in ('active', 'notified', 'converted', 'expired')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.waitlist
  for each row execute function public.set_updated_at();
create index waitlist_transmission_idx on public.waitlist (transmission, status);

-- ---------------------------------------------------------------------------
-- payments
-- ---------------------------------------------------------------------------
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.enrollments (id) on delete cascade,
  amount numeric(10, 2) not null,
  method text check (method in ('gcash', 'bank_transfer', 'cash', 'card')),
  reference text,
  proof_path text,
  status text not null default 'pending' check (status in ('pending', 'verified', 'refunded')),
  verified_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.payments
  for each row execute function public.set_updated_at();
create index payments_enrollment_idx on public.payments (enrollment_id);

-- ---------------------------------------------------------------------------
-- charges
-- ---------------------------------------------------------------------------
create table public.charges (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.enrollments (id) on delete cascade,
  type text not null check (type in ('reschedule_fee', 'no_show_fee', 'other')),
  amount numeric(10, 2) not null,
  waived boolean not null default false,
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.charges
  for each row execute function public.set_updated_at();
create index charges_enrollment_idx on public.charges (enrollment_id);

-- ---------------------------------------------------------------------------
-- expenses
-- ---------------------------------------------------------------------------
create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  category text not null check (
    category in (
      'instructor_pay', 'vehicle_rental', 'fuel', 'facebook_ads', 'vehicle_maintenance',
      'toll_parking', 'car_wash', 'registration_permits', 'supplies', 'phone_internet', 'other'
    )
  ),
  amount numeric(10, 2) not null,
  unit_id uuid references public.units (id),
  session_id uuid references public.sessions (id),
  auto_generated boolean not null default false,
  note text,
  receipt_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.expenses
  for each row execute function public.set_updated_at();
create index expenses_date_idx on public.expenses (date);

-- ---------------------------------------------------------------------------
-- ad_spend
-- ---------------------------------------------------------------------------
create table public.ad_spend (
  id uuid primary key default gen_random_uuid(),
  period_start date not null,
  period_end date not null,
  amount numeric(10, 2) not null,
  campaign text,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.ad_spend
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- policies
-- ---------------------------------------------------------------------------
create table public.policies (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null,
  body_md text not null,
  params jsonb not null default '{}',
  owner_confirmed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.policies
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- templates
-- ---------------------------------------------------------------------------
create table public.templates (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  body text not null,
  channel text check (channel in ('viber', 'sms', 'messenger', 'email', 'any')),
  owner_confirmed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category, title)
);
create trigger set_updated_at before update on public.templates
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- faqs
-- ---------------------------------------------------------------------------
create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null unique,
  answer_md text not null,
  sort_order int not null default 0,
  owner_confirmed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.faqs
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- testimonials
-- ---------------------------------------------------------------------------
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  student_name_display text not null,
  quote text not null,
  package_code text references public.packages (code),
  photo_path text,
  permission_confirmed boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.testimonials
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- settings
-- ---------------------------------------------------------------------------
create table public.settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- audit_log
-- ---------------------------------------------------------------------------
create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor text,
  action text not null,
  entity text not null,
  entity_id uuid,
  diff jsonb,
  created_at timestamptz not null default now()
);
create index audit_log_entity_idx on public.audit_log (entity, entity_id);
