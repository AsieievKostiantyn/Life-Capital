import { useMemo } from 'react';

import {
  type InvestmentDealFullView,
  MyInvestmentCard,
} from '@/features/investment-deals';
import { usePlayerMeta } from '@/features/player-state/stores';

interface MyInvestmentsListProps {
  deals: InvestmentDealFullView[];
}

export const MyInvestmentsList = ({ deals }: MyInvestmentsListProps) => {
  const investmentDealIds = usePlayerMeta((s) => s.investmentDealIds);

  const sortedDeals = useMemo(() => {
    const dealsMap = new Map(deals.map((deal) => [deal.dealId, deal]));

    const ordered = investmentDealIds
      .map((id) => dealsMap.get(id))
      .filter((deal): deal is InvestmentDealFullView => Boolean(deal));

    const activeDeals = ordered.filter((deal) => deal.status !== 'sold');

    const soldDeals = ordered.filter((deal) => deal.status === 'sold');

    return [...soldDeals, ...activeDeals].reverse();
  }, [deals, investmentDealIds]);

  return (
    <>
      {sortedDeals.map((deal) => (
        <MyInvestmentCard key={deal.dealId} deal={deal} />
      ))}
    </>
  );
};
