alter table public.player_state
add column if not exists finances jsonb not null default '{}';