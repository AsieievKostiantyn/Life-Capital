import { TABLES } from '@/shared/constants';
import { supabase } from '@/shared/supabase';
import type { AppUser } from '@/shared/types';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import type { UpdateUserRoleVariables } from '../types';

export const userApi = {
  getUserById: async (userId: string): Promise<AppUser> => {
    const { data, error } = await supabase
      .from(TABLES.users)
      .select('*')
      .eq('id', userId)
      .single();

    console.log('get by id data', data);

    if (error) throw error;
    return mapSnakeToCamel(data);
  },

  getAllUsers: async (): Promise<AppUser[]> => {
    const { data, error } = await supabase.from(TABLES.users).select('*');

    if (error) throw error;
    return data.map((user) => mapSnakeToCamel(user));
  },

  updataUserRole: async ({
    newRole,
    userId,
  }: UpdateUserRoleVariables): Promise<AppUser> => {
    const { data, error } = await supabase
      .from(TABLES.users)
      .update({ role: newRole })
      .eq('id', userId)
      .select()
      .single();

    console.log('updated data', data);

    if (error) throw error;
    return mapSnakeToCamel(data);
  },
};
