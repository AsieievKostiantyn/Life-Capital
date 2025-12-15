import type { GameSession } from '@/features/game-session/types';

import { TABLES } from '@/shared/constants';
import { supabase } from '@/shared/supabase';
import type { AppUser } from '@/shared/types';

export const gameSessionUsersApi = {
  getGameSessionUsersId: async (
    gameSessionId: GameSession['id'],
    userId: AppUser['id']
  ) => {
    const { data, error } = await supabase
      .from(TABLES.gameSessionUsers)
      .select('id')
      .eq('user_id', userId)
      .eq('session_id', gameSessionId)
      .single();

    if (error) throw error;
    return data.id as string;
  },
};
