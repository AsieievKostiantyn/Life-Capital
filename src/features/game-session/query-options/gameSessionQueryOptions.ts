import { queryOptions } from '@tanstack/react-query';

import type { AppUser } from '@/shared/types';

import { gameSessionApi } from '../api';
import type { GameSession } from '../types';

export const gameSessionQueryOptions = {
  getSessionsForUserQueryOption: (userId: AppUser['id']) => {
    return queryOptions({
      queryKey: ['game-sessions', userId],
      queryFn: () => gameSessionApi.getGameSessionsForUser(userId),
    });
  },

  getGameSessionByIdQueryOption: (gameSessionId: GameSession['id']) => {
    return queryOptions({
      queryKey: ['game-sessions', gameSessionId],
      queryFn: () => gameSessionApi.getGameSessionById(gameSessionId),
    });
  },

  getGameSessionOverview: (gameSessionId: GameSession['id']) => {
    return queryOptions({
      queryKey: ['game-session-overview', gameSessionId],
      queryFn: () => gameSessionApi.getGameSessionOverview(gameSessionId),
      staleTime: 5 * 60 * 1000,
    });
  },
};
