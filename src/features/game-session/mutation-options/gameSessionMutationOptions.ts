import { mutationOptions } from '@tanstack/react-query';

import { gameSessionApi } from '../api';
import { gameSessionQueryOptions } from '../query-options';
import type { CreateGameSessionVariables } from '../types';

export const gameSessionMutationOptions = {
  createGameSessionMutationOptions: mutationOptions({
    mutationFn: (variables: CreateGameSessionVariables) =>
      gameSessionApi.createGameSession(variables),
    onSuccess(_, variables, __, context) {
      context.client.invalidateQueries({
        queryKey: gameSessionQueryOptions.getSessionsForUserQueryOption(
          variables.hostId
        ).queryKey,
      });
    },
  }),
};
