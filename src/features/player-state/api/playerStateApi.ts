import { TABLES } from '@/shared/constants';
import { supabase } from '@/shared/supabase';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import type {
  PlayerState,
  SetBigExpensePayload,
  SetExpensePayload,
  SetPlayerFinancesPayload,
  SetPlayerStatePayload,
} from '../types';

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

  setPlayerFinances: async ({
    gameSessionUsersId,
    finances,
  }: SetPlayerFinancesPayload) => {
    const { error } = await supabase
      .from('player_state')
      .update({ finances })
      .eq('game_session_users_id', gameSessionUsersId);

    if (error) throw error;
  },

  setExpense: async ({ gameSessionId, userId }: SetExpensePayload) => {
    const { error } = await supabase.rpc('set_expense', {
      p_game_session_id: gameSessionId,
      p_user_id: userId,
    });

    if (error) throw error;
  },

  setBigExpense: async ({ gameSessionId, userId }: SetBigExpensePayload) => {
    const { error } = await supabase.rpc('set_big_expense', {
      p_game_session_id: gameSessionId,
      p_user_id: userId,
    });

    if (error) throw error;
  },
};
