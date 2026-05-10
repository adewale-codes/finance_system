-- ============================================================
-- Finops — Database Schema
-- Run in Supabase SQL editor against your project
-- ============================================================

-- ─── Profiles (extends Supabase auth.users) ───────────────

create table if not exists public.profiles (
  id              uuid references auth.users(id) on delete cascade primary key,
  email           text        not null,
  full_name       text,
  is_admin        boolean     not null default false,
  journey_completed boolean   not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ─── Financial Snapshots ──────────────────────────────────

create table if not exists public.financial_snapshots (
  id                      uuid        default gen_random_uuid() primary key,
  user_id                 uuid        references public.profiles(id) on delete cascade not null,
  monthly_income          numeric(12,2) not null,
  monthly_expenses        numeric(12,2) not null,
  total_savings           numeric(12,2) not null,
  total_debt              numeric(12,2) not null,
  monthly_debt_payments   numeric(12,2) not null,
  -- Calculated metrics (populated by backend)
  savings_rate            numeric(5,2),
  debt_to_income_ratio    numeric(6,4),
  months_of_runway        numeric(5,1),
  net_worth               numeric(14,2),
  financial_health_score  numeric(4,1),
  -- AI output
  mirror_narrative        text,
  -- Raw answers from journey stages
  raw_stage_data          jsonb        not null default '{}',
  created_at              timestamptz  not null default now()
);

-- ─── Personalised Operating Systems ───────────────────────

create table if not exists public.operating_systems (
  id               uuid        default gen_random_uuid() primary key,
  user_id          uuid        references public.profiles(id) on delete cascade not null,
  core_principle   text        not null,
  monthly_targets  jsonb       not null,
  weekly_actions   jsonb       not null,
  mindset_reframe  text        not null,
  ninety_day_focus text        not null,
  version          integer     not null default 1,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ─── Daily Check-Ins ──────────────────────────────────────

create table if not exists public.checkins (
  id                      uuid        default gen_random_uuid() primary key,
  user_id                 uuid        references public.profiles(id) on delete cascade not null,
  mood_score              integer     not null check (mood_score between 1 and 10),
  financial_stress_score  integer     not null check (financial_stress_score between 1 and 10),
  notes                   text,
  ai_insight              text,
  created_at              timestamptz not null default now()
);

-- ─── Indexes ──────────────────────────────────────────────

create index if not exists checkins_user_id_idx        on public.checkins(user_id);
create index if not exists checkins_created_at_idx     on public.checkins(created_at desc);
create index if not exists snapshots_user_id_idx       on public.financial_snapshots(user_id);
create index if not exists operating_systems_user_idx  on public.operating_systems(user_id);

-- ─── Row Level Security ───────────────────────────────────

alter table public.profiles           enable row level security;
alter table public.financial_snapshots enable row level security;
alter table public.operating_systems   enable row level security;
alter table public.checkins            enable row level security;

-- Profiles
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Snapshots
create policy "Users can view own snapshots"
  on public.financial_snapshots for select using (auth.uid() = user_id);
create policy "Users can insert own snapshots"
  on public.financial_snapshots for insert with check (auth.uid() = user_id);

-- Operating systems
create policy "Users can view own OS"
  on public.operating_systems for select using (auth.uid() = user_id);
create policy "Users can insert own OS"
  on public.operating_systems for insert with check (auth.uid() = user_id);
create policy "Users can update own OS"
  on public.operating_systems for update using (auth.uid() = user_id);

-- Check-ins
create policy "Users can view own checkins"
  on public.checkins for select using (auth.uid() = user_id);
create policy "Users can insert own checkins"
  on public.checkins for insert with check (auth.uid() = user_id);

-- ─── Trigger: auto-create profile on signup ───────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Trigger: updated_at timestamps ──────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger operating_systems_updated_at
  before update on public.operating_systems
  for each row execute procedure public.set_updated_at();
