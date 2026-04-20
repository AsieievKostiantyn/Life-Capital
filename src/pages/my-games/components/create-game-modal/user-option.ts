import type { AppUser } from '@/shared/types';

export type UserOption = {
  value: AppUser['id'];
  label: AppUser['displayName'];
  email: AppUser['email'];
  avatar_url: AppUser['avatarUrl'];
};

export type UserOptionsMap = Record<string, UserOption>;

export const mapUsersToOptions = (users: AppUser[]): UserOptionsMap => {
  const map: UserOptionsMap = {};

  users.forEach((u) => {
    map[u.id] = {
      value: u.id,
      label: u.displayName,
      email: u.email,
      avatar_url: u.avatarUrl,
    };
  });

  return map;
};
