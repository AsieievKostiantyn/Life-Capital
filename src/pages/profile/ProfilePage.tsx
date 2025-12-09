import { Button, Container, Group } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { userQueryOptions } from '@/features/user/query-options';

export const ProfilePage = () => {
  const { user: authUser } = useAuthStrict();

  const { data: user } = useSuspenseQuery(
    userQueryOptions.getUserByIdQueryOption(authUser.id)
  );

  return (
    <>
      <Container>
        <Group>
          <p className="text-[20px]">
            Ваша роль зараз{' '}
            <span className="font-bold text-teal-400">{user.role}</span>
          </p>
          <Button variant="default">Змінити роль</Button>
        </Group>
      </Container>
    </>
  );
};
