import { Button, Container, Divider, Flex, Stack } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { CARD_TYPES } from '@/features/cards/constants/constants';
import { cardsQueryOptions } from '@/features/cards/query-options';
import { useGameSessionId } from '@/features/game-session/hooks';
import { gameStateMutationOptions } from '@/features/game_state/mutation-options';
import { useGameState } from '@/features/game_state/stores';
import { usePlayerInvestmentDeals } from '@/features/investment-deals';

import { CurrentInvestmentCard } from './components';

export const PlayerCurrentInvestmentPage = () => {
  const gameSessionId = useGameSessionId();
  const { user } = useAuthStrict();
  const currentInvestment = useGameState((s) => s.currentInvestment);
  const investmentId = currentInvestment?.cardId;

  const { data: investmentCardRow } = useQuery({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...cardsQueryOptions.getCardByIdQueryOption(investmentId!),
    enabled: !!investmentId,
  });

  const deals = usePlayerInvestmentDeals();

  const setInvestmentMutation = useMutation({
    ...gameStateMutationOptions.setCurrentInvestment,
  });

  const handleSetInvestment = (isInvestmentBig: boolean) => {
    setInvestmentMutation.mutate({
      gameSessionId,
      isInvestmentBig,
      ownerId: user.id,
    });
  };

  const isInvestment =
    investmentCardRow?.type === CARD_TYPES.BIG_INVESTMENT ||
    investmentCardRow?.type === CARD_TYPES.INVESTMENT;

  return (
    <Container maw={800} w="100%" px="0" mt="md">
      <Stack gap="md">
        <Flex justify="center">
          <Button variant="default" onClick={() => handleSetInvestment(false)}>
            Маленька інвестиція
          </Button>
          <Button variant="default" onClick={() => handleSetInvestment(true)}>
            Велика інвестиція
          </Button>
        </Flex>

        {investmentCardRow && isInvestment && (
          <CurrentInvestmentCard investment={investmentCardRow.data} />
        )}

        <Divider />
      </Stack>
    </Container>
  );
};
