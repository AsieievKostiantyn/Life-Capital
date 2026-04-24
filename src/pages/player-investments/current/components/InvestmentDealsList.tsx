import { useMemo } from 'react';

import {
  InvestmentDealCard,
  type InvestmentDealFullView,
} from '@/features/investment-deals';
import { usePlayerMeta } from '@/features/player-state/stores';

interface InvestmentDealsListProps {
  deals: InvestmentDealFullView[];
}

export const InvestmentDealsList = ({ deals }: InvestmentDealsListProps) => {
  const investmentDealIds = usePlayerMeta((s) => s.investmentDealIds);

  const sortedDeals = useMemo(() => {
    const dealsMap = new Map(deals.map((deal) => [deal.dealId, deal]));

    return investmentDealIds
      .map((id) => dealsMap.get(id))
      .filter((deal): deal is InvestmentDealFullView => Boolean(deal))
      .reverse();
  }, [deals, investmentDealIds]);

  return (
    <>
      {sortedDeals.map((deal) => (
        <InvestmentDealCard key={deal.dealId} deal={deal} />
      ))}
    </>
  );
};
