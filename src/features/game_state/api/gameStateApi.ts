import type { GameSession } from '@/features/game-session/types';

import { supabase } from '@/shared/supabase';

export const gameStateApi = {
  setDemandToNewsList: async (gameSessionId: GameSession['id']) => {
    const { error } = await supabase.rpc('set_demand', {
      p_game_session_id: gameSessionId,
    });

    if (error) throw error;
  },

  setEventToNewsList: async (gameSessionId: GameSession['id']) => {
    const { error } = await supabase.rpc('set_event', {
      p_game_session_id: gameSessionId,
    });

    if (error) throw error;
  },
};
