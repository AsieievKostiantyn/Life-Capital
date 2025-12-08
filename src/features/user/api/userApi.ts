import { supabase } from '@/shared/supabase';
import type { AppUser } from '@/shared/types';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

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
};
