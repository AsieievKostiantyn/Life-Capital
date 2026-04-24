import { Container, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { useGameSessionUsersId } from '@/features/game-session-users/hooks';
import { GameSessionOverviewCard } from '@/features/game-session/components';
import { useUserGameSessionStatus } from '@/features/game-session/hooks';
import { gameSessionQueryOptions } from '@/features/game-session/query-options/gameSessionQueryOptions';

import { GeneralInfoEditableTable } from './components';

export const SessionInfoPage = () => {
  const gameSessionId = useGameSessionUsersId();
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
