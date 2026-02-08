import { Container, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { GameSessionOverviewCard } from '@/features/game-session/components';
import {
  useGameSessionId,
  useUserGameSessionStatus,
} from '@/features/game-session/hooks';
import { gameSessionQueryOptions } from '@/features/game-session/query-options';

import { GeneralInfoEditableTable } from './components';

export const SessionInfoPage = () => {
  const gameSessionId = useGameSessionId();
  const { data: overview } = useQuery(
    gameSessionQueryOptions.getGameSessionOverview(gameSessionId)
  );
  const { isPlayer } = useUserGameSessionStatus();

  return (
    <>
      <Title order={2} ta="center" my="sm">
        Загальна інформація гри
      </Title>
      {overview && <GameSessionOverviewCard data={overview} />}

      {isPlayer && (
        <Container maw={600} w="100%" mt="md">
          <Title order={2} ta="center" my="sm">
            Загальна інформація гравця
          </Title>
          <GeneralInfoEditableTable />
        </Container>
      )}
    </>
  );
};
