create or replace function public.set_player_legend(
    p_game_session_id uuid,
    p_user_id uuid
)
returns void
language plpgsql
as $$
declare
    v_game_session_user_id uuid;
    v_player_state_id uuid;
    v_card public.cards;
begin
    select gsu.id
    into v_game_session_user_id
    from public.game_session_users gsu
    where gsu.game_session_id = p_game_session_id
      and gsu.user_id = p_user_id;

    if not found then
        raise exception
            'User % is not part of game session %',
            p_user_id, p_game_session_id;
    end if;

    select ps.id
    into v_player_state_id
    from public.player_state ps
    where ps.game_session_users_id = v_game_session_user_id
    for update;

    if not found then
        raise exception
            'Player state not found for user % in session %',
            p_user_id, p_game_session_id;
    end if;

    v_card := public.get_next_card_from_deck(
        p_game_session_id,
        'player_legend'::card_type
    );

    update public.player_state
    set player_legend_id = v_card.id
    where id = v_player_state_id;

end;
$$;