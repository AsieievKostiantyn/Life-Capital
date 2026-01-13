import { create } from 'zustand';

interface PlayerMetaStore {
  playerLegendId: string | null;
  expensesList: string[];

  setInitial: (data: {
    playerLegendId: string;
    expensesList: string[];
  }) => void;
}

export const usePlayerMeta = create<PlayerMetaStore>((set) => ({
  playerLegendId: null,
  expensesList: [],

  setInitial: (data) => {
    set({
      playerLegendId: data.playerLegendId,
      expensesList: data.expensesList,
    });
  },
}));
