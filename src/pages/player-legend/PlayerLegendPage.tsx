import { Button, Container, Flex, Title } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { cardsQueryOptions } from '@/features/cards/query-options';
import { useGameSession } from '@/features/game-session/context';
import { useGameSessionId } from '@/features/game-session/hooks';
import { playerStateMutationOptions } from '@/features/player-state/mutation-options';

import { ERROR_TITLES } from '@/shared/constants';
import { showErrorNotification } from '@/shared/ui';

import { PlayerLegendTables } from './components';

export const PlayerLegendPage = () => {
  const gameSessionId = useGameSessionId();
  const { user } = useAuthStrict();
  const { playerLegendId } = useGameSession();

  const { data: playerLegendCardsRow } = useQuery({
    ...cardsQueryOptions.getCardByIdQueryOption(playerLegendId),
    enabled: !!playerLegendId,
  });

  const setPlayerLegendMutation = useMutation({
    ...playerStateMutationOptions.setPlayerLegendMutationOption,
    onError: (error) => {
      showErrorNotification(ERROR_TITLES.SET_PLAYER_LEGEND, error.message);
    },
  });

  const handleGetPlayerLegend = () => {
    setPlayerLegendMutation.mutate({
      gameSessionId,
      userId: user.id,
    });
  };

  return (
    <>
      <Container maw={600} w="100%" px="0">
        {playerLegendId ? (
          <>
            {playerLegendCardsRow?.data && (
              <>
                <Title order={2} ta="center" my="sm">
                  Легенда гравця
                </Title>
                <PlayerLegendTables playerLegend={playerLegendCardsRow?.data} />
              </>
            )}
          </>
        ) : (
          <Flex justify="center">
            <Button
              variant="default"
              onClick={handleGetPlayerLegend}
              disabled={setPlayerLegendMutation.isPending}
            >
              Отримати легенду
            </Button>
          </Flex>
        )}
      </Container>
    </>
  );
};
