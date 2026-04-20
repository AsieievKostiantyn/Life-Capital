create table if not exists public.game_state (
    id uuid primary key default gen_random_uuid(),
    game_session_id uuid not null
        references public.game_sessions(id)
        on delete cascade,
    news_list jsonb[] not null default '{}'::jsonb[],
    unique (game_session_id)
);