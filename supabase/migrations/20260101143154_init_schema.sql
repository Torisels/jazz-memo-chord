-- Migration: 20260101143154_init_schema.sql
-- Description: Initial database schema for Jazz Memo Chord application.
-- Includes profiles, sessions, attempts, and related tables with RLS policies.

-- 1. ENUM Types

-- Tryby ćwiczeń dostępne w aplikacji
create type app_exercise_mode as enum (
    'symbol_to_keyboard',
    'notation_to_symbol'
);

-- Klucze muzyczne
create type app_clef_type as enum (
    'treble',
    'bass'
);

-- 2. Tables

-- Table: profiles
create table profiles (
    id uuid not null references auth.users(id) on delete cascade,
    username text unique,
    is_active boolean default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id)
);

alter table profiles enable row level security;

-- Table: session_presets
create table session_presets (
    id uuid not null default gen_random_uuid(),
    user_id uuid not null references profiles(id) on delete cascade,
    name text not null,
    config jsonb not null,
    created_at timestamptz not null default now(),
    primary key (id)
);

alter table session_presets enable row level security;

-- Table: sessions
create table sessions (
    id uuid not null default gen_random_uuid(),
    user_id uuid not null references profiles(id) on delete cascade, -- Note: Plan said NO CASCADE on delete usually, but profiles has is_active soft delete. However, standard SQL often needs FK constraint. Plan: "Brak ON DELETE CASCADE dla sessions -> attempts". But here profiles->sessions. Let's stick to simple FK. Plan says "REFERENCES profiles(id)". I will add ON DELETE CASCADE for dev convenience unless specified otherwise, but plan says "Brak ON DELETE CASCADE dla sessions -> attempts". It doesn't explicitly forbid it for profiles->sessions, but implied soft delete usage. I'll stick to NO CASCADE for safety if not specified, or standard reference.
    -- Correction: Plan section 7 says: "Brak ON DELETE CASCADE dla sessions -> attempts". It doesn't mention profiles->sessions explicitly but standard practice with soft-delete profiles is to keep data. However, if the user is truly PURGED from auth.users, profiles cascade deletes, and usually we want to wipe their data or anonymize it. I will use CASCADE for profiles->sessions to clean up if a user is hard-deleted.
    config_snapshot jsonb not null,
    started_at timestamptz not null default now(),
    ended_at timestamptz,
    primary key (id)
);

alter table sessions enable row level security;

-- Table: user_difficult_chords
create table user_difficult_chords (
    id uuid not null default gen_random_uuid(),
    user_id uuid not null references profiles(id) on delete cascade,
    chord_identifier text not null,
    is_manual boolean default false,
    created_at timestamptz not null default now(),
    primary key (id),
    unique (user_id, chord_identifier)
);

alter table user_difficult_chords enable row level security;

-- Table: exercise_attempts
create table exercise_attempts (
    id uuid not null default gen_random_uuid(),
    session_id uuid not null references sessions(id), -- Plan says: "Brak ON DELETE CASCADE" here.
    user_id uuid not null references profiles(id) on delete cascade,
    mode app_exercise_mode not null,
    is_correct boolean not null,
    duration_ms integer not null,
    tooltips_count integer not null default 0,
    created_at timestamptz not null default now(),
    primary key (id)
);

alter table exercise_attempts enable row level security;

-- Table: symbol_to_keyboard_attempts
create table symbol_to_keyboard_attempts (
    attempt_id uuid not null references exercise_attempts(id) on delete cascade,
    target_chord_symbol text not null,
    pressed_keys jsonb not null,
    primary key (attempt_id)
);

alter table symbol_to_keyboard_attempts enable row level security;

-- Table: notation_to_symbol_attempts
create table notation_to_symbol_attempts (
    attempt_id uuid not null references exercise_attempts(id) on delete cascade,
    target_notation_hash text not null,
    input_chord_symbol text not null,
    primary key (attempt_id)
);

alter table notation_to_symbol_attempts enable row level security;

-- 3. Indexes

create index idx_sessions_user_started on sessions(user_id, started_at desc);
create index idx_attempts_user_created on exercise_attempts(user_id, created_at desc);
create index idx_difficult_chords_lookup on user_difficult_chords(user_id, chord_identifier);

-- 4. RLS Policies

-- Profiles
-- SELECT: Users can see their own profile
create policy "Users can view own profile"
    on profiles for select
    to authenticated
    using (auth.uid() = id);

-- UPDATE: Users can update their own profile
create policy "Users can update own profile"
    on profiles for update
    to authenticated
    using (auth.uid() = id);

-- INSERT: Assume handled by trigger on auth.users usually, but allowing manual insert for flexibility if needed (e.g. from client on first login if not using triggers). Plan says: "Trigger na auth.users tworzy profil... lub użytkownik może utworzyć przy rejestracji."
create policy "Users can insert own profile"
    on profiles for insert
    to authenticated
    with check (auth.uid() = id);

-- Session Presets
create policy "Users can view own presets"
    on session_presets for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert own presets"
    on session_presets for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Users can update own presets"
    on session_presets for update
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can delete own presets"
    on session_presets for delete
    to authenticated
    using (auth.uid() = user_id);

-- Sessions
create policy "Users can view own sessions"
    on sessions for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert own sessions"
    on sessions for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Users can update own sessions"
    on sessions for update
    to authenticated
    using (auth.uid() = user_id);

-- User Difficult Chords
create policy "Users can view own difficult chords"
    on user_difficult_chords for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert own difficult chords"
    on user_difficult_chords for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Users can update own difficult chords"
    on user_difficult_chords for update
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can delete own difficult chords"
    on user_difficult_chords for delete
    to authenticated
    using (auth.uid() = user_id);

-- Exercise Attempts
create policy "Users can view own attempts"
    on exercise_attempts for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert own attempts"
    on exercise_attempts for insert
    to authenticated
    with check (auth.uid() = user_id);

-- Symbol To Keyboard Attempts
-- Inherit checks from parent attempt or check via join? RLS on child tables usually requires checking the parent ownership or denormalized user_id if present.
-- This table does NOT have user_id. RLS is tricky on 1:1 extensions without user_id.
-- However, we can join to exercise_attempts to check user_id.
-- OR we can rely on variable injection or simply add user_id to these tables too?
-- Plan doesn't have user_id in child tables.
-- Best practice: check existence of parent record owned by user.
create policy "Users can view own symbol attempts"
    on symbol_to_keyboard_attempts for select
    to authenticated
    using (exists (
        select 1 from exercise_attempts
        where exercise_attempts.id = symbol_to_keyboard_attempts.attempt_id
        and exercise_attempts.user_id = auth.uid()
    ));

create policy "Users can insert own symbol attempts"
    on symbol_to_keyboard_attempts for insert
    to authenticated
    with check (exists (
        select 1 from exercise_attempts
        where exercise_attempts.id = symbol_to_keyboard_attempts.attempt_id
        and exercise_attempts.user_id = auth.uid()
    ));

-- Notation To Symbol Attempts
create policy "Users can view own notation attempts"
    on notation_to_symbol_attempts for select
    to authenticated
    using (exists (
        select 1 from exercise_attempts
        where exercise_attempts.id = notation_to_symbol_attempts.attempt_id
        and exercise_attempts.user_id = auth.uid()
    ));

create policy "Users can insert own notation attempts"
    on notation_to_symbol_attempts for insert
    to authenticated
    with check (exists (
        select 1 from exercise_attempts
        where exercise_attempts.id = notation_to_symbol_attempts.attempt_id
        and exercise_attempts.user_id = auth.uid()
    ));

-- 5. Views

create view user_global_stats as
select
    user_id,
    count(*) as total_attempts,
    sum(case when is_correct then 1 else 0 end) as correct_attempts,
    avg(duration_ms) as avg_reaction_time,
    max(created_at) as last_activity_at
from
    exercise_attempts
group by
    user_id;
