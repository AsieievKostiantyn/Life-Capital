import { queryOptions } from '@tanstack/react-query';

import type { AppUser } from '@/shared/types';

import { gameSessionApi } from '../api';

export const gameSessionQueryOptions = {
  getSessionsForUserQueryOption: (userId: AppUser['id']) => {
    return queryOptions({
      queryKey: ['game-sessions', userId],
      queryFn: () => gameSessionApi.getSessionsForUser(userId),
    });
  },
};
