import { mutationOptions } from '@tanstack/react-query';

import { playerStateApi } from '../api';
import type { SetPlayerStatePayload } from '../types';

export const playerStateMutationOptions = {
  setPlayerLegendMutationOption: mutationOptions({
    mutationFn: (variables: SetPlayerStatePayload) =>
      playerStateApi.setPlayerLegend(variables),
  }),
};
