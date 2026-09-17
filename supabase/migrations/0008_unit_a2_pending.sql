-- GSD Command Center — second automatic unit (pending)
-- The owner is finalizing a 3rd vehicle + Coach Gian to run a second
-- automatic slot. Added now as INACTIVE so the schema is ready; flip
-- `active` to true once the vehicle deal and coach start date are both
-- confirmed. Until then this unit is invisible everywhere (SPEC.md:
-- "the UI should only show active units").

insert into public.units
  (code, transmission, instructor_name, vehicle_label, vehicle_owned, instructor_day_rate, vehicle_day_rate, active, notes)
values
  ('UNIT_A2', 'AT', 'Coach Gian (starting soon)', 'Borrowed automatic vehicle (pending)', false, 1500, 1500,
   false, 'Second automatic slot — pending vehicle deal and Coach Gian''s start date. Set active = true when both are confirmed.')
on conflict (code) do update set
  instructor_name = excluded.instructor_name,
  vehicle_label = excluded.vehicle_label,
  notes = excluded.notes;
