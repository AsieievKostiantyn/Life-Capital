import { mutationOptions } from '@tanstack/react-query';

import { playerStateApi } from '../api';
import type { SetPlayerStateByGameSessionAndUserIdPayload } from '../types';

export const playerStateMutationOptions = {
  setPlayerLegendMutationOption: mutationOptions({
    mutationFn: (variables: SetPlayerStateByGameSessionAndUserIdPayload) =>
      playerStateApi.setPlayerLegend(variables),
  }),

  setExpenseMutationOption: mutationOptions({
    mutationFn: (variables: SetPlayerStateByGameSessionAndUserIdPayload) =>
      playerStateApi.setExpense(variables),
  }),

  setBigExpenseMutationOption: mutationOptions({
    mutationFn: (variables: SetPlayerStateByGameSessionAndUserIdPayload) =>
      playerStateApi.setBigExpense(variables),
  }),

  markNewsAsRead: mutationOptions({
    mutationFn: ({ gameSessionUsersId }: { gameSessionUsersId: string }) =>
      playerStateApi.markNewsAsRead(gameSessionUsersId),
  }),
};
