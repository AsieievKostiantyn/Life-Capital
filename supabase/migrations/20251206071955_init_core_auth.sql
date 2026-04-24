do $$
begin
    if not exists (select 1 from pg_type where typname = 'user_role') then
        create type user_role as enum ('player', 'host');
    end if;
end$$;

create table if not exists public.users (
    id           uuid primary key default gen_random_uuid(),
    display_name text not null,
    email        text not null unique,
    avatar_url   text,
    role         user_role not null default 'player',
    created_at   timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.users (
        id,
        display_name,
        email,
        avatar_url,
        role
    )
    values (
        new.id,
        coalesce(new.raw_user_meta_data->>'full_name', 'User'),
        new.email,
        new.raw_user_meta_data->>'picture',
        'player'
    );

    return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();