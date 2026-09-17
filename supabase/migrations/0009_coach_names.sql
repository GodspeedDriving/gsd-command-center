-- GSD Command Center — real coach names on internal unit records
-- Owner-confirmed: Coach Ian on Unit A (automatic), Coach Ice on Unit M
-- (manual). Internal only — the public site still shows generic "GSD Coach
-- (A/T)/(M/T)" placeholders until the owner is ready to publish real names.

update public.units set instructor_name = 'Coach Ian' where code = 'UNIT_A';
update public.units set instructor_name = 'Coach Ice' where code = 'UNIT_M';
