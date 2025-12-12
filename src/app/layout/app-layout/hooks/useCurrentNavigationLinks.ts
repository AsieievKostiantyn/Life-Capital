import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { gameSessionQueryOptions } from '@/features/game-session/query-options';

export const useCurrentNavigationLinks = () => {
  const { gameSessionId } = useParams();

  const isInGameSession = Boolean(gameSessionId);

  const { user: authUser } = useAuthStrict();

  const { data: gameSession } = useQuery({
    ...gameSessionQueryOptions.getGameSessionByIdQueryOption(
      gameSessionId || ''
    ),
    enabled: isInGameSession,
  });

  const isHost = Boolean(gameSession && authUser.id === gameSession?.hostId);
  const isPlayer = Boolean(gameSession && authUser.id !== gameSession?.hostId);

  return {
    isInGameSession,
    isHost,
    isPlayer,
  };
};
