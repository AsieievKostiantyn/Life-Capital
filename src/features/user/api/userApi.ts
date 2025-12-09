import { supabase } from '@/shared/supabase';
import type { AppUser } from '@/shared/types';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import type { UpdateUserRoleVariables } from '../types';

export const userApi = {
  getUserById: async (userId: string): Promise<AppUser> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return mapSnakeToCamel(data);
  },

  getAllUsers: async (): Promise<AppUser[]> => {
    const { data, error } = await supabase.from('users').select('*');

    if (error) throw error;
    return data.map((user) => mapSnakeToCamel(user));
  },

  updataUserRole: async ({
    newRole,
    userId,
  }: UpdateUserRoleVariables): Promise<AppUser> => {
    const { data, error } = await supabase
      .from('users')
      .update({ role: newRole })
      .eq('id', userId)
      .select();

    if (error) throw error;
    console.log('updatedUser from api layer', data);
    console.log(
      'updated and mapped User from api layer',
      mapSnakeToCamel(data)
    );
    return mapSnakeToCamel(data);
  },
};
