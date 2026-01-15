import { mutationOptions } from '@tanstack/react-query';

import type { GameSession } from '@/features/game-session/types';

import { gameStateApi } from '../api';

export const gameStateMutationOptions = {
  setDemandToNewsList: mutationOptions({
    mutationFn: (gameSessionId: GameSession['id']) =>
      gameStateApi.setDemandToNewsList(gameSessionId),
  }),

  setEventToNewsList: mutationOptions({
    mutationFn: (gameSessionId: GameSession['id']) =>
      gameStateApi.setEventToNewsList(gameSessionId),
  }),
};
