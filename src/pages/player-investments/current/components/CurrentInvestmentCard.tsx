import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { useGameSessionId } from '@/features/game-session/hooks';
import { useGameState } from '@/features/game_state/stores';
import { investmentDealsMutationOptions } from '@/features/investment-deals';
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

  const gameSessionId = useGameSessionId();
  const { user } = useAuthStrict();

  const startInvestmentDealMutation = useMutation(
    investmentDealsMutationOptions.startInvestmentDeal
  );

  const joinInvestmentDealMutation = useMutation(
    investmentDealsMutationOptions.joinInvestmentDeal
  );

  const buyInvestmentMutation = useMutation(
    investmentDealsMutationOptions.buyInvestment
  );

  if (!currentInvestment) return;

  const handleStartPartnership = () => {
    startInvestmentDealMutation.mutate({
      gameSessionId: gameSessionId,
      playerId: user.id,
      investmentCardId: currentInvestment.cardId,
    });
  };

  const handleJoinInvestmentDeal = () => {
    joinInvestmentDealMutation.mutate({
      gameSessionId: gameSessionId,
      playerId: user.id,
      investmentCardId: currentInvestment.cardId,
    });
  };

  const handleBuyInvestment = () => {
    buyInvestmentMutation.mutate({
      gameSessionId: gameSessionId,
      playerId: user.id,
      investmentCardId: currentInvestment.cardId,
    });
  };

  const isPartnershipButtonShown =
    currentInvestment.ownerId === user.id && !currentInvestment.isAllowedToDeal;

  const isInvestButtonShown =
    currentInvestment.isAllowedToDeal || currentInvestment.ownerId === user.id;

  if (currentInvestment.isAllowedToDeal)
    return (
      <Button
        variant="default"
        onClick={handleJoinInvestmentDeal}
        hidden={currentInvestment.ownerId === user.id}
      >
        Долучитись до партнерства
      </Button>
    );

  return (
    <>
      <Button
        variant="default"
        onClick={handleBuyInvestment}
        hidden={!isInvestButtonShown}
      >
        Інвестувати
      </Button>
      <Button
        variant="default"
        onClick={handleStartPartnership}
        hidden={!isPartnershipButtonShown}
      >
        Партнерство
      </Button>
    </>
  );
};
