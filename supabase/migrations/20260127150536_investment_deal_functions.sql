create or replace function trigger_players_state(
  p_game_session_id uuid
)
returns void
language plpgsql
as $$
begin
  update player_state
  set investment_deal_ids = investment_deal_ids
  where game_session_users_id in (
    select id
    from game_session_users
    where game_session_id = p_game_session_id
  );
end;
$$;

create or replace function start_investment_deal(
  p_game_session_id uuid,
  p_user_id uuid,
  p_card_id uuid
)
returns void
language plpgsql
as $$
declare
  v_deal_id uuid;
  v_game_session_users_id uuid;
begin
  insert into investment_deals (
    game_session_id,
    card_id,
    owner_id,
    status
  )
  values (
    p_game_session_id,
    p_card_id,
    p_user_id,
    'negotiation'
  )
  returning id into v_deal_id;

  insert into investment_deal_participants (
    deal_id,
    user_id
  )
  values (
    v_deal_id,
    p_user_id
  );

  select id
  into v_game_session_users_id
  from game_session_users
  where user_id = p_user_id
    and game_session_id = p_game_session_id;

  update player_state
  set investment_deal_ids =
    array_append(investment_deal_ids, v_deal_id)
  where game_session_users_id = v_game_session_users_id;

  update game_state
  set current_investment =
    jsonb_set(
      current_investment,
      '{isAllowedToDeal}',
      'true'::jsonb,
      true
    )
  where game_session_id = p_game_session_id;
end;
$$;



create or replace function buy_investment(
  p_game_session_id uuid,
  p_user_id uuid,
  p_card_id uuid
)
returns void
language plpgsql
as $$
declare
  v_deal_id uuid;
  v_game_session_users_id uuid;
begin
  if exists (
    select 1
    from investment_deals
    where game_session_id = p_game_session_id
      and card_id = p_card_id
  ) then
    return;
  end if;

  insert into investment_deals (
    game_session_id,
    card_id,
    owner_id,
    status
  )
  values (
    p_game_session_id,
    p_card_id,
    p_user_id,
    'confirmed'
  )
  returning id into v_deal_id;

  select id
  into v_game_session_users_id
  from game_session_users
  where user_id = p_user_id
    and game_session_id = p_game_session_id;

  update player_state
  set investment_deal_ids =
    array_append(investment_deal_ids, v_deal_id)
  where game_session_users_id = v_game_session_users_id;
end;
$$;



create or replace function join_investment_deal(
  p_game_session_id uuid,
  p_card_id uuid,
  p_user_id uuid
)
returns void
language plpgsql
as $$
declare
  v_deal_id uuid;
  v_game_session_users_id uuid;
begin
  select id
  into v_deal_id
  from investment_deals
  where game_session_id = p_game_session_id
    and card_id = p_card_id
    and status = 'negotiation';

  if v_deal_id is null then
    raise exception 'Investment deal not found or already confirmed';
  end if;

  if exists (
    select 1
    from investment_deal_participants
    where deal_id = v_deal_id
      and user_id = p_user_id
  ) then
    return;
  end if;

  insert into investment_deal_participants (
    deal_id,
    user_id
  )
  values (
    v_deal_id,
    p_user_id
  );

  select id
  into v_game_session_users_id
  from game_session_users
  where user_id = p_user_id
    and game_session_id = p_game_session_id;

  update player_state
  set investment_deal_ids =
    array_append(investment_deal_ids, v_deal_id)
  where game_session_users_id = v_game_session_users_id;
end;
$$;



create or replace function confirm_participant_note(
  p_deal_id uuid,
  p_user_id uuid,
  p_notes text
)
returns void
language plpgsql
as $$
begin
  update investment_deal_participants
  set
    notes = p_notes,
    is_note_confirmed = true
  where deal_id = p_deal_id
    and user_id = p_user_id;

  update player_state
  set investment_deal_ids = investment_deal_ids
  where game_session_users_id in (
    select id
    from game_session_users
    where game_session_id = p_game_session_id
  );
end;
$$;



create or replace function remove_participant(
  p_deal_id uuid,
  p_target_user_id uuid
)
returns void
language plpgsql
as $$
declare
  v_game_session_id uuid;
  v_game_session_users_id uuid;
begin
  if not exists (
    select 1
    from investment_deals
    where id = p_deal_id
      and owner_id = auth.uid()
  ) then
    raise exception 'Only owner can remove participant';
  end if;

  select game_session_id
  into v_game_session_id
  from investment_deals
  where id = p_deal_id;

  delete from investment_deal_participants
  where deal_id = p_deal_id
    and user_id = p_target_user_id;

  select id
  into v_game_session_users_id
  from game_session_users
  where user_id = p_target_user_id
    and game_session_id = v_game_session_id;

  update player_state
  set investment_deal_ids =
    array_remove(investment_deal_ids, p_deal_id)
  where game_session_users_id = v_game_session_users_id;

  perform trigger_players_state(v_game_session_id);
end;
$$;



create or replace function confirm_deal(
  p_deal_id uuid
)
returns void
language plpgsql
as $$
declare
  v_not_confirmed int;
  v_game_session_id uuid;
begin
  if not exists (
    select 1
    from investment_deals
    where id = p_deal_id
      and owner_id = auth.uid()
  ) then
    raise exception 'Only owner can confirm deal';
  end if;

  select count(*)
  into v_not_confirmed
  from investment_deal_participants
  where deal_id = p_deal_id
    and is_note_confirmed = false;

  if v_not_confirmed > 0 then
    raise exception 'Not all participants confirmed the deal';
  end if;

  update investment_deals
  set status = 'confirmed'
  where id = p_deal_id;

  select game_session_id
  into v_game_session_id
  from investment_deals
  where id = p_deal_id;

  perform trigger_players_state(v_game_session_id);
end;
$$;



create or replace function set_deal_owner(
  p_deal_id uuid,
  p_new_owner_id uuid
)
returns void
language plpgsql
as $$
begin
  if not exists (
    select 1
    from investment_deals
    where id = p_deal_id
      and owner_id = auth.uid()
  ) then
    raise exception 'Only owner can change deal owner';
  end if;

  update investment_deals
  set owner_id = p_new_owner_id
  where id = p_deal_id;
end;
$$;



create or replace function sell_investment(
  p_deal_id uuid
)
returns void
language plpgsql
as $$
declare
  v_game_session_id uuid;
begin
  if not exists (
    select 1
    from investment_deals
    where id = p_deal_id
      and owner_id = auth.uid()
      and status = 'confirmed'
  ) then
    raise exception 'Only owner can sell confirmed investment';
  end if;

  update investment_deals
  set status = 'sold'
  where id = p_deal_id;

  select game_session_id
  into v_game_session_id
  from investment_deals
  where id = p_deal_id;

  perform trigger_players_state(v_game_session_id);
end;
$$;