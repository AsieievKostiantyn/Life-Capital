import { supabase } from '@/shared/supabase';
import type { AppUser } from '@/shared/types';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

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
    return mapSnakeToCamel(JSON.parse(data));
  },

  getSessionsForUser: async (userId: AppUser['id']): Promise<GameSession[]> => {
    const { data, error } = await supabase
      .from('game_session_users')
      .select(
        `
        game_sessions (*)
      `
      )
      .eq('user_id', userId);

    if (error) throw error;

    return data.map((row) => {
      const session = row.game_sessions;
      return mapSnakeToCamel(session);
    });
  },
};
