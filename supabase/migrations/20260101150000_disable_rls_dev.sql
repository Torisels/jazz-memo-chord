-- Migration: 20260101150000_disable_rls_dev.sql
-- Description: Disable RLS for all tables for development purposes.
-- WARN: DO NOT APPLY IN PRODUCTION.

alter table profiles disable row level security;
alter table session_presets disable row level security;
alter table sessions disable row level security;
alter table user_difficult_chords disable row level security;
alter table exercise_attempts disable row level security;
alter table symbol_to_keyboard_attempts disable row level security;
alter table notation_to_symbol_attempts disable row level security;
