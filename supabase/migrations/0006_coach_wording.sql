-- GSD Command Center — wording fix
-- The owner asked to avoid the word "instructor" (GSD is not LTO-accredited,
-- so "coach" is used instead to avoid implying otherwise). Fixes the seed
-- text from 0003_seed.sql that used "instructor".

update public.packages
set includes_md = replace(
  includes_md,
  'an instructor assessment with honest feedback',
  'a coach assessment with honest feedback'
)
where code = 'VIP';

update public.packages
set includes_md = replace(
  includes_md,
  'consistent 1-on-1 coaching with the same instructor',
  'consistent 1-on-1 coaching with the same coach'
)
where code = 'URR';

update public.policies
set body_md = replace(
  body_md,
  'covers committed instructor and vehicle costs',
  'covers committed coach and vehicle costs'
)
where key = 'reschedule_under_24h';
