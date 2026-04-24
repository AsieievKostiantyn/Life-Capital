create table if not exists public.deck_state (
    id uuid primary key default gen_random_uuid(),
    game_session_id uuid not null
        references public.game_sessions(id)
        on delete cascade,
    card_type card_type not null,
    cards_order uuid[] not null,
    current_card_index integer not null default 0,
    unique (game_session_id, card_type)
);

create index if not exists deck_state_game_session_idx
    on public.deck_state(game_session_id);

create index if not exists deck_state_card_type_idx
    on public.deck_state(card_type);