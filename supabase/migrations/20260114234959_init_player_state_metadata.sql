alter table public.player_state
add column if not exists metadata jsonb not null default jsonb_build_object(
  'last_seen_news_at',
  now()
);

create or replace function public.mark_news_as_read(
    p_game_session_users_id uuid
)
returns void
language plpgsql
as $$
begin
    update public.player_state
    set metadata = metadata || jsonb_build_object('last_seen_news_at', now())
    where game_session_users_id = p_game_session_users_id;
end;
$$;