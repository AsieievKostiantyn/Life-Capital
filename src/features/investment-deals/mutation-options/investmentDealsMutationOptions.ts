import { mutationOptions } from '@tanstack/react-query';

import { investmentDealsApi } from '../api';
import type {
  BuyInvestment,
  JoinInvestmentDealPayload,
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
};
