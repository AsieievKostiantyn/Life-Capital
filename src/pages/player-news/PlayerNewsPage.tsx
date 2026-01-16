import { useEffect } from 'react';

import { Title } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';

import { useGameSessionUsersId } from '@/features/game-session-users/hooks';
import { useHasUnreadNews } from '@/features/player-state/hooks/useHasUnreadNews';
import { playerStateMutationOptions } from '@/features/player-state/mutation-options';

import { NewsList } from './components';

export const PlayerNewsPage = () => {
  const hasUnreadNews = useHasUnreadNews();
  const markNewsAsReadMutation = useMutation({
    ...playerStateMutationOptions.markNewsAsRead,
  });
  const gameSessionUsersId = useGameSessionUsersId();

  useEffect(() => {
    if (hasUnreadNews) markNewsAsReadMutation.mutate({ gameSessionUsersId });
  }, [gameSessionUsersId]);

  return (
    <>
      <Title order={2} ta="center" my="sm">
        Новини гри
      </Title>{' '}
      <NewsList />
    </>
  );
};
