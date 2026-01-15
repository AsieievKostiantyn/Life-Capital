create or replace function public.set_demand(
    p_game_session_id uuid
)
returns void
language plpgsql
as $$
declare
    v_game_state_id uuid;
    v_card public.cards;
    v_news_item jsonb;
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
        'demand'::card_type
    );

    v_news_item := jsonb_build_object(
        'reference_card_id', v_card.id,
        'appear_at', now()
    );

    update public.game_state
    set news_list = array_append(news_list, v_news_item)
    where id = v_game_state_id;
end;
$$;