import { useQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { usePlayerMeta } from '@/features/player-state/stores';

import { investmentDealsQueryOptions } from '../query-options';

export const usePlayerInvestmentDeals = () => {
  const { user } = useAuthStrict();
  const investmentDealIds = usePlayerMeta((s) => s.investmentDealIds);

  const { data } = useQuery(
    investmentDealsQueryOptions.getInvestmentDealsView(
      user.id,
      investmentDealIds
    )
  );

  console.log('data', data);
  return data;
};
