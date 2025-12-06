import type { AppUser } from '@/shared/types';

export type UserOption = {
  value: AppUser['id'];
  label: AppUser['display_name'];
  email: AppUser['email'];
  avatar_url: AppUser['avatar_url'];
};

export type UserOptionsMap = Record<string, UserOption>;

export const mapUsersToOptions = (users: AppUser[]): UserOptionsMap => {
  const map: UserOptionsMap = {};

  users.forEach((u) => {
    map[u.id] = {
      value: u.id,
      label: u.display_name,
      email: u.email,
      avatar_url: u.avatar_url,
    };
  });

  return map;
};
