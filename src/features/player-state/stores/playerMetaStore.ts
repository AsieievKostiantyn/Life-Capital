import { create } from 'zustand';

import type { PlayerState } from '../types';

interface PlayerMetaStore {
  playerLegendId: string | null;
  expensesList: string[];
  metadata: PlayerState['metadata'];
  investmentDealIds: PlayerState['investmentDealIds'];

  setInitial: (data: {
    playerLegendId: string;
    expensesList: string[];
    metadata: PlayerState['metadata'];
    investmentDealIds: PlayerState['investmentDealIds'];
  }) => void;
}

export const usePlayerMeta = create<PlayerMetaStore>((set) => ({
  playerLegendId: null,
  expensesList: [],
  metadata: {},
  investmentDealIds: [],

  setInitial: (data) => {
    set({
      playerLegendId: data.playerLegendId,
      expensesList: data.expensesList,
      metadata: data.metadata,
      investmentDealIds: data.investmentDealIds,
    });
  },
}));
