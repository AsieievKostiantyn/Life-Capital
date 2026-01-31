import type { InvestmentCardRow } from '@/features/cards/types/cardTypes';

export type InvestmentDeal = {
  id: string;
  gameSessionId: string;
  cardId: string;
  ownerId: string;
  status: 'negotiation' | 'confirmed';
  createdAt: string;
};

export type InvestmentDealFullView = {
  dealId: string;
  gameSessionId: string;
  ownerId: string;
  status: 'negotiation' | 'confirmed';
  createdAt: string;
  card: InvestmentCardRow;
  participants: DealParticipant[];
};
type DealParticipant = {
  userId: string;
  displayName: string;
  note: string;
  isNoteConfirmed: boolean;
};
