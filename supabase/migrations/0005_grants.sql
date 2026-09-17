-- GSD Command Center — table grants
-- Run after 0002_rls.sql (order relative to 0003/0004 doesn't matter).
--
-- RLS policies restrict which ROWS a role can see, but Postgres also
-- requires baseline table-level GRANTs before RLS is even evaluated.
-- Supabase's dashboard Table Editor applies these automatically when you
-- create a table through the UI; creating tables via raw SQL (as our
-- 0001_init_schema.sql does) does not, so we grant them explicitly here.

grant usage on schema public to anon, authenticated;

grant select, insert, update, delete on all tables in schema public to authenticated;

grant select on public.packages to anon;
grant select on public.faqs to anon;
grant select on public.testimonials to anon;
grant select on public.policies to anon;
grant insert on public.leads to anon;
