import { create } from 'zustand';

import type { GameStateStore } from '../types';

export const useGameState = create<GameStateStore>((set) => ({
  newsList: [],

  setInitial: (data) => {
    set({
      currentInvestment: data.currentInvestment,
      newsList: data.newsList,
    });
  },
}));
