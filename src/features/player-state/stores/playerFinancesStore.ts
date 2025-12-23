import { create } from 'zustand';

import { getByPath, setByPathImmutable } from '@/shared/utils/path';

import { playerStateApi } from '../api';
import type { FinancesPath, FinancesState } from '../types';

export interface PlayerFinancesStore {
  initial: FinancesState;
  draft: FinancesState;

  isDirty: boolean;

  setInitial: (finances: FinancesState) => void;

  getValueByPath: <T = unknown>(path: FinancesPath) => T | undefined;
  setValueByPath: (path: FinancesPath, value: unknown) => void;

  save: (gameSessionUsersId: string) => Promise<void>;
}

export const usePlayerFinances = create<PlayerFinancesStore>((set, get) => ({
  initial: {} as FinancesState,
  draft: {} as FinancesState,
  isDirty: false,

  setInitial: (finances: FinancesState) => {
    set({
      initial: finances,
      draft: finances,
      isDirty: false,
    });
  },

  getValueByPath: (path) => {
    return getByPath(get().draft, path);
  },

  setValueByPath: (path, value) => {
    set((store) => {
      const nextDraft = setByPathImmutable(store.draft, path, value);

      return {
        draft: nextDraft,
        isDirty: nextDraft !== store.initial,
      };
    });
  },

  save: async (gameSessionUsersId) => {
    const { draft, initial } = get();
    if (draft === initial) return;

    await playerStateApi.setPlayerFinances({
      gameSessionUsersId,
      finances: draft,
    });

    set({
      initial: draft,
      isDirty: false,
    });
  },
}));
