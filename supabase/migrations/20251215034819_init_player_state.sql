create table if not exists public.player_state (
    id uuid primary key default gen_random_uuid(),

    game_session_users_id uuid not null
        references public.game_session_users(id)
        on delete cascade,

    player_legend_id uuid
        references public.cards(id)
        on delete set null default null,

    unique (game_session_users_id)
);

create index if not exists player_state_gsu_idx
    on public.player_state(game_session_users_id);