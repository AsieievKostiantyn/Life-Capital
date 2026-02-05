import { useEffect } from 'react';

import { useGameSessionUsersId } from '@/features/game-session-users/hooks';
import { usePlayerFinances } from '@/features/player-state/stores';

export const useSaveHotKey = () => {
  const isDirty = usePlayerFinances((s) => s.isDirty);
  const save = usePlayerFinances((s) => s.save);
  const gameSessionUsersId = useGameSessionUsersId();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const isS = e.key.toLowerCase() === 's';

      if (isCtrlOrCmd && isShift && isS) {
        e.preventDefault();

        if (!isDirty) return;

        save(gameSessionUsersId);
      }
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [isDirty]);
};
