import type { Timestamp } from 'firebase/firestore';

export type Player = {
  id: string;
  displayName: string;
};

export type GameSession = {
  id: string;
  sessionName: string;
  createdAt: Timestamp;
  hostId: string;
  status: 'active' | 'archive';
  players: Player[];
};
