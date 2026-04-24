import { queryOptions } from '@tanstack/react-query';

import type { AppUser } from '@/shared/types';

import { userApi } from '../api';

export const userQueryOptions = {
  getUserByIdQueryOption: (userId: AppUser['id']) => {
    return queryOptions({
      queryKey: ['user', userId],
      queryFn: () => userApi.getUserById(userId),
    });
  },

  getAllUsersQueryOption: () => {
    return queryOptions({
      queryKey: ['users'],
      queryFn: () => userApi.getAllUsers(),
    });
  },
};
