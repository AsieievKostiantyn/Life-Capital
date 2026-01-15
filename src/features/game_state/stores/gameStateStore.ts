import { create } from 'zustand';

import type { GameStateStore } from '../types';

export const useGameState = create<GameStateStore>((set) => ({
  newsList: [],

  setInitial: (data) => {
    set({
      newsList: data.newsList,
    });
  },
}));
