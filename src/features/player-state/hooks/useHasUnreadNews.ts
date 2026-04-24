import { useGameState } from '@/features/game_state/stores';

import { usePlayerMeta } from '../stores';

export const useHasUnreadNews = () => {
  const lastSeenNewsAt = usePlayerMeta((s) => s.metadata.lastSeenNewsAt);
  const lastNew = useGameState((s) => s.newsList.at(-1));

  if (!lastSeenNewsAt || !lastNew) return false;

  if (Date.parse(lastSeenNewsAt) < Date.parse(lastNew.appearAt)) return true;

  return false;
};
