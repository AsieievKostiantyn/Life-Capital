import { supabase } from '@/shared/supabase';
import type { AppUser } from '@/shared/types';

export const userApi = {
  getAllUsers: async (): Promise<AppUser[]> => {
    const { data, error } = await supabase.from('users').select('*');

    if (error) throw error;
    return data;
  },
};
