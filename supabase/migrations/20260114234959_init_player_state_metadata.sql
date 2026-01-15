alter table public.player_state
add column if not exists metadata jsonb not null default '{}'::jsonb;

update public.player_state
set metadata = metadata || jsonb_build_object(
    'last_seen_news_at',
    now()
)
where metadata->>'last_seen_news_at' is null;