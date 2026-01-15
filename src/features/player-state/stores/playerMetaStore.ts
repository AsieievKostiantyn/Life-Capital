import { create } from 'zustand';

import type { PlayerState } from '../types';

interface PlayerMetaStore {
  playerLegendId: string | null;
  expensesList: string[];
  metadata: PlayerState['metadata'];

  setInitial: (data: {
    playerLegendId: string;
    expensesList: string[];
    metadata: PlayerState['metadata'];
  }) => void;
}

export const usePlayerMeta = create<PlayerMetaStore>((set) => ({
  playerLegendId: null,
  expensesList: [],
  metadata: {},

  setInitial: (data) => {
    set({
      playerLegendId: data.playerLegendId,
      expensesList: data.expensesList,
      metadata: data.metadata,
    });
  },
}));
