# Supabase setup — Police Promotion Academy (Phase 2)

## 1. Apply the database schema (one time)
1. Open your Supabase project → **SQL Editor** → **New query**.
2. Open `migrations/0001_init.sql` from this folder, copy ALL of it.
3. Paste into the SQL Editor and click **Run**.
   - Creates tables: `profiles`, `ranks`, `subjects`, `topics`
   - Enables Row Level Security + column-level grants
   - Adds the trigger that auto-creates a profile on signup (role forced to `USER`)
   - Seeds Bengali ranks / subjects / topics
   - Safe to re-run.

## 2. (Recommended for now) Turn OFF email confirmation
So new users land on Home immediately after registering:
- **Authentication → Providers → Email** → turn **Confirm email** OFF → Save.
- Turn it back ON before going to production (more secure).

## 3. Password reset deep link
- **Authentication → URL Configuration → Redirect URLs**: add your app scheme
  `frontend://reset-password` (and your web preview origin for web testing).

## Keys
- The app uses only the **Project URL** + **publishable/anon key** (`EXPO_PUBLIC_*` in `frontend/.env`).
- The **secret / service_role key** must NEVER go in the app. Keep it in `backend/.env`
  only if/when you add trusted server-side admin operations. See `backend/.env.example`.
