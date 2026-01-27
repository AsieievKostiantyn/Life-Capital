import type { GameSession } from '@/features/game-session/types';

import { supabase } from '@/shared/supabase';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import type { GameState } from '../types';
import type { SetCurrentInvestmentPayload } from '../types/api';

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

  setCurrentInvestment: async ({
    gameSessionId,
    ownerId,
    isInvestmentBig,
  }: SetCurrentInvestmentPayload) => {
    const fn = isInvestmentBig ? 'set_big_investment' : 'set_investment';

    const { error } = await supabase.rpc(fn, {
      p_game_session_id: gameSessionId,
      p_owner_id: ownerId,
    });

    if (error) throw error;
  },
};
