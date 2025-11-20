import type { Timestamp } from 'firebase/firestore';

export type GameSessionShortInfo = {
  id: string;
  sessionName: string;
  createdAt: Timestamp;
  status: 'active' | 'archive';
};

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'player' | 'host';
  games: GameSessionShortInfo[];
}
