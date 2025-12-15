import { queryOptions } from '@tanstack/react-query';

import { playerStateApi } from '../api';

export const playerStateQueryOptions = {
  getPlayerStateQueryOption: (gameSessionUsersId: string) => {
    return queryOptions({
      queryKey: ['game-session-users', gameSessionUsersId],
      queryFn: () => playerStateApi.getPlayerState(gameSessionUsersId),
    });
  },
};
