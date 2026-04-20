import { useSuspenseQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { useGameSessionId } from '@/features/game-session/hooks';

import { gameSessionUsersQueryOptions } from '../query-options';

export const useGameSessionUsersId = () => {
  const gameSessionId = useGameSessionId();
  const { user } = useAuthStrict();

  const { data: gameSessionUsersId } = useSuspenseQuery(
    gameSessionUsersQueryOptions.getGameSessionUsersIdQueryOption(
      gameSessionId,
      user.id
    )
  );

  if (!gameSessionUsersId)
    throw new Error('This game session or user does not exist');

  return gameSessionUsersId;
};
