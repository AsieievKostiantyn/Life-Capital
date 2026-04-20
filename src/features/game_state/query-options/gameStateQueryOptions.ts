import { queryOptions } from '@tanstack/react-query';

import type { GameSession } from '@/features/game-session/types';

import { gameStateApi } from '../api';

export const gameStateQueryOptions = {
  getGameState: (gameSessionId: GameSession['id']) =>
    queryOptions({
      queryKey: ['game-state', gameSessionId],
      queryFn: () => gameStateApi.getGameState(gameSessionId),
    }),
};
