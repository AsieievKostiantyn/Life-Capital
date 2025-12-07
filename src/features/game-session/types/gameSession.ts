import type { AppUser } from '@/shared/types';

export type ParticipantId = string;

export type GameSession = {
  id: string;
  sessionName: string;
  hostId: AppUser['id'];
  status: 'active' | 'archive';
  createdAt: string;
};

export type CreateGameSessionPayload = {
  sessionName: string;
  hostId: AppUser['id'];
  participantIds: ParticipantId[];
};
