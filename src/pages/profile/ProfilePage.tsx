import { Button, Container, Group } from '@mantine/core';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { userMutationOptions } from '@/features/user/mutation-options';
import { userQueryOptions } from '@/features/user/query-options';

export const ProfilePage = () => {
  const { user: authUser } = useAuthStrict();

  const { data: user } = useSuspenseQuery(
    userQueryOptions.getUserByIdQueryOption(authUser.id)
  );

  const updateUser = useMutation(
    userMutationOptions.updataUserRoleMutationOptions
  );

  const handleRoleChanging = () => {
    updateUser.mutate({
      newRole: user.role === 'player' ? 'host' : 'player',
      userId: user.id,
    });
  };

  return (
    <>
      <Container>
        <Group>
          <p className="text-[20px]">
            Ваша роль зараз{' '}
            <span className="font-bold text-teal-400">{user.role}</span>
          </p>
          <Button
            variant="default"
            onClick={handleRoleChanging}
            disabled={updateUser.isPending}
          >
            Змінити роль
          </Button>
        </Group>
      </Container>
    </>
  );
};
