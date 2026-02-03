import { useMutation } from '@tanstack/react-query';

import { investmentDealsApi } from '../api';
import type {
  ConfirmDealPayload,
  ConfirmParticipantNotePayload,
  RemoveParticipantPayload,
  SetDealOwnerPayload,
} from '../types/api';

export type DealMutations = ReturnType<typeof useDealMutations>;

export const useDealMutations = (dealId: string) => {
  const confirmParticipantNoteMutation = useMutation({
    mutationFn: (payload: Omit<ConfirmParticipantNotePayload, 'dealId'>) =>
      investmentDealsApi.confirmParticipantNote({
        dealId,
        ...payload,
      }),
  });

  const removeParticipantMutation = useMutation({
    mutationFn: (payload: Omit<RemoveParticipantPayload, 'dealId'>) =>
      investmentDealsApi.removeParticipant({
        dealId,
        ...payload,
      }),
  });

  const confirmDealMutation = useMutation({
    mutationFn: (payload: Omit<ConfirmDealPayload, 'dealId'>) =>
      investmentDealsApi.confirmDeal({
        dealId,
        ...payload,
      }),
  });

  const setDealOwner = useMutation({
    mutationFn: (payload: Omit<SetDealOwnerPayload, 'dealId'>) =>
      investmentDealsApi.setDealOwner({
        dealId,
        ...payload,
      }),
  });

  return {
    confirmParticipantNoteMutation,
    removeParticipantMutation,
    confirmDealMutation,
    setDealOwner,
  };
};
