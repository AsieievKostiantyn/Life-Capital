import { useAuthStrict } from '@/features/auth';

import type { InvestmentDealFullView } from '../types';

export type DealPermissions = {
  ownerId: string;
  isOwner: boolean;
  isNoteBelongToUser: (userId: string) => boolean;
};

export const useDealPermissions = (
  deal: InvestmentDealFullView
): DealPermissions => {
  const { user } = useAuthStrict();

  const isOwner = deal.ownerId === user.id;

  return {
    ownerId: deal.ownerId,
    isOwner,
    isNoteBelongToUser: (userId) => userId === user.id,
  };
};
