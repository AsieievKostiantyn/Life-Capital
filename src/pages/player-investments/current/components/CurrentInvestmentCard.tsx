import { Button } from '@mantine/core';

import { useAuthStrict } from '@/features/auth';
import { useGameState } from '@/features/game_state/stores';
import { type Investment, InvestmentCardBase } from '@/features/investments';

interface CurrentInvestmentCardProps {
  investment: Investment;
}

export const CurrentInvestmentCard = ({
  investment,
}: CurrentInvestmentCardProps) => {
  return <InvestmentCardBase investment={investment} actions={Actions()} />;
};

const Actions = () => {
  const currentInvestment = useGameState((s) => s.currentInvestment);
  const { user } = useAuthStrict();

  const isPartnershipButtonShown =
    currentInvestment?.ownerId === user.id && !currentInvestment.isAllowedToBuy;

  const isInvestButtonShown =
    currentInvestment?.isAllowedToBuy || currentInvestment?.ownerId === user.id;

  return (
    <>
      <Button variant="default" hidden={!isInvestButtonShown}>
        Інвестувати
      </Button>
      <Button variant="default" hidden={!isPartnershipButtonShown}>
        Партнерство
      </Button>
    </>
  );
};
