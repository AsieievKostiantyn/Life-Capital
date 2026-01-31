create table investment_deals (
  id uuid primary key default gen_random_uuid(),
  game_session_id uuid not null,
  card_id uuid not null,
  owner_id uuid not null,
  status text not null check (status in ('negotiation', 'confirmed')),
  created_at timestamptz not null default now()
);

create table investment_deal_participants (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references investment_deals(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade  ,
  notes text,
  is_note_confirmed boolean not null default false
);

create or replace function trg_touch_player_state_on_new_participant()
returns trigger
language plpgsql
as $$
begin
  update player_state
  set investment_deal_ids = investment_deal_ids
  where investment_deal_ids @> array[NEW.deal_id];

  return null;
end;
$$;

create trigger investment_deal_participants_after_insert
after insert on investment_deal_participants
for each row
execute function trg_touch_player_state_on_new_participant();
