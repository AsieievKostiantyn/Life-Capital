import { TABLES } from '@/shared/constants';
import { supabase } from '@/shared/supabase';
import type { AppUser } from '@/shared/types';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import type {
  CreateGameSessionVariables,
  GameSession,
  GameSessionOverviewView,
} from '../types';

export const gameSessionApi = {
  createGameSession: async (
    payload: CreateGameSessionVariables
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

  getGameSessionsForUser: async (
    userId: AppUser['id']
  ): Promise<GameSession[]> => {
    const { data, error } = await supabase
      .from(TABLES.gameSessionUsers)
      .select(
        `
        ${TABLES.gameSessions} (*)
      `
      )
      .eq('user_id', userId);

    if (error) throw error;

    return data.map((row) => {
      const session = row.game_sessions;
      return mapSnakeToCamel(session);
    });
  },

  getGameSessionById: async (
    gameSessionId: GameSession['id']
  ): Promise<GameSession> => {
    const { data, error } = await supabase
      .from(TABLES.gameSessions)
      .select('*')
      .eq('id', gameSessionId)
      .single();

    if (error) throw error;
    return mapSnakeToCamel(data);
  },

  getGameSessionOverview: async (gameSessionId: string) => {
    const { data, error } = await supabase.rpc('get_game_session_overview', {
      p_game_session_id: gameSessionId,
    });

    if (error) throw error;
    return mapSnakeToCamel(data) as GameSessionOverviewView;
  },
};
