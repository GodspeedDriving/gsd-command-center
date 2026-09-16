# GSD Command Center: Build Spec for Claude Code

**Business:** Godspeed Driving Tutorial Services (GSD), Quezon City, Philippines
**Owner:** Lalou (non-developer, comfortable following technical steps, works on GSD part-time)
**Spec version:** 1.0 (September 2026)
**Monthly running budget:** ₱500 to ₱2,000 (excluding the Claude subscription used to build it)

---

## 0. How Lalou uses this file

1. Create an empty folder on your laptop, for example `gsd-command-center`.
2. Save this file inside it as `SPEC.md`.
3. Install and open Claude Code by following the official guide: https://docs.claude.com/en/docs/claude-code/overview
4. Open Claude Code in that folder and type:
   > Read SPEC.md fully. Then build **Milestone 1 only**. Before any step that needs me to create an account, pay for something, or copy a secret key, stop and give me numbered, plain-language instructions.
5. When a milestone is done and you've checked it, type: `Build Milestone 2`. Continue one milestone at a time.
6. Fill in every `TODO(OWNER)` item in **Section 11** as early as you can. Claude Code will ask about any that block its work.

---

## 1. Instructions for Claude Code (read before writing any code)

You are building a small business system for a solo owner who has very little time. Follow these rules:

1. **Build one milestone at a time** (Section 10). At the end of each milestone: run the tests, explain in plain language what was built, give the owner a short checklist to try it herself, then stop and wait.
2. **Explain every manual step.** When the owner must create an account, set a setting, or copy a key, give numbered steps with the exact button names. Assume she is capable but not a developer.
3. **Never ask the owner to paste secrets into the chat.** Tell her to put them in `.env.local` (and in the hosting dashboard). Make sure `.env*` is in `.gitignore`.
4. **Never invent business facts.** Prices, policies, instructor names, hours, and payment details live in one config file (`src/config/business.ts`) and in the database. Anything not given in this spec is a `TODO(OWNER)` placeholder that shows clearly in the UI (for example, a yellow "Owner to confirm" badge in admin screens), never a made-up value on public pages.
5. **Keep running costs within budget.** Use only the free tiers listed in Section 5. Do not add any paid service without the owner's explicit approval. Before relying on any free-tier limit, check the provider's current pricing page, since limits change.
6. **Mobile-first.** The owner runs the business from her phone between work tasks. Every admin screen must work well at 380px width, with large tap targets.
7. **Plain language everywhere.** No technical jargon in the UI.
8. **Check current documentation** for Meta, PayMongo, Supabase, and Netlify before implementing integrations. Their requirements change often.
9. **Content guardrails** (Section 8) are hard rules for all public-facing text.

---

## 2. Business context

### 2.1 Positioning
GSD is the **professional middle ground** between:
- **Big driving schools:** technical, compliance-focused ("learn to get a license"), one teaching style for everyone, rotating instructors.
- **Freelance private instructors:** flexible but unstructured and unable to present themselves professionally.

GSD offers:
- **Personalized instruction** adapted to each student's pace, learning ability, strengths, and weaknesses.
- **One dedicated instructor per student** for the whole package, so the instructor knows the student's background and progress and can build momentum.
- **Attitude as well as skill:** the mission is a new breed of drivers who are confident, capable, and responsible, because there are already too many careless and reckless drivers on the road.

**Ambition:** start in Quezon City, then expand to Metro Manila and nearby provinces.

### 2.2 Brand
- **Official tagline:** "Confidence starts here." (GSD sells the experience and the transformation.)
- **Enrollment headline:** "Patient Instructors. Real Confidence. Roads You're Ready For."
- **Retired:** do NOT use "Wag ka matuto sa mali" anywhere.
- **Colors:** blue `#1A4FA0`, red `#D0191B`, yellow `#F7C948`. Use a warm off-white page background, as in the current package graphics.
- **Typography:** condensed bold headings (Oswald) and clean body text (Barlow). `TODO(OWNER)`: confirm the fonts.
- **Voice:** warm, patient, encouraging, never condescending, never pushy. Speak to nervous learners with empathy.

### 2.3 Target students
Nervous beginners, late learners, students burned by aggressive instructors, parents (enrolling themselves or their children), busy professionals, and people returning to driving after a long break.

### 2.4 Legal status (affects copy and features)
- GSD has a DTI registration only. BIR and LGU registration are not done yet.
- GSD is **not LTO-accredited.** It does not issue TDC or PDC certificates and cannot process licenses.
- "GSD Approved" and "Godspeed-Certified" are **internal** completion standards only.
- On public roads, a learner may drive only with a valid student permit (or license) and a licensed driver beside them. The system must collect and check this (Section 6, M3).

---

## 3. Operations facts

### 3.1 Instructors and vehicles

| Resource | Transmission | Instructor | Vehicle | Instructor pay per teaching day | Vehicle cost per teaching day |
|---|---|---|---|---|---|
| Unit A | Automatic (A/T) | Owner's husband, 26 yrs driving experience (`TODO(OWNER)`: display name) | Borrowed from a friend | ₱1,500 | ₱1,500 rental |
| Unit M | Manual (M/T) | Owner's son, 5 yrs driving experience, strong communicator (`TODO(OWNER)`: display name) | Owned by GSD | ₱2,000 | Fuel and upkeep (tracked manually) |

**Capacity rules:**
- Each instructor teaches **at most 1 student per day**, for **at most 5 hours**.
- Maximum capacity today is **2 sessions per day** (1 A/T and 1 M/T).
- The data model must allow adding more units later (a second A/T car and a third instructor), but the UI should only show active units.
- Adding a second A/T slot requires **both** a second vehicle and a second A/T-capable instructor. The system must never allow two bookings on the same instructor on the same date.

### 3.2 Packages (source of truth; seed these into the database)

| Code | Name | Sessions | Hours per session | Weekday price | Weekend price |
|---|---|---|---|---|---|
| P1 | Package 1: Basic Road Handling | 1 | 5 | ₱5,000 | ₱5,500 |
| P2 | Package 2: Road-Ready Course | 2 | 4 | ₱9,500 | ₱10,200 |
| VIP | VIP Experience: All-In Mastery | 2 | 5 | ₱11,800 | ₱12,500 |
| URR | Ultimate Road Ready | 3 | 5 | ₱14,800 | ₱15,500 |

`TODO(OWNER)`: confirm the **tier order** shown to students. The default display order is by price (P1, P2, VIP, URR). Note that VIP is described as "everything in Package 2 plus…", while URR has the most hours and the lowest price per hour.

`TODO(OWNER)`: rule for **mixed weekday/weekend** sessions within one package.

**Who each package is for and what it includes** (use for the landing page and the package recommender):

- **P1: Basic Road Handling**
  - *For:* people who've always wanted to try but feel a little scared, or who prefer private coaching before committing to a full program. Focused on building confidence and preparing for LTO exam basics.
  - *Fully customizable:* for example basic start and stop, basic parking, or light traffic driving.
  - *Includes:* starting and stopping smoothly, basic turning, light traffic driving, and a clear recommendation for next steps.

- **P2: Road-Ready Course**
  - *For:* people who are done trying and ready to actually drive, and who want to feel capable and in control. A full structured course covering all essentials plus advanced confidence building.
  - *Includes everything in P1, plus:* real driving on actual Quezon City roads, lane merging and discipline, turns, intersections and everyday situations, basic parking (parallel, reverse, angle), basic defensive driving, and vehicle maintenance basics (tire check, oil, coolant).

- **VIP: All-In Mastery**
  - *For:* busy professionals who need flexible scheduling, people returning after a long break, people preparing for regular city driving or a company car plan, and learners who need extra practice and reinforcement.
  - *Includes everything in P2, plus:* personalized hands-on coaching at the student's pace, confidence building through repetition and real scenarios, patient 1-on-1 coaching (no pressure, no judgment), real-time corrections with clear explanations, an instructor assessment with honest feedback, and a priority booking slot every week.

- **URR: Ultimate Road Ready (15 hrs)**
  - *For:* total beginners, very nervous drivers, students who want strong repetition, people preparing for daily city driving, and professionals who want full readiness before driving solo.
  - *Includes:* structured skill progression, full real-world exposure across different scenarios, advanced handling (tight spaces, traffic, decision-making, highways if ready), parking confidence in real conditions, defensive driving mindset training, consistent 1-on-1 coaching with the same instructor, vehicle maintenance basics, and priority scheduling when available.

> **Capacity note for Claude Code:** "Priority booking every week" (VIP) is hard to honor with only 2 slots a day. Implement priority as "VIP and URR students can see and book slots 3 days before other students." `TODO(OWNER)`: confirm this rule.

### 3.3 Demand vs capacity (why the system is designed this way)
- About **60 Messenger inquiries per day**, mostly from Facebook ads.
- Maximum capacity is about 2 sessions per day. At 6 days a week, and with most packages being 2 to 3 sessions, that is only about **5 to 6 new students per week**.
- **Conclusion:** the system's job is to answer, sort, and schedule quickly; keep a waitlist; and warn the owner when she is booked out so she can pause or reduce ad spend. It is **not** to generate more leads.

### 3.4 Current pain points
- Replying to every message by hand (the owner dislikes Meta AI's robotic tone).
- No time to follow up with interested leads.
- No central lead file.
- No record of earnings and expenses.
- Students ask to pay by credit card, which isn't possible yet.
- The owner has a work-from-home job and can only work on GSD part-time.

---

## 4. Goals and KPIs

The system must make these numbers visible, for any date range:

| KPI | Definition |
|---|---|
| New leads | Leads created (form, Messenger-tagged link, manual entry) |
| Qualified leads | Leads with a valid permit or license and a chosen transmission |
| Conversion rate | Enrolled ÷ new leads, and enrolled ÷ qualified leads |
| Speed to lead | Median time from lead creation to first owner contact (manual leads) |
| Ad spend | Entered manually per day or week |
| Cost per lead | Ad spend ÷ new leads |
| Cost per enrollment | Ad spend ÷ new enrollments |
| Utilization | Booked teaching days ÷ available teaching days, per unit, next 14 and 30 days |
| Booked-out date | First date with a free slot, per transmission |
| Waitlist size | Active waitlist entries per transmission |
| Revenue | Payments received (cash basis) and package value sold (booking basis) |
| Expenses | By category |
| Net profit | Revenue − expenses, per day, week, month, transmission, and package |
| Profit per teaching day | Per transmission |
| Outstanding balances | Total unpaid package amounts |
| Reschedule and no-show rate | By reason (student, weather, GSD) |
| Completion rate | Students reaching "GSD Approved" |

**Alert:** when utilization for the next 14 days is at or above 85% (configurable) for a transmission, show a banner: "A/T is booked until [date]. Consider pausing or reducing ads for A/T."

---

## 5. Tech stack and costs

| Layer | Choice | Why | Cost |
|---|---|---|---|
| App framework | Next.js (App Router) + TypeScript + Tailwind CSS | One codebase for the public site and the admin area | Free |
| Database, login, file storage | Supabase (Postgres, Auth, Storage, Row Level Security) | Managed and secure | Free tier |
| Hosting | **Netlify** (free plan) | The free plan allows commercial use. **Do not use Vercel Hobby**, which is limited to non-commercial use. | Free |
| Email notifications | Resend (or a similar provider with a free tier) | Lead alerts to the owner, booking confirmations to students | Free tier |
| Spam protection | Cloudflare Turnstile on public forms | Stops bot submissions | Free |
| Code storage and backups | GitHub (private repo) + GitHub Actions | Weekly database backup | Free |
| Domain | e.g. `godspeeddriving.com` (`TODO(OWNER)`) | Professional links in Messenger replies and ads | About ₱700–1,000 per year |
| Ad tracking (optional) | Meta Pixel on the landing page | Measures which ads produce reservations | Free |

**Supabase free-tier cautions (handle both):**
1. Free projects pause after 7 days of inactivity. Add a daily scheduled "keep-alive" request (GitHub Actions or a Netlify scheduled function).
2. The free tier has no managed daily backups. Add a **weekly GitHub Actions job** that exports all tables to CSV (or runs `pg_dump`) and stores the file as a private artifact or in the private repo. Also add a **"Download full backup"** button in the admin settings.

**Timezone:** Asia/Manila. **Currency:** PHP (₱), formatted like `₱14,800`. **Date format:** `Sep 16, 2026`.

**Expected monthly cost for Phase 1:** about ₱60–85 per month (the domain, averaged over the year). The remaining budget is reserved for Phase 2 or Phase 3 decisions.

---

## 6. Phase 1: Core system (build now)

### M1: Foundation
- Scaffold the project, linting, formatting, and a test runner (Vitest), plus Playwright for smoke tests.
- Supabase project, database schema (Section 7), RLS policies, and seed data (packages, units, policies).
- **Owner login** (email magic link or email+password) protecting `/admin`. Only emails listed in an `admins` table can access admin pages.
- `src/config/business.ts` holds brand, contact links, and TODO flags.
- Admin shell: bottom navigation on mobile (Today, Leads, Schedule, Money, More).
- Deploy to Netlify with environment variables. Give the owner step-by-step instructions.

### M2: Public landing page (`/`)
Sections, in order:
1. **Hero:** logo, "Confidence starts here.", the enrollment headline, and two buttons: **"Check available slots"** (goes to the reservation form) and **"Message us on Messenger"** (`m.me/<page>`, `TODO(OWNER)`).
2. **Why GSD:** one dedicated instructor, personalized pace, patient coaching, and real Quezon City roads. Include a short explanation of the "between driving schools and freelancers" positioning.
3. **Who it's for:** the audience list from Section 2.3.
4. **Packages:** four cards showing sessions, hours, weekday and weekend prices, "who it's for", "includes", and a "Reserve this package" button.
5. **"Not sure which package?"** A 3-question recommender (see M3 logic) that suggests a package.
6. **How it works:** Send a message or reserve online → Choose a package → Book a slot → Learn to drive → Become GSD Approved.
7. **Requirements:** a valid LTO student permit or driver's license is required for on-road lessons. State clearly that **GSD is a private driving tutorial service and does not issue TDC/PDC certificates**, and that students still complete LTO requirements through an accredited provider.
8. **Our instructors:** short, warm bios with photos (`TODO(OWNER)`).
9. **Testimonials:** use only testimonials the owner adds in the admin area (with student permission).
10. **Policies:** payment, reschedule, and weather policies, rendered from the database (Section 6, M6).
11. **FAQ:** editable in the admin area. Seed with draft questions (location and pickup, schedule, what to bring, payment methods, manual vs automatic, can a total beginner join, card payments) and mark every answer `TODO(OWNER)` for review.
12. **Footer:** DTI registration mention (`TODO(OWNER)`: confirm wording), contact, and links to the Privacy Notice and Terms.

Also include:
- A **Privacy Notice** page (Philippine Data Privacy Act, RA 10173) and a **Terms and Policies** page.
- SEO basics (title, description, Open Graph image with brand colors), plus `sitemap.xml` and `robots.txt`.
- **UTM capture:** store `utm_source`, `utm_campaign`, `utm_content`, and `fbclid` from the URL with the lead.
- Page load under 2 seconds on mobile 4G. Optimize images.

### M3: Lead qualification and reservation form (`/reserve`)
A multi-step, mobile-friendly form with a progress bar. Save a partial lead after step 1, so abandoned forms still appear as leads.

- **Step 1: Contact**
  - Full name, mobile number (PH format validation, required), Facebook name (optional), email (optional but recommended).
  - Preferred contact method: Viber / SMS / Messenger / Call.
- **Step 2: About you**
  - Transmission: Automatic / Manual / Not sure (show a short explainer).
  - Experience: Never driven / Tried a few times / Can drive but not confident / Returning after a long break.
  - Main goal: Pass the LTO test / Daily city driving / Company car / Just want to start / Other.
  - Nervousness level (1–5).
  - Who the lessons are for: Myself / My child / Someone else.
- **Step 3: License status (qualification gate)**
  - Options: None yet / Student permit / Driver's license / Expired.
  - For a student permit or license: expiry date (required) and an optional upload (image/PDF, stored in a **private** bucket).
  - If **None yet** or **Expired**: do not allow booking. Show a kind message explaining that a valid student permit is needed for on-road lessons, with a short guide to getting one. Offer **"Notify me / Save my spot on the waitlist."** Status becomes `needs_permit`. `TODO(OWNER)`: confirm this rule.
  - If the permit expires before the last planned session: show a warning and flag the lead.
- **Step 4: Package**
  - Pick a package, or **"Help me choose"**, which runs the recommender:
    - Never driven, or nervousness 4–5, or wants lots of practice → **URR**
    - Returning after a long break, or busy professional needing flexibility, or needs extra practice → **VIP**
    - Tried before and ready to drive properly, wants a full course → **P2**
    - Wants to try first, or wants a short course / LTO basics → **P1**
  - Weekday / Weekend. Show the price immediately.
- **Step 5: Schedule**
  - Show a calendar of real open dates for the chosen transmission (from M4). The student picks the first session date and optional preferred dates for later sessions.
  - If no dates are free within 30 days: offer to join the waitlist.
  - Meeting or pickup area within Quezon City (`TODO(OWNER)`: fixed meeting points or pickup, and whether there's a fee outside a zone).
- **Step 6: Confirm**
  - Summary of the choices.
  - Required checkboxes:
    - Consent to collection and use of personal data per the Privacy Notice.
    - Agreement to the Payment, Reschedule, and Weather Policy (with a link).
    - Confirmation that the student holds a valid permit or license and will bring it to every session.
  - Submit. Create a **tentative hold** on the first session date for `hold_hours` (default 24, configurable).
- **After submit**
  - Show a confirmation page with a reservation code (e.g. `GSD-2609-014`), the down-payment amount, payment instructions (`TODO(OWNER)`: GCash and bank details, stored in settings, never hardcoded), and a **"Upload proof of payment"** link.
  - Email the student a confirmation (if an email was given).
  - Email the owner a new-lead alert with a one-tap link to the lead.
  - Expire the hold automatically if no payment proof arrives within `hold_hours`, and notify the owner.

**Lead scoring** (shown as Hot / Warm / Cold):
- **Hot:** valid permit + date picked + form completed.
- **Warm:** valid permit but no date, or on the waitlist.
- **Cold:** partial form, `needs_permit`, or no response after follow-ups.

**Lead statuses:** `new` → `contacted` → `qualified` → `reserved` (hold) → `paid_deposit` → `enrolled` → `completed`. Also: `waitlist`, `needs_permit`, `lost` (with a reason), `spam`.

Also add a **manual "Quick add lead"** in the admin area (name, mobile, source, note) for leads who only chatted on Messenger. Adding one should take under 15 seconds on a phone.

### M4: Scheduling and availability
- **Units** (Section 3.1) each have an instructor and a vehicle.
- **Availability:** one booking per unit per date. Default teaching days and hours are `TODO(OWNER)`. The owner can block dates (holidays, car unavailable, instructor sick).
- **Dedicated instructor:** once a student is enrolled, all their sessions must use the same unit, and the system enforces this.
- **Session generation:** when a package is enrolled, create N sessions (from the package). Sessions without dates are `unscheduled`. The owner or student can schedule them later.
- **Admin calendar:** Day, Week, and Month views, color-coded by transmission. Tap a date to see the student, package, session number, meeting point, and phone number with call/SMS/Viber buttons.
- **"Today" screen:** today's and tomorrow's sessions, pending payment proofs, expiring holds, and follow-ups due.
- **Reschedule flow:**
  1. Choose a reason: Student request / Weather / GSD (instructor or vehicle issue) / No-show.
  2. The system shows which policy applies and any fee (M6).
  3. Pick a new date from open slots.
  4. Log the change in history.
- **Waitlist:** when a booking is cancelled or a date is unblocked, show waitlisted leads for that transmission (oldest first, VIP and URR first), with one-tap message buttons.
- **Calendar feed (optional):** a private ICS link per unit, so the instructors can see their schedule in Google Calendar.
- **Future-ready:** adding a unit (for example "Unit A2: second A/T car + third instructor") is a settings change, not a code change.

### M5: Students and progress
- **Student profile:** contact details, permit or license (type, expiry, file), transmission, dedicated unit, package, sessions, payments, and notes.
- **Session log** (filled in after each lesson; designed to be quick on a phone): skills covered (checklist from the package curriculum), strengths, areas to improve, next-session focus, confidence rating (1–5), and instructor remarks. This is what powers GSD's personalized approach. The next session's screen shows the previous "next focus".
- **Curriculum checklists** per package, built from Section 3.2 and editable by the owner.
- **Completion:** mark a student **"GSD Approved"** (internal standard). This generates a simple certificate of completion (PDF or image) that clearly says it is **not an LTO certificate**. It also creates a follow-up task to request a testimonial.
- **Parents:** if lessons are for someone else, store the payer or guardian separately from the student.

### M6: Payments and policy engine
- **Record payments:**
  - Date, amount, method (GCash / bank transfer / cash; add card in Phase 3), and reference number.
  - Proof upload, which students can submit via a link tied to their reservation code (no login needed, rate-limited).
  - Status: pending verification → verified → refunded.
- **Automatic calculations:** package price, amount paid, balance, and due dates.
- **Policies** are stored in a `policies` table so the owner can edit them. The public page and the fee calculator read from the same table.
- Seed these **proposed defaults**, all marked `TODO(OWNER)` for confirmation:

| Policy | Proposed default |
|---|---|
| Reservation / down payment | 30% of the package price, due within 24 hours to confirm the slot |
| Full payment | Balance due before the start of the first session |
| Non-refundable deposit | The deposit is non-refundable but can be applied to a rescheduled date |
| Student reschedule, 48+ hours before | Free (once per package); after that, ₱500 per reschedule |
| Student reschedule, 24–48 hours before | ₱500 fee |
| Student reschedule under 24 hours, or no-show | ₱1,500 fee (covers committed instructor and vehicle costs), or the session is forfeited if the fee is unpaid |
| Late arrival | The session still ends at the scheduled time |
| Weather | If PAGASA issues an **orange or red rainfall warning**, a **tropical cyclone wind signal** affecting Metro Manila, or there is flooding on the route, the session is rescheduled **free of charge** (GSD or the student may call it). Under a **yellow** warning, the session proceeds at the instructor's discretion; if GSD cancels, the reschedule is free. |
| GSD-initiated cancellation | Free reschedule, with priority on the next open slot |
| Package validity | All sessions must be completed within 60 days of the first session |
| Refunds | Only if GSD cannot deliver the remaining sessions; unused sessions refunded pro-rata |

- Fees create **charge** entries on the student's balance, which the owner can waive with a reason.
- **Receipts:** until GSD is BIR-registered, the system generates only an **"Acknowledgment of Payment"** (not an official receipt). Keep the receipt template ready to switch on in Phase 3.

### M7: Sales and expense tracker
- **Automatic expenses:** when a session is marked **completed** (or when a late cancellation or no-show still incurs cost), create expense entries from the unit settings:
  - Instructor pay: ₱1,500 (A/T) or ₱2,000 (M/T) per teaching day.
  - Vehicle rental: ₱1,500 per A/T day (the borrowed car).
  - These amounts are editable in settings, and the owner can override any entry.
  - `TODO(OWNER)`: are instructors and the car owner paid for late cancellations or no-shows?
- **Manual expense quick-add** (under 10 seconds): category, amount, date, unit (optional), note, and receipt photo (optional).
  - Categories: Fuel, Facebook ads, Vehicle maintenance, Toll and parking, Car wash, Registration and permits, Supplies, Phone and internet, Other.
  - **Facebook ad spend** can be entered as a daily or weekly total. It feeds cost-per-lead KPIs.
- **Income:** comes from verified payments (M6).
- **Views:**
  - Daily, weekly, and monthly profit and loss.
  - Profit by transmission and by package.
  - Profit per teaching day.
  - Owner's "take-home estimate" after all costs.
- **Recurring expenses** (for example a monthly phone load) with an optional reminder.

### M8: KPI dashboard and exports
- The dashboard shows the KPIs from Section 4 with a date-range picker (This week / This month / Last month / Custom).
- **Charts:** leads per day, revenue vs expenses, utilization per unit, and lead sources.
- The capacity alert banner (Section 4).
- **Exports:** CSV and Excel (`.xlsx`) for Leads, Students, Sessions, Payments, Expenses, and the Profit and Loss summary, each filtered by date range.
- **Full backup:** a ZIP of CSVs for all tables.

### M9: Follow-up helper and reply library
- **Follow-up queue:** leads not yet converted, due at Day 1, Day 3, and Day 7 after creation (configurable). Each shows the name, the lead's stage, and buttons:
  - **Viber**, **SMS** (`sms:` link with prefilled text), **Call**, and **Copy message**. Prefilled messages come from editable templates written in the owner's voice.
  - **Mark done** / **Snooze** / **Mark lost** (with a reason).
- **Reply library:** editable, categorized message templates (prices, schedule, requirements, location, payment, policies, manual vs automatic, "slot is full, join waitlist"). Each has a copy button and inserts the landing-page or reservation link with UTM tags.
  - Seed drafts in a warm, friendly English with light Taglish, marked `TODO(OWNER)` for review.
- **No automatic SMS in Phase 1** (to keep costs at zero). The owner sends with one tap.
- **Rule (Messenger):** Meta limits standard business replies to within 24 hours of the person's last message. So always try to get the lead's **mobile number** (via the form or in chat), because follow-ups after that window must happen by Viber, SMS, or call.

### M10: Messenger setup guide (Phase 1, no code)
Generate `docs/messenger-setup.md` with numbered steps for **Meta Business Suite's built-in (free) automations**. These send exactly the text the owner writes; they do not use the Meta AI voice. Include:
- **Instant reply:** a warm greeting, the landing-page link, and "Reply with a number" options (1 Prices, 2 Schedule, 3 Requirements, 4 Talk to Lalou).
- **Frequently asked questions:** suggested questions with answers.
- **Keyword replies:** e.g. "price", "how much", "schedule", "manual", "automatic", "requirements", "location", each linking to the relevant landing-page section.
- **Away message:** for times the owner is at her day job.
- **Ad setup:** use Click-to-Messenger ads whose greeting includes the reservation link, or link ads that go directly to `/reserve`.

Draft all message scripts in `docs/messenger-scripts.md` for the owner to edit. Remind her to test each one from a personal account.

---

## 7. Data model (Supabase / Postgres)

All tables have `id` (uuid), `created_at`, and `updated_at`. RLS is enabled on every table: public users can only insert leads, upload payment proofs via a signed token, and read public content. Admins can do everything.

- `admins` (user_id, email, role)
- `units` (code, transmission, instructor_name, vehicle_label, vehicle_owned bool, instructor_day_rate, vehicle_day_rate, active, teaching_days, notes)
- `blocked_dates` (unit_id nullable = all units, date, reason)
- `packages` (code, name, sessions_count, hours_per_session, price_weekday, price_weekend, display_order, audience_md, includes_md, active)
- `curriculum_items` (package_id, title, sort_order)
- `leads` (full_name, mobile, email, fb_name, contact_pref, transmission, experience, goal, nervousness, lessons_for, license_status, permit_expiry, permit_file_path, package_id, day_type, preferred_dates jsonb, meeting_area, source, utm jsonb, fbclid, score, status, lost_reason, consent_privacy_at, consent_policy_at, notes)
- `followups` (lead_id, due_at, channel, template_id, done_at, snoozed_until, outcome)
- `students` (lead_id, full_name, mobile, email, guardian_name, guardian_mobile, license_type, license_expiry, license_file_path, unit_id, status, approved_at)
- `enrollments` (student_id, package_id, day_type, price, deposit_due, balance_due_date, valid_until, status)
- `sessions` (enrollment_id, unit_id, session_no, date, start_time, hours, status [unscheduled/held/booked/completed/cancelled/no_show], hold_expires_at, meeting_point)
- `session_logs` (session_id, skills_covered jsonb, strengths, improve, next_focus, confidence, remarks)
- `reschedules` (session_id, old_date, new_date, reason [student/weather/gsd/no_show], hours_notice, fee_amount, waived, waive_reason)
- `waitlist` (lead_id, transmission, priority, notified_at, status)
- `payments` (enrollment_id, amount, method, reference, proof_path, status, verified_at, notes)
- `charges` (enrollment_id, type [reschedule_fee/no_show_fee/other], amount, waived, reason)
- `expenses` (date, category, amount, unit_id, session_id, auto_generated bool, note, receipt_path)
- `ad_spend` (period_start, period_end, amount, campaign, note)
- `policies` (key, title, body_md, params jsonb, owner_confirmed bool)
- `templates` (category, title, body, channel, owner_confirmed bool)
- `faqs` (question, answer_md, sort_order, owner_confirmed bool)
- `testimonials` (student_name_display, quote, package_code, photo_path, permission_confirmed bool, published bool)
- `settings` (key, value jsonb): payment details, hold_hours, alert thresholds, follow-up days, business contact
- `audit_log` (actor, action, entity, entity_id, diff jsonb)

**Storage buckets:**
- `permits` (private), `payment-proofs` (private), `receipts` (private): accessed via short-lived signed URLs.
- `public-assets` (public): logos, instructor photos, testimonial photos.

---

## 8. Content guardrails (hard rules)

1. Never state or imply that GSD is **LTO-accredited**, a "driving school", or able to issue **TDC/PDC certificates** or licenses.
2. "GSD Approved" and "Godspeed-Certified" must always be described as GSD's own internal standard.
3. Never guarantee passing the LTO exam or getting a license.
4. Do not use "Wag ka matuto sa mali."
5. Do not claim "first of its kind in Quezon City" (or similar superlatives) on public pages until the owner can back it up.
6. Only publish testimonials with `permission_confirmed = true`.
7. Never show a price, policy, or FAQ answer with `owner_confirmed = false` on the live site. Show a neutral "Contact us for details" instead, and flag it in the admin area.
8. If automated chat is added later, it must identify itself as automated and hand off to a human on request.

---

## 9. Non-functional requirements

- **Security:** RLS everywhere; admin-only routes; rate limiting and Turnstile on public forms; signed upload tokens; no secrets in the repo; dependency updates monthly.
- **Privacy (RA 10173):**
  - Collect only what's needed and record consent timestamps.
  - Delete permit files and personal data of `lost`, `cold`, or `needs_permit` leads after 12 months (configurable), after warning the owner.
  - Provide a "Delete this person's data" admin action.
- **Reliability:** daily keep-alive and weekly backups (Section 5). Show "Last backup: [date]" in settings.
- **Accessibility:** readable contrast with the brand colors, labels on all inputs, keyboard navigation.
- **Performance:** landing page Lighthouse mobile score of 90 or higher.
- **Testing:**
  - Unit tests for availability (no double-booking per unit per date), dedicated-unit enforcement, price calculation (weekday/weekend), the policy fee calculator (hours-notice boundaries), automatic expense creation, and KPI math.
  - A Playwright smoke test: reserve → hold → upload proof → verify → enroll → complete session → profit and loss updates.
- **Docs:**
  - `README.md` in plain language: how to run, deploy, back up, and restore.
  - `docs/owner-guide.md`: how to do daily tasks, with screenshots.

---

## 10. Milestones and acceptance criteria

| # | Milestone | Done when… |
|---|---|---|
| 1 | Foundation (M1) | The owner can log in on her phone at the live URL and see an empty admin area; packages and units are seeded |
| 2 | Landing page (M2) | The public site is live on her domain with all sections, and TODO content is hidden or neutral |
| 3 | Reservation form + leads (M3) | A test reservation creates a lead, holds a date, emails the owner, and shows payment instructions; partial forms appear as leads |
| 4 | Scheduling (M4) | The calendar prevents double-booking, holds expire, blocked dates work, and reschedules are logged |
| 5 | Payments + policies (M6) | Proof upload works, balances are correct, and fees calculate per policy; the policy page reads from the database |
| 6 | Students + session logs (M5) | The instructor notes flow takes under 1 minute on a phone; "GSD Approved" generates a completion document |
| 7 | Expense tracker (M7) | Completing a session auto-creates the correct costs, and manual expenses take under 10 seconds |
| 8 | Dashboard + exports (M8) | KPIs match the test data, exports open in Excel, and the capacity alert fires |
| 9 | Follow-ups + reply library (M9) | The Day 1/3/7 queue works and the Viber/SMS buttons open with prefilled text |
| 10 | Messenger guide (M10) + owner guide | The owner can set up Business Suite automations by following the doc alone |

---

## 11. Owner decisions checklist (`TODO(OWNER)`)

1. Display names, short bios, and photos for both instructors
2. Package tier order and the mixed weekday/weekend rule
3. Teaching days and hours per unit
4. Meeting points or pickup zones, and any pickup fee
5. Payment methods and account details (GCash name/number, bank)
6. Deposit %, reschedule fees, package validity, refund rule (Section 6, M6 defaults)
7. Whether instructors and the car owner are paid on late cancellations or no-shows
8. Whether students without a valid permit can do anything (e.g. an off-road orientation) or waitlist only
9. VIP/URR "priority booking" rule
10. Domain name and Messenger page link
11. Website language: English, or English with Taglish
12. Final FAQ answers and message templates
13. Fonts confirmation and final logo files
14. Footer business registration wording

---

## 12. Later phases (do not build until the owner says so)

### Phase 2: Messenger button bot (decide after 4 weeks of Phase 1 data)
**Option A: custom scripted bot** (recommended for budget).
- Built into this app using the Meta Messenger Platform (webhook).
- **Flow:** greeting → buttons (Prices / Book / Requirements / Talk to a person) → transmission → weekday/weekend → package suggestion → reservation link with prefilled fields → ask for mobile number → create or update the lead in the database automatically.
- **Rules:** exact scripted text only (no AI); discloses that it is automated; "Talk to a person" pauses the bot for that conversation; **no automated messages outside Meta's 24-hour window.**
- **Needs:** a Meta developer app, business verification, and app review for messaging permissions. Claude Code must check Meta's current requirements and walk the owner through them.
- **Cost:** ₱0 platform fees.

**Option B: a no-code chatbot tool** (e.g. ManyChat).
- Faster to set up, but pricing is based on active contacts. At about 60 new chats per day, expect roughly **$29–39+ per month**, which uses up most or all of the budget. Check current pricing first.

**Optional add-on:** an "AI draft reply" button in the admin area (paste a message and get a suggested reply in the owner's voice, which she edits before sending). Only if the owner approves the API cost.

### Phase 3: Growth and compliance
- **Card payments via PayMongo** (or similar). This **requires BIR registration** (Certificate of Registration, Form 2303). Add payment links and a webhook to mark payments as paid automatically. `TODO(OWNER)`: whether card fees (about 3.5% + ₱15 per transaction; check current rates) are passed on as a surcharge or absorbed.
- Official receipts or invoices once BIR registration is complete.
- **Instructor login:** own schedule and session-log entry only.
- Automated SMS reminders (paid SMS provider, only with owner approval).
- A second A/T unit (vehicle + third instructor) and a capacity-planning view that shows whether an extra unit would be profitable, using real data.
- Multi-city expansion (service areas per unit).
