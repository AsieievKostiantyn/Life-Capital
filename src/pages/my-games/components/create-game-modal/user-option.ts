import type { AppUser } from '@/shared/types';

export type UserOption = {
  value: string;
  label: string;
  email: string;
};

export type UserOptionsMap = Record<string, UserOption>;

export const mapUsersToOptions = (users: AppUser[]): UserOptionsMap => {
  const map: UserOptionsMap = {};

  users.forEach((u) => {
    map[u.uid] = {
      value: u.uid,
      label: u.displayName,
      email: u.email,
    };
  });

  return map;
};
