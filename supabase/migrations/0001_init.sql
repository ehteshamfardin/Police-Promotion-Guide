-- Police Promotion Academy — Phase 2 Supabase schema + RLS
-- Run this ONCE in your Supabase project: Dashboard → SQL Editor → paste → Run.
-- Safe to re-run (uses IF NOT EXISTS / OR REPLACE / drop-and-recreate policies).

-- =====================================================================
-- Tables
-- =====================================================================
create table if not exists public.profiles (
  id             uuid primary key default gen_random_uuid(),
  auth_user_id   uuid not null unique references auth.users(id) on delete cascade,
  full_name      text,
  phone          text,
  email          text,
  profile_image  text,
  current_rank   text,
  target_rank    text,
  unit           text,
  joining_year   int,
  role           text not null default 'USER' check (role in ('USER','ADMIN')),
  premium        boolean not null default false,
  subscription_status text not null default 'free',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table if not exists public.ranks (
  id          bigint generated always as identity primary key,
  name        text not null unique,
  sort_order  int not null default 0
);

create table if not exists public.subjects (
  id          bigint generated always as identity primary key,
  slug        text not null unique,
  name        text not null,
  description text,
  icon        text,
  sort_order  int not null default 0
);

create table if not exists public.topics (
  id          bigint generated always as identity primary key,
  subject_id  bigint not null references public.subjects(id) on delete cascade,
  name        text not null,
  sort_order  int not null default 0,
  unique (subject_id, name)
);

create index if not exists topics_subject_id_idx on public.topics(subject_id);

-- =====================================================================
-- Row Level Security
-- =====================================================================
alter table public.profiles enable row level security;
alter table public.ranks    enable row level security;
alter table public.subjects enable row level security;
alter table public.topics   enable row level security;

-- Clients may never INSERT/DELETE a profile; the trigger creates it.
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
-- Only safe, user-owned columns are updatable. role / premium /
-- subscription_status are intentionally excluded, so even a crafted
-- request cannot change them.
grant update (full_name, phone, email, profile_image, current_rank, target_rank, unit, joining_year, updated_at)
  on public.profiles to authenticated;

grant select on public.ranks, public.subjects, public.topics to authenticated;

-- profiles: users can only read & update their OWN row
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = auth_user_id);

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = auth_user_id)
  with check ((select auth.uid()) = auth_user_id);

-- catalog tables: any authenticated user can read
drop policy if exists "read ranks" on public.ranks;
create policy "read ranks" on public.ranks
  for select to authenticated using (true);

drop policy if exists "read subjects" on public.subjects;
create policy "read subjects" on public.subjects
  for select to authenticated using (true);

drop policy if exists "read topics" on public.topics;
create policy "read topics" on public.topics
  for select to authenticated using (true);

-- =====================================================================
-- Auto-create a profile when a new auth user signs up.
-- role is HARD-CODED to 'USER' — never read from client metadata.
-- =====================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    auth_user_id, full_name, phone, email, current_rank, target_rank, unit, joining_year, role
  )
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone',
    coalesce(new.raw_user_meta_data ->> 'email', new.email),
    new.raw_user_meta_data ->> 'current_rank',
    new.raw_user_meta_data ->> 'target_rank',
    new.raw_user_meta_data ->> 'unit',
    nullif(new.raw_user_meta_data ->> 'joining_year', '')::int,
    'USER'
  )
  on conflict (auth_user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =====================================================================
-- Admin architecture (prepared, NOT a dashboard).
-- Later, promote a user from a trusted server/Edge Function using the
-- secret key, and add admin-only write policies e.g.:
--
--   create policy "admins manage subjects" on public.subjects
--     for all to authenticated
--     using  ((auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN')
--     with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN');
--
-- Authorization claims must come from server-controlled app_metadata,
-- never from user_metadata (which users can edit).
-- =====================================================================

-- =====================================================================
-- Seed data: ranks, subjects, topics (Bengali)
-- =====================================================================
insert into public.ranks (name, sort_order) values
  ('কনস্টেবল', 1),
  ('নায়েক', 2),
  ('হাভিলদার', 3),
  ('সহকারী উপ-পরিদর্শক (এএসআই)', 4),
  ('উপ-পরিদর্শক (এসআই)', 5),
  ('সার্জেন্ট', 6),
  ('পরিদর্শক (ইন্সপেক্টর)', 7),
  ('সহকারী পুলিশ সুপার (এএসপি)', 8),
  ('অতিরিক্ত পুলিশ সুপার (অতিরিক্ত এসপি)', 9),
  ('পুলিশ সুপার (এসপি)', 10)
on conflict (name) do nothing;

insert into public.subjects (slug, name, description, icon, sort_order) values
  ('police-regulation', 'পুলিশ রেগুলেশন', 'পুলিশ বাহকের গঠন, নিয়মাবলী ও কর্তব্য', 'shield-check', 1),
  ('penal-code', 'দণ্ডবিধি, ১৮৬০', 'অপরাধ ও শাস্তির মৌলিক আইন', 'gavel', 2),
  ('crpc', 'ফৌজদারি কার্যবিধি', 'গ্রেপ্তার, তদন্ত ও বিচার প্রক্রিয়া', 'file-document-outline', 3),
  ('evidence-act', 'সাক্ষ্য আইন, ১৮৭২', 'সাক্ষ্য, প্রমাণ ও প্রমাণ্যতা', 'scale-balance', 4),
  ('constitution', 'বাংলাদেশ সংবিধান', 'মৌলিক অধিকার ও রাষ্ট্রীয় কাঠামো', 'book-open-variant', 5),
  ('ethics-human-rights', 'পুলিশ নৈতিকতা ও মানবাধিকার', 'কর্মকর্তার আচরণ ও নাগরিক অধিকার', 'account-check-outline', 6),
  ('administration', 'প্রশাসনিক ব্যবস্থাপনা', 'নেতৃত্ব, কমান্ড ও সমন্বয়', 'account-tie', 7),
  ('language', 'বাংলা ও ইংরেজি', 'রিপোর্ট লেখা ও যোগাযোগ দক্ষতা', 'translate', 8)
on conflict (slug) do nothing;

insert into public.topics (subject_id, name, sort_order)
select s.id, t.name, t.ord
from public.subjects s
join (values
  ('police-regulation', 'পুলিশ রেগুলেশনের প্রাথমিক বিধান', 1),
  ('police-regulation', 'থানা ব্যবস্থাপনা ও রেকর্ড', 2),
  ('penal-code', 'ভূমিকা ও সাধারণ ব্যাখ্যা (ধারা ১–৫২)', 1),
  ('penal-code', 'মানবদেহ সংক্রান্ত অপরাধ', 2),
  ('crpc', 'গ্রেপ্তার ও জামিন', 1),
  ('crpc', 'তদন্ত প্রক্রিয়া ও এফআইআর', 2),
  ('evidence-act', 'সাক্ষ্যের প্রাসঙ্গিকতা', 1),
  ('constitution', 'মৌলিক অধিকার', 1)
) as t(subject_slug, name, ord) on t.subject_slug = s.slug
on conflict (subject_id, name) do nothing;