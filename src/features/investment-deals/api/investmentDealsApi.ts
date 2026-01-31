import { supabase } from '@/shared/supabase';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import type { InvestmentDealFullView } from '../types';
import type {
  BuyInvestment,
  JoinInvestmentDealPayload,
  StartInvestmentDealPayload,
} from '../types/api';

export const investmentDealsApi = {
  startInvestmentDeal: async ({
    gameSessionId,
    playerId,
    investmentCardId,
  }: StartInvestmentDealPayload) => {
    const { error } = await supabase.rpc('start_investment_deal', {
      p_game_session_id: gameSessionId,
      p_user_id: playerId,
      p_card_id: investmentCardId,
    });

    if (error) throw error;
  },

  joinInvestmentDeal: async ({
    gameSessionId,
    playerId,
    investmentCardId,
  }: JoinInvestmentDealPayload) => {
    const { error } = await supabase.rpc('join_investment_deal', {
      p_game_session_id: gameSessionId,
      p_card_id: investmentCardId,
      p_user_id: playerId,
    });

    if (error) throw error;
  },

  buyInvestment: async ({
    gameSessionId,
    playerId,
    investmentCardId,
  }: BuyInvestment) => {
    const { error } = await supabase.rpc('buy_investment', {
      p_game_session_id: gameSessionId,
      p_card_id: investmentCardId,
      p_user_id: playerId,
    });

    if (error) throw error;
  },

  getInvestmentDealsView: async (dealIds: string[]) => {
    const { data, error } = await supabase.rpc('get_investment_deals', {
      p_deal_ids: dealIds,
    });

    if (error) throw error;
    return mapSnakeToCamel(data) as InvestmentDealFullView;
  },
};
