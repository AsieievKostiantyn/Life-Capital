insert into public.users (display_name, email, avatar_url, role)
values
    ('demo_user', 'demo_user@test.net', 'https://example.com/avatar1.png', 'player'),
    ('host_user', 'host_user@test.net','https://example.com/avatar2.png', 'host')
returning *;

insert into public.game_sessions (session_name, host_id, status)
select
    'My First Session',
    (select id from public.users where display_name = 'host_user'),
    'active'
returning *;

insert into public.game_session_users (user_id, session_id)
select
    (select id from public.users where display_name = 'demo_user'),
    (select id from public.game_sessions limit 1);

insert into public.game_session_users (user_id, session_id)
select
    (select id from public.users where display_name = 'host_user'),
    (select id from public.game_sessions limit 1);