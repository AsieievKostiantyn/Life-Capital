create or replace view public.game_session_overview as
select
  gs.id as game_session_id,
  gs.session_name,
  gs.status,

  jsonb_build_object(
    'userId', host.id,
    'displayName', host.display_name
  ) as host,

  jsonb_agg(
    jsonb_build_object(
      'userId', u.id,
      'displayName', u.display_name,
      'avatarUrl', u.avatar_url,
      'profession', c.data->>'profession',
      'monthlyFreeFunds',
        (ps.finances->'generalInfo'->>'monthlyFreeFunds')
    )
    order by u.display_name
  )
  FILTER (where u.id <> gs.host_id)
  as participants

from public.game_sessions gs

join public.users host
  on host.id = gs.host_id

join public.game_session_users gsu
  on gsu.game_session_id = gs.id

join public.users u
  on u.id = gsu.user_id

left join public.player_state ps
  on ps.game_session_users_id = gsu.id

left join public.cards c
  on c.id = ps.player_legend_id

group by
  gs.id,
  gs.session_name,
  gs.status,
  host.id,
  host.display_name;



create or replace function public.get_game_session_overview(
  p_game_session_id uuid
)
returns record
language sql
stable
as $$
  select *
  from public.game_session_overview
  where game_session_id = p_game_session_id;
$$;