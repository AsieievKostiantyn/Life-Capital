do $$
begin
    if not exists (select 1 from pg_type where typname = 'card_type') then
        create type card_type as enum (
            'player_legend',
            'expense',
            'big_expense',
            'investment',
            'big_investment',
            'demand',
            'event'
        );
    end if;
end$$;

create table if not exists public.cards (
    id uuid primary key default gen_random_uuid(),
    type card_type not null,
    data jsonb not null
);

create index if not exists cards_type_idx
    on public.cards(type);