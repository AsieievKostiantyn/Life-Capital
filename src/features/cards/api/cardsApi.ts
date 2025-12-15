import { TABLES } from '@/shared/constants';
import { supabase } from '@/shared/supabase';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import type { CardsRow } from '../types/cardTypes';

export const cardsApi = {
  getCardById: async (cardId: string) => {
    const { data, error } = await supabase
      .from(TABLES.cards)
      .select('*')
      .eq('id', cardId)
      .single();

    if (error) throw error;
    return mapSnakeToCamel(data) as CardsRow;
  },
};
