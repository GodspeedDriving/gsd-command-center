-- GSD Command Center — hide pricing from the public API
-- The owner doesn't want exact prices scrapeable by competitors via the
-- public site or its API. Hiding price in the UI isn't enough on its own —
-- the anon key is public by design, so anyone could otherwise query
-- Supabase's REST API directly and still get price_weekday/price_weekend.
-- Postgres/PostgREST support column-level grants, so we revoke the earlier
-- blanket "all columns" grant on packages for anon and re-grant only the
-- columns the public site actually needs.

revoke select on public.packages from anon;

grant select (
  id, code, name, sessions_count, hours_per_session,
  display_order, audience_md, includes_md, active,
  created_at, updated_at
) on public.packages to anon;

-- `authenticated` (admin, via RLS) keeps full access — untouched.
