# GSD Command Center

The internal booking, scheduling, and business-tracking system for **Godspeed
Driving Tutorial Services (GSD)**. Built following [SPEC.md](./SPEC.md), one
milestone at a time.

**Current status: Milestone 1 (Foundation)** — project scaffolding, database
schema, and owner login are in place. The public landing page and booking
form come in later milestones.

## What this project needs to run

- A free [Supabase](https://supabase.com) project (database, login, file
  storage)
- A `.env.local` file with that project's connection details (copy
  `.env.local.example` and fill it in — see the setup steps you were given
  separately, or ask Claude Code to walk you through it again)

## Running it on your own computer

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser. Without a Supabase project
connected yet, the public page works but `/admin` will show a "Supabase
isn't connected yet" message instead of crashing.

## Checking the project is healthy

```bash
npm run lint        # code style checks
npm test             # fast unit tests
npm run build        # makes sure the site builds for production
npm run test:e2e     # end-to-end browser tests (needs `npm run dev` running)
```

## Project layout (for whoever picks this up next)

- `src/app/` — every page and route, using Next.js's App Router
- `src/app/admin/` — the owner-only admin area (protected by login)
- `src/config/business.ts` — brand info, contact details, and every fact
  the owner still needs to confirm (never invent a business fact — see
  `SPEC.md` Section 1, rule 4)
- `src/lib/supabase/` — database/login connection helpers
- `supabase/migrations/` — SQL files that set up the database. Run these,
  in order, in the Supabase SQL Editor when setting up a new project
- `SPEC.md` — the full project spec this system is built from

## Deploying and backing up

Deployment (Netlify) and backup instructions will be added here as those
milestones are built.
