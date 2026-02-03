import { mutationOptions } from '@tanstack/react-query';

import { investmentDealsApi } from '../api';
import type {
  BuyInvestment,
  ConfirmDealPayload,
  ConfirmParticipantNotePayload,
  JoinInvestmentDealPayload,
  RemoveParticipantPayload,
  SetDealOwnerPayload,
  StartInvestmentDealPayload,
} from '../types/api';

export const investmentDealsMutationOptions = {
  startInvestmentDeal: mutationOptions({
    mutationFn: (payload: StartInvestmentDealPayload) =>
      investmentDealsApi.startInvestmentDeal(payload),
  }),

  joinInvestmentDeal: mutationOptions({
    mutationFn: (payload: JoinInvestmentDealPayload) =>
      investmentDealsApi.joinInvestmentDeal(payload),
  }),

  buyInvestment: mutationOptions({
    mutationFn: (payload: BuyInvestment) =>
      investmentDealsApi.buyInvestment(payload),
  }),

  confirmParticipantNote: mutationOptions({
    mutationFn: (payload: ConfirmParticipantNotePayload) =>
      investmentDealsApi.confirmParticipantNote(payload),
  }),

  removeParticipant: mutationOptions({
    mutationFn: (payload: RemoveParticipantPayload) =>
      investmentDealsApi.removeParticipant(payload),
  }),

  confirmDeal: mutationOptions({
    mutationFn: (payload: ConfirmDealPayload) =>
      investmentDealsApi.confirmDeal(payload),
  }),

  setDealOwner: mutationOptions({
    mutationFn: (payload: SetDealOwnerPayload) =>
      investmentDealsApi.setDealOwner(payload),
  }),
};
