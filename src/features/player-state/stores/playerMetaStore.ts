import { create } from 'zustand';

interface PlayerMetaStore {
  playerLegendId: string | null;

  setInitial: (data: { playerLegendId: string }) => void;
}

export const usePlayerMeta = create<PlayerMetaStore>((set) => ({
  playerLegendId: null,

  setInitial: (data) => {
    set({
      playerLegendId: data.playerLegendId,
    });
  },
}));
