import { TABLES } from '@/shared/constants';
import { supabase } from '@/shared/supabase';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import type { PlayerState, SetPlayerStatePayload } from '../types';

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

  setPlayerLegend: async ({ gameSessionId, userId }: SetPlayerStatePayload) => {
    const { error } = await supabase.rpc('set_player_legend', {
      p_game_session_id: gameSessionId,
      p_user_id: userId,
    });

    if (error) throw error;
  },
};
