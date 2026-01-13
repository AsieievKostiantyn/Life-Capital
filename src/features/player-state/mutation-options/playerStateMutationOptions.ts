import { mutationOptions } from '@tanstack/react-query';

import { playerStateApi } from '../api';
import type {
  SetBigExpensePayload,
  SetExpensePayload,
  SetPlayerStatePayload,
} from '../types';

export const playerStateMutationOptions = {
  setPlayerLegendMutationOption: mutationOptions({
    mutationFn: (variables: SetPlayerStatePayload) =>
      playerStateApi.setPlayerLegend(variables),
  }),

  setExpenseMutationOption: mutationOptions({
    mutationFn: (variables: SetExpensePayload) =>
      playerStateApi.setExpense(variables),
  }),

  setBigExpenseMutationOption: mutationOptions({
    mutationFn: (variables: SetBigExpensePayload) =>
      playerStateApi.setBigExpense(variables),
  }),
};
