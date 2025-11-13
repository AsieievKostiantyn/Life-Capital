import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  writeBatch,
} from 'firebase/firestore';

import type { GameSessionShortInfo } from '@/features/auth/types/user';

import { db } from '@/shared/firebase';

import type { GameSession, Player } from '../types';

export const gameSessionApi = {
  createGameSession: async (
    sessionName: string,
    hostId: string,
    playersList: Player[]
  ) => {
    try {
      const batch = writeBatch(db);

      const ref = doc(collection(db, 'gameSessions'));

      const newSessionData: GameSession = {
        sessionName,
        hostId,
        id: ref.id,
        createdAt: Timestamp.now(),
        players: playersList,
      };

      batch.set(ref, newSessionData);

      const shortSessionData: GameSessionShortInfo = {
        sessionName,
        id: ref.id,
        createdAt: Timestamp.now(),
      };

      const allParticipantIds = [hostId, ...playersList.map((p) => p.id)];

      for (const userId of allParticipantIds) {
        const userRef = doc(db, 'users', userId);
        batch.update(userRef, {
          games: arrayUnion(shortSessionData),
        });
      }

      await batch.commit();

      return newSessionData;
    } catch (error) {
      console.error('Failed to create game session:', error);
      throw new Error('Failed to create game session');
    }
  },
};
