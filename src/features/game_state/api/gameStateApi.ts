import type { GameSession } from '@/features/game-session/types';

import { supabase } from '@/shared/supabase';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import type { GameState } from '../types';

export const gameStateApi = {
  getGameState: async (gameSessionId: GameSession['id']) => {
    const { data, error } = await supabase
      .from('game_state')
      .select('*')
      .eq('game_session_id', gameSessionId)
      .single();

    if (error) throw error;
    return mapSnakeToCamel(data) as GameState;
  },

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
