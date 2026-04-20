import { mutationOptions } from '@tanstack/react-query';

import { userApi } from '../api';
import { userQueryOptions } from '../query-options';
import type { UpdateUserRoleVariables } from '../types';

export const userMutationOptions = {
  updataUserRoleMutationOptions: mutationOptions({
    mutationFn: (variables: UpdateUserRoleVariables) =>
      userApi.updataUserRole(variables),
    onSuccess: async (_, variables, __, context) => {
      await context.client.invalidateQueries({
        queryKey: userQueryOptions.getUserByIdQueryOption(variables.userId)
          .queryKey,
      });
    },
  }),
};
