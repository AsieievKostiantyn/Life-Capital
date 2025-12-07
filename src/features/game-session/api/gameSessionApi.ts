import { supabase } from '@/shared/supabase';

import type { CreateGameSessionPayload, GameSession } from '../types';

export const gameSessionApi = {
  createGameSession: async (
    payload: CreateGameSessionPayload
  ): Promise<GameSession> => {
    const { data, error } = await supabase.functions.invoke(
      'create-game-session',
      {
        body: payload,
      }
    );

    if (error) throw error;
    return data.session;
  },
};
