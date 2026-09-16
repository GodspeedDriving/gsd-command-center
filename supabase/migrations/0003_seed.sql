-- GSD Command Center — seed data
-- Run after 0002_rls.sql. Safe to re-run (uses upserts on natural keys).
--
-- Prices, package contents, and units come straight from SPEC.md Section 3
-- (source of truth — do not change these without updating SPEC.md too).
-- Policy defaults are the *proposed* defaults from Section 6/M6; they are
-- seeded with owner_confirmed = false and must not be shown as final on the
-- public site until the owner confirms them (SPEC.md Section 8, rule 7).

-- ---------------------------------------------------------------------------
-- units
-- ---------------------------------------------------------------------------
insert into public.units
  (code, transmission, instructor_name, vehicle_label, vehicle_owned, instructor_day_rate, vehicle_day_rate, active, notes)
values
  ('UNIT_A', 'AT', 'GSD Instructor (A/T) — name TODO(OWNER)', 'Borrowed automatic vehicle', false, 1500, 1500,
   true, '26 years driving experience. Vehicle borrowed from a friend.'),
  ('UNIT_M', 'MT', 'GSD Instructor (M/T) — name TODO(OWNER)', 'GSD-owned manual vehicle', true, 2000, 0,
   true, '5 years driving experience, strong communicator. Fuel/upkeep tracked as manual expenses, not a fixed day rate.')
on conflict (code) do update set
  transmission = excluded.transmission,
  instructor_name = excluded.instructor_name,
  vehicle_label = excluded.vehicle_label,
  vehicle_owned = excluded.vehicle_owned,
  instructor_day_rate = excluded.instructor_day_rate,
  vehicle_day_rate = excluded.vehicle_day_rate,
  notes = excluded.notes;

-- ---------------------------------------------------------------------------
-- packages
-- ---------------------------------------------------------------------------
insert into public.packages
  (code, name, sessions_count, hours_per_session, price_weekday, price_weekend, display_order, audience_md, includes_md, active)
values
  ('P1', 'Package 1: Basic Road Handling', 1, 5, 5000, 5500, 1,
   'People who''ve always wanted to try but feel a little scared, or who prefer private coaching before committing to a full program. Focused on building confidence and preparing for LTO exam basics. Fully customizable (e.g. basic start/stop, basic parking, light traffic driving).',
   'Starting and stopping smoothly, basic turning, light traffic driving, and a clear recommendation for next steps.',
   true),
  ('P2', 'Package 2: Road-Ready Course', 2, 4, 9500, 10200, 2,
   'People who are done trying and ready to actually drive, and who want to feel capable and in control. A full structured course covering all essentials plus advanced confidence building.',
   'Everything in P1, plus: real driving on actual Quezon City roads, lane merging and discipline, turns/intersections/everyday situations, basic parking (parallel, reverse, angle), basic defensive driving, and vehicle maintenance basics (tire check, oil, coolant).',
   true),
  ('VIP', 'VIP Experience: All-In Mastery', 2, 5, 11800, 12500, 3,
   'Busy professionals who need flexible scheduling, people returning after a long break, people preparing for regular city driving or a company car plan, and learners who need extra practice and reinforcement.',
   'Everything in P2, plus: personalized hands-on coaching at the student''s pace, confidence building through repetition and real scenarios, patient 1-on-1 coaching (no pressure, no judgment), real-time corrections with clear explanations, an instructor assessment with honest feedback, and a priority booking slot every week.',
   true),
  ('URR', 'Ultimate Road Ready', 3, 5, 14800, 15500, 4,
   'Total beginners, very nervous drivers, students who want strong repetition, people preparing for daily city driving, and professionals who want full readiness before driving solo.',
   'Structured skill progression, full real-world exposure across different scenarios, advanced handling (tight spaces, traffic, decision-making, highways if ready), parking confidence in real conditions, defensive driving mindset training, consistent 1-on-1 coaching with the same instructor, vehicle maintenance basics, and priority scheduling when available.',
   true)
on conflict (code) do update set
  name = excluded.name,
  sessions_count = excluded.sessions_count,
  hours_per_session = excluded.hours_per_session,
  price_weekday = excluded.price_weekday,
  price_weekend = excluded.price_weekend,
  display_order = excluded.display_order,
  audience_md = excluded.audience_md,
  includes_md = excluded.includes_md;

-- ---------------------------------------------------------------------------
-- policies (proposed defaults — all owner_confirmed = false)
-- ---------------------------------------------------------------------------
insert into public.policies (key, title, body_md, params, owner_confirmed)
values
  ('deposit', 'Reservation / down payment',
   'A 30% down payment is due within 24 hours to confirm your slot.',
   '{"percent": 30, "due_hours": 24}', false),
  ('full_payment', 'Full payment',
   'The remaining balance is due before the start of your first session.',
   '{}', false),
  ('deposit_refundable', 'Non-refundable deposit',
   'The deposit is non-refundable, but it can be applied to a rescheduled date.',
   '{"refundable": false, "transferable_to_reschedule": true}', false),
  ('reschedule_48h', 'Student reschedule, 48+ hours before',
   'Free once per package. After that, ₱500 per reschedule.',
   '{"min_hours_notice": 48, "fee": 0, "free_uses_per_package": 1, "fee_after_free_use": 500}', false),
  ('reschedule_24_48h', 'Student reschedule, 24–48 hours before',
   'A ₱500 fee applies.',
   '{"min_hours_notice": 24, "max_hours_notice": 48, "fee": 500}', false),
  ('reschedule_under_24h', 'Student reschedule under 24 hours, or no-show',
   'A ₱1,500 fee applies (covers committed instructor and vehicle costs). The session is forfeited if the fee is unpaid.',
   '{"max_hours_notice": 24, "fee": 1500}', false),
  ('late_arrival', 'Late arrival',
   'The session still ends at the originally scheduled time.',
   '{}', false),
  ('weather', 'Weather policy',
   'If PAGASA issues an orange or red rainfall warning, a tropical cyclone wind signal affecting Metro Manila, or there is flooding on the route, the session is rescheduled free of charge (GSD or the student may call it). Under a yellow warning, the session proceeds at the instructor''s discretion; if GSD cancels, the reschedule is free.',
   '{"free_reschedule_signals": ["orange_rainfall", "red_rainfall", "wind_signal", "flooding"], "yellow_rainfall": "instructor_discretion"}', false),
  ('gsd_cancellation', 'GSD-initiated cancellation',
   'Free reschedule, with priority on the next open slot.',
   '{}', false),
  ('package_validity', 'Package validity',
   'All sessions must be completed within 60 days of the first session.',
   '{"validity_days": 60}', false),
  ('refunds', 'Refunds',
   'Refunds are only given if GSD cannot deliver the remaining sessions; unused sessions are refunded pro-rata.',
   '{}', false)
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- faqs (drafts — all owner_confirmed = false; do not show on the public site
-- until confirmed, per SPEC.md Section 8 rule 7)
-- ---------------------------------------------------------------------------
insert into public.faqs (question, answer_md, sort_order, owner_confirmed)
values
  ('Where do lessons happen, and do you offer pickup?', 'TODO(OWNER): describe meeting points / pickup zones and any pickup fee.', 1, false),
  ('What are your available schedules?', 'TODO(OWNER): describe teaching days and hours per unit.', 2, false),
  ('What should I bring to my session?', 'TODO(OWNER): e.g. valid student permit or license, comfortable shoes, water.', 3, false),
  ('What payment methods do you accept?', 'TODO(OWNER): confirm GCash / bank transfer details.', 4, false),
  ('Should I choose manual or automatic?', 'TODO(OWNER): guidance for undecided students.', 5, false),
  ('I''ve never driven before — can I still join?', 'TODO(OWNER): confirm messaging for total beginners (this is exactly what URR is designed for).', 6, false),
  ('Can I pay by credit/debit card?', 'TODO(OWNER): not yet — card payments are planned for a later phase once GSD is BIR-registered.', 7, false)
on conflict (question) do nothing;

-- ---------------------------------------------------------------------------
-- templates (message-reply drafts — all owner_confirmed = false)
-- ---------------------------------------------------------------------------
insert into public.templates (category, title, body, channel, owner_confirmed)
values
  ('prices', 'Package prices', 'Hi! Here''s a quick rundown of our packages: TODO(OWNER) — review pricing summary and link.', 'any', false),
  ('schedule', 'Available schedule', 'TODO(OWNER): draft schedule/availability reply.', 'any', false),
  ('requirements', 'What you need to join', 'TODO(OWNER): draft requirements reply (valid student permit/license, etc).', 'any', false),
  ('location', 'Meeting point / location', 'TODO(OWNER): draft location/pickup reply.', 'any', false),
  ('payment', 'How to pay', 'TODO(OWNER): draft payment instructions reply.', 'any', false),
  ('policies', 'Reschedule & weather policy', 'TODO(OWNER): draft short policy summary with link to full policy page.', 'any', false),
  ('manual_vs_automatic', 'Manual vs automatic', 'TODO(OWNER): draft guidance reply.', 'any', false),
  ('slot_full', 'Slot is full — waitlist', 'TODO(OWNER): draft waitlist invite reply.', 'any', false)
on conflict (category, title) do nothing;

-- ---------------------------------------------------------------------------
-- settings
-- ---------------------------------------------------------------------------
insert into public.settings (key, value)
values
  ('hold_hours', '24'),
  ('utilization_alert_threshold', '0.85'),
  ('followup_days', '[1, 3, 7]'),
  ('payment_details', '{"gcash_name": null, "gcash_number": null, "bank_name": null, "bank_account_name": null, "bank_account_number": null, "confirmed": false}')
on conflict (key) do nothing;
