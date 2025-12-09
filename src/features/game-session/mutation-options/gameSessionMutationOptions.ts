import { mutationOptions } from '@tanstack/react-query';

import { gameSessionApi } from '../api';
import type { CreateGameSessionPayload } from '../types';

export const gameSessionMutationOptions = {
  createGameSessionMutationOptions: mutationOptions({
    mutationFn: (payload: CreateGameSessionPayload) =>
      gameSessionApi.createGameSession(payload),
    onSuccess(_, payload, __, context) {
      context.client.invalidateQueries({
        queryKey: ['game-sessions', payload.hostId],
      });
    },
  }),
};
