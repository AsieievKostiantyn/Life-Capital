import { queryOptions } from '@tanstack/react-query';

import { investmentDealsApi } from '../api';

export const investmentDealsQueryOptions = {
  getInvestmentDealsView: (userId: string, investmentDealIds: string[]) =>
    queryOptions({
      queryKey: ['deals', userId, investmentDealIds],
      enabled: investmentDealIds.length > 0,
      queryFn: () =>
        investmentDealsApi.getInvestmentDealsView(investmentDealIds),
    }),
};
