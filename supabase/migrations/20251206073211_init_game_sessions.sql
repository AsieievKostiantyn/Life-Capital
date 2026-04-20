do $$
begin
    if not exists (select 1 from pg_type where typname = 'game_session_status') then
        create type game_session_status as enum ('active', 'archive');
    end if;
end$$;

create table if not exists public.game_sessions (
    id           uuid primary key default gen_random_uuid(),
    session_name text not null,
    host_id      uuid not null references public.users(id) on delete cascade,
    status       game_session_status not null default 'active',
    created_at   timestamptz not null default now()
);

create index if not exists game_sessions_host_idx
on public.game_sessions(host_id);

create table if not exists public.game_session_users (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid not null references public.users(id) on delete cascade,
    game_session_id  uuid not null references public.game_sessions(id) on delete cascade,
    unique (user_id, game_session_id)
);

create index if not exists game_session_users_user_idx
on public.game_session_users(user_id);

create index if not exists game_session_users_game_session_idx
on public.game_session_users(game_session_id);