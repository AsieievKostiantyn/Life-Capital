alter table public.game_state
add column if not exists current_investment jsonb;

create or replace function public.set_investment(
    p_game_session_id uuid,
    p_owner_id uuid
)
returns void
language plpgsql
as $$
declare
    v_game_state_id uuid;
    v_card public.cards;
begin
    select gs.id
    into v_game_state_id
    from public.game_state gs
    where gs.game_session_id = p_game_session_id
    for update;

    if not found then
        raise exception
            'Game state not found for session %',
            p_game_session_id;
    end if;

    v_card := public.get_next_card_from_deck(
        p_game_session_id,
        'investment'::card_type
    );

    update public.game_state
    set current_investment = jsonb_build_object(
        'cardId', v_card.id,
        'ownerId', p_owner_id,
        'isAllowedToBuy', false
    )
    where id = v_game_state_id;
end;
$$;

create or replace function public.set_big_investment(
    p_game_session_id uuid,
    p_owner_id uuid
)
returns void
language plpgsql
as $$
declare
    v_game_state_id uuid;
    v_card public.cards;
begin
    select gs.id
    into v_game_state_id
    from public.game_state gs
    where gs.game_session_id = p_game_session_id
    for update;

    if not found then
        raise exception
            'Game state not found for session %',
            p_game_session_id;
    end if;

    v_card := public.get_next_card_from_deck(
        p_game_session_id,
        'big_investment'::card_type
    );

    update public.game_state
    set current_investment = jsonb_build_object(
        'cardId', v_card.id,
        'ownerId', p_owner_id,
        'isAllowedToBuy', false
    )
    where id = v_game_state_id;
end;
$$;