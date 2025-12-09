import type { AppUser } from '@/shared/types';

export type UpdateUserRoleVariables = {
  newRole: AppUser['role'];
  userId: AppUser['id'];
};
