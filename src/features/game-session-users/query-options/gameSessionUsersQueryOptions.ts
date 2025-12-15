import { queryOptions } from '@tanstack/react-query';

import type { GameSession } from '@/features/game-session/types';

import type { AppUser } from '@/shared/types';

import { gameSessionUsersApi } from '../api';

export const gameSessionUsersQueryOptions = {
  getGameSessionUsersIdQueryOption: (
    gameSessionId: GameSession['id'],
    userId: AppUser['id']
  ) => {
    return queryOptions({
      queryKey: ['game-session-users', gameSessionId, userId],
      queryFn: () =>
        gameSessionUsersApi.getGameSessionUsersId(gameSessionId, userId),
    });
  },
};
