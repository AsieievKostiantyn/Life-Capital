import {
  InvestmentDealCard,
  type InvestmentDealFullView,
} from '@/features/investment-deals';

interface InvestmentDealsListProps {
  deals: InvestmentDealFullView[];
}

export const InvestmentDealsList = ({ deals }: InvestmentDealsListProps) => {
  return (
    <>
      {deals.map((deal) => (
        <InvestmentDealCard key={deal.dealId} deal={deal} />
      ))}
    </>
  );
};
