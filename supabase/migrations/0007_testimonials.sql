-- GSD Command Center — real student testimonials
-- Source: owner-provided Facebook review screenshots. Display names are
-- first name + last initial per owner preference. Coach names were removed
-- from quotes per owner instruction not to publicize coach assignments yet.
-- All entries below were confirmed by the owner as permission_confirmed.

insert into public.testimonials
  (student_name_display, quote, package_code, permission_confirmed, published)
values
  ('Rex M.',
   'Highly recommended! Sobrang accommodating at patient ang coach ko, kaya mas madali at less stressful yung learning experience. Sure na marami kang matututunan. Btw, I chose Package 1 because it''s affordable and time convenient.',
   'P1', true, true),
  ('Rosalin A.',
   'My coach was very patient, friendly and kind, teaching in a supportive, knowledgeable and fun manner — helping me build my confidence as a quite nervous beginner driver.',
   'URR', true, true),
  ('Rea B.',
   'I highly recommend GSD for driving students looking for patient coaches. They guide you and explain things in a way na hindi nakakapressure or nakakanerbyos.',
   null, true, true),
  ('Jella M.',
   'Salamat po ng marami sa pag-assist sa akin. Marami po akong natutunan, super bait po ng coach ko. Ang dami niyang nai-share na ideas at techniques sa pagmamaneho.',
   null, true, true),
  ('Gwenneth G.',
   'Thank you for the smooth transaction! Sobrang worth it ng package namin. God bless po sa GSD.',
   null, true, true),
  ('Gigi V.',
   'Highly recommended ang GSD — ang lamig at linis ng training cars nila! From booking to actual lessons, very responsive ang admin sa pag-assist sa lahat ng concerns ko.',
   null, true, true),
  ('Trizzha M.',
   'Our coach is very informative and also gives motivation. The calmness really helps a lot, plus the car is very cool!',
   null, true, true)
on conflict do nothing;
