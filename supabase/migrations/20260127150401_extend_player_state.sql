alter table player_state
add column if not exists investment_deal_ids uuid[] not null default '{}';