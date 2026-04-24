import { useEffect } from 'react';

import { Button, Flex, Group, Title } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';

import { useGameSessionUsersId } from '@/features/game-session-users/hooks';
import { useGameSessionId } from '@/features/game-session/hooks';
import { useUserGameSessionStatus } from '@/features/game-session/hooks';
import { gameStateMutationOptions } from '@/features/game_state/mutation-options';
import { useHasUnreadNews } from '@/features/player-state/hooks/useHasUnreadNews';
import { playerStateMutationOptions } from '@/features/player-state/mutation-options';

import { NewsList } from './components';

export const PlayerNewsPage = () => {
  const hasUnreadNews = useHasUnreadNews();
  const markNewsAsReadMutation = useMutation({
    ...playerStateMutationOptions.markNewsAsRead,
  });
  const gameSessionUsersId = useGameSessionUsersId();
  const gameSessionId = useGameSessionId();
  const { isHost } = useUserGameSessionStatus();

  const setDemandMutation = useMutation({
    ...gameStateMutationOptions.setDemandToNewsList,
  });
  const setEventMutation = useMutation({
    ...gameStateMutationOptions.setEventToNewsList,
  });

  const handleSetDemand = () => {
    setDemandMutation.mutate(gameSessionId);
  };
  const handleSetEvent = () => {
    setEventMutation.mutate(gameSessionId);
  };

  useEffect(() => {
    if (hasUnreadNews) markNewsAsReadMutation.mutate({ gameSessionUsersId });
  }, [gameSessionUsersId]);

  return (
    <Flex direction="column" gap="md" align="center">
      <Title order={2} ta="center">
        Новини гри
      </Title>{' '}
      {isHost && (
        <Group>
          <Button
            bd="1px solid blue"
            size="md"
            variant="default"
            onClick={handleSetDemand}
            disabled={setDemandMutation.isPending}
          >
            Попит
          </Button>
          <Button
            bd="1px solid purple"
            size="md"
            variant="default"
            onClick={handleSetEvent}
            disabled={setEventMutation.isPending}
          >
            Подія
          </Button>
        </Group>
      )}
      <NewsList />
    </Flex>
  );
};
