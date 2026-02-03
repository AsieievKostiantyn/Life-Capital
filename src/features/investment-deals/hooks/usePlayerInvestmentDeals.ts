import { useQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { usePlayerMeta } from '@/features/player-state/stores';

import { investmentDealsQueryOptions } from '../query-options';
import type { InvestmentDealFullView } from '../types';

export const usePlayerInvestmentDeals = () => {
  const { user } = useAuthStrict();
  const investmentDealIds = usePlayerMeta((s) => s.investmentDealIds);

  const { data } = useQuery(
    investmentDealsQueryOptions.getInvestmentDealsView(
      user.id,
      investmentDealIds
    )
  );

  return data ? data : ([] as InvestmentDealFullView[]);
};
