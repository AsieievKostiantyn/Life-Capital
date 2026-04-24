import { supabase } from '@/shared/supabase';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import type { InvestmentDealFullView } from '../types';
import type {
  BuyInvestment,
  ConfirmDealPayload,
  ConfirmParticipantNotePayload,
  JoinInvestmentDealPayload,
  RemoveParticipantPayload,
  SellInvestmentPayload,
  SetDealOwnerPayload,
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
    return mapSnakeToCamel(data) as InvestmentDealFullView[];
  },

  confirmParticipantNote: async ({
    dealId,
    userId,
    notes,
  }: ConfirmParticipantNotePayload) => {
    const { error } = await supabase.rpc('confirm_participant_note', {
      p_deal_id: dealId,
      p_user_id: userId,
      p_notes: notes,
    });

    if (error) throw error;
  },

  removeParticipant: async ({
    dealId,
    targetUserId,
  }: RemoveParticipantPayload) => {
    const { error } = await supabase.rpc('remove_participant', {
      p_deal_id: dealId,
      p_target_user_id: targetUserId,
    });

    if (error) throw error;
  },

  confirmDeal: async ({ dealId }: ConfirmDealPayload) => {
    const { error } = await supabase.rpc('confirm_deal', {
      p_deal_id: dealId,
    });

    if (error) throw error;
  },

  setDealOwner: async ({ dealId, newOwnerId }: SetDealOwnerPayload) => {
    const { error } = await supabase.rpc('set_deal_owner', {
      p_deal_id: dealId,
      p_new_owner_id: newOwnerId,
    });

    if (error) throw error;
  },

  sellInvestment: async ({ dealId }: SellInvestmentPayload) => {
    const { error } = await supabase.rpc('sell_investment', {
      p_deal_id: dealId,
    });

    if (error) throw error;
  },
};
