# Milestone 1 setup — things only you can do

Claude Code cannot create accounts, agree to terms, or handle your passwords
for you. Everything below is written as exact steps you can follow. Do them
in order: GitHub → Supabase → Netlify. Each one is free.

Whenever you copy a "key" or "URL", paste it into the file `.env.local` (on
your computer) or the Netlify dashboard (in Part 3) — never into a chat
message.

---

## Part 1: GitHub (stores your code, and Netlify deploys from it)

1. Go to https://github.com/signup and create a free account (or sign in if
   you already have one).
2. Once logged in, click the **+** icon in the top-right corner, then
   **New repository**.
3. Name it `gsd-command-center`. Set it to **Private**. Do not check "Add a
   README" (this project already has one). Click **Create repository**.
4. GitHub will show you a page with commands. You don't need to run its
   suggested commands — instead, tell Claude Code: "push this project to
   `https://github.com/<your-username>/gsd-command-center.git`" and it will
   do it for you (it already has the project committed locally and ready to
   push).

---

## Part 2: Supabase (your database, login system, and file storage)

1. Go to https://supabase.com/dashboard and sign up (you can use your GitHub
   account to sign in — click **Continue with GitHub**).
2. Click **New project**.
3. Choose an organization (Supabase creates a default one for you), name
   the project `gsd-command-center`, set a strong database password (save
   it somewhere safe — a password manager, not a chat), and pick the region
   closest to the Philippines (e.g. Singapore). Click **Create new project**.
   Wait a minute or two for it to finish setting up.
4. Once it's ready, open the **SQL Editor** from the left sidebar.
5. You need to run 4 files, in this exact order, from the
   `supabase/migrations/` folder in this project:
   `0001_init_schema.sql`, `0002_rls.sql`, `0003_seed.sql`,
   `0004_storage.sql`.
   For each one: open the file, copy its entire contents, paste into a new
   query in the SQL Editor, and click **Run**. Wait for it to say success
   before moving to the next file.
6. Now get your connection details: click the **Connect** button near the
   top of the dashboard. Under the framework dropdown, choose **Next.js**.
   You'll see a **Project URL** and a **Publishable key** — copy both.
7. On your computer, in the `gsd-command-center` project folder, make a
   copy of `.env.local.example` named `.env.local`, and paste in those two
   values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=<the Project URL>
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<the Publishable key>
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
8. Create your own login: in the Supabase dashboard, go to
   **Authentication** → **Users** → **Add user** → **Create new user**.
   Enter your own email address, and check **Auto Confirm User**. Click
   **Create user**.
9. Make that email an admin: go back to the **SQL Editor**, run this (swap
   in your real email):
   ```sql
   insert into public.admins (user_id, email, role)
   select id, email, 'owner'
   from auth.users
   where email = 'YOUR-EMAIL-HERE@example.com';
   ```
10. Tell Claude Code you've done this, and it will start the app locally
    (`npm run dev`) so you can test logging in at
    http://localhost:3000/login before it's live on the internet.

---

## Part 3: Netlify (hosting — makes the site live on the internet)

1. Go to https://app.netlify.com/signup and sign up (again, **Continue
   with GitHub** is the easiest option, and lets Netlify see your repos).
2. On your Netlify dashboard, click **Add new project** → **Import an
   existing project**.
3. Choose **GitHub**, authorize Netlify if asked, then pick the
   `gsd-command-center` repository.
4. Netlify should auto-detect it's a Next.js project and fill in the build
   settings. Leave them as detected. Click **Deploy** (don't worry that it
   will fail on the first try — it's missing the environment variables).
5. Once the project exists, go to **Project configuration** →
   **Environment variables** → **Add a variable** → **Add a single
   variable**. Add each of these one at a time (same values as your
   `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` — set this to your live Netlify URL once you
     know it (e.g. `https://gsd-command-center.netlify.app`), not
     `localhost`
6. Go to the **Deploys** tab and click **Trigger deploy** → **Deploy site**
   to rebuild with the new variables.
7. Once it succeeds, open your live URL on your phone, go to `/login`, log
   in with the email you created in Supabase Part 2, and check that you
   land on an empty admin area with a bottom menu (Today, Leads, Schedule,
   Money, More).

You do **not** need to buy a domain yet — the free `netlify.app` address
works fine for testing. Buying `godspeeddriving.com` (or similar) is a
`TODO(OWNER)` item you can do anytime; Claude Code can walk you through
pointing it at Netlify when you're ready.

---

## When you're done

Come back and tell Claude Code which parts are done (or if anything didn't
match these steps — provider dashboards change sometimes). Once you can log
in on your phone at the live URL and see the empty admin area, Milestone 1
is complete and we move to Milestone 2 (the public landing page).
