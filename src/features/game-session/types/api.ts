import type { AppUser } from '@/shared/types';

export type ParticipantId = AppUser['id'];

export type CreateGameSessionVariables = {
  sessionName: string;
  hostId: AppUser['id'];
  participantIds: ParticipantId[];
};
