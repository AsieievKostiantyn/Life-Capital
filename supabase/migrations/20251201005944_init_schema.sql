create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

do $$
begin
    if not exists (select 1 from pg_type where typname = 'game_session_status') then
        create type game_session_status as enum ('active', 'archive');
    end if;
end$$;

do $$
begin
    if not exists (select 1 from pg_type where typname = 'user_role') then
        create type user_role as enum ('player', 'host');
    end if;
end$$;

create table if not exists public.users (
    id           uuid primary key default uuid_generate_v4(),
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
  insert into public.users (id, display_name, email, avatar_url, role)
  values (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'User'),
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

create table if not exists public.game_sessions (
    id           uuid primary key default uuid_generate_v4(),
    session_name text not null,
    host_id      uuid not null references public.users(id) on delete cascade,
    status       game_session_status not null default 'active',
    created_at   timestamptz not null default now()
);

create index if not exists game_sessions_host_idx
on public.game_sessions(host_id);

create table if not exists public.user_game_sessions (
    id          uuid primary key default uuid_generate_v4(),
    user_id     uuid not null references public.users(id) on delete cascade,
    session_id  uuid not null references public.game_sessions(id) on delete cascade,
    unique (user_id, session_id)
);

create index if not exists user_game_sessions_user_idx
on public.user_game_sessions(user_id);

create index if not exists user_game_sessions_session_idx
on public.user_game_sessions(session_id);