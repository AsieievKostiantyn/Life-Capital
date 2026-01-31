create or replace view investment_deal_full_view as
select
  d.id as deal_id,
  d.game_session_id,
  d.owner_id,
  d.status,
  d.created_at,ц

  jsonb_build_object(
    'id', c.id,
    'type', c.type,
    'data', c.data
  ) as card,

  coalesce(
    jsonb_agg(
      jsonb_build_object(
        'userId', u.id,
        'displayName', u.display_name,
        'notes', p.notes,
        'isNoteConfirmed', p.is_note_confirmed
      )
    ) filter (where p.id is not null),
    '[]'::jsonb
  ) as participants

from investment_deals d

left join investment_deal_participants p
  on p.deal_id = d.id

left join users u
  on u.id = p.user_id

join cards c
  on c.id = d.card_id

group by
  d.id,
  c.id;


create or replace function get_investment_deals(
  p_deal_ids uuid[]
)
returns setof investment_deal_full_view
language sql
security definer
set search_path = public
as $$
  select *
  from investment_deal_full_view
  where deal_id = any(p_deal_ids);
$$;