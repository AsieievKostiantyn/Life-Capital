import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';

import { useGameSessionUsersId } from '@/features/game-session-users/hooks';
import { useHasUnreadNews } from '@/features/player-state/hooks/useHasUnreadNews';
import { playerStateMutationOptions } from '@/features/player-state/mutation-options';

export const PlayerNewsPage = () => {
  const hasUnreadNews = useHasUnreadNews();
  const markNewsAsReadMutation = useMutation({
    ...playerStateMutationOptions.markNewsAsRead,
  });
  const gameSessionUsersId = useGameSessionUsersId();

  useEffect(() => {
    if (hasUnreadNews) markNewsAsReadMutation.mutate({ gameSessionUsersId });
  }, [gameSessionUsersId]);
  return <>PlayerNewsPage</>;
};
