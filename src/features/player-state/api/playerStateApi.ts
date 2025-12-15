import { TABLES } from '@/shared/constants';
import { supabase } from '@/shared/supabase';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import type { PlayerState } from '../types';

export const playerStateApi = {
  getPlayerState: async (gameSessionUsersId: string) => {
    const { data, error } = await supabase
      .from(TABLES.playerState)
      .select('*')
      .eq('game_session_users_id', gameSessionUsersId)
      .single();

    if (error) throw error;
    return mapSnakeToCamel(data) as PlayerState;
  },
};
