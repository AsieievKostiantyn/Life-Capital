create or replace function public.init_deck_state_for_session(
    p_game_session_id uuid
)
returns void
language plpgsql
as $$
declare
    ct card_type;
    card_ids uuid[];
begin
    for ct in
        select unnest(enum_range(null::card_type))
    loop
        select array_agg(id order by random())
        into card_ids
        from public.cards
        where type = ct;

        if card_ids is null then
            continue;
        end if;

        insert into public.deck_state (
            game_session_id,
            card_type,
            cards_order,
            current_card_index
        )
        values (
            p_game_session_id,
            ct,
            card_ids,
            0
        );
    end loop;
end;
$$;


create or replace function public.get_next_card_from_deck(
    p_game_session_id uuid,
    p_card_type card_type
)
returns public.cards
language plpgsql
as $$
declare
    deck record;
    card_id uuid;
    next_index integer;
    cards_count integer;
    result_card public.cards;
begin
    select *
    into deck
    from public.deck_state
    where game_session_id = p_game_session_id
      and card_type = p_card_type
    for update;

    if not found then
        raise exception 'Deck state not found for session % and type %',
            p_game_session_id, p_card_type;
    end if;

    cards_count := array_length(deck.cards_order, 1);

    if cards_count is null or cards_count = 0 then
        raise exception 'Deck is empty for type %', p_card_type;
    end if;

    card_id := deck.cards_order[deck.current_card_index + 1];

    next_index := deck.current_card_index + 1;

    if next_index >= cards_count then
        next_index := 0;
    end if;

    update public.deck_state
    set current_card_index = next_index
    where id = deck.id;

    select *
    into result_card
    from public.cards
    where id = card_id;

    return result_card;
end;
$$;