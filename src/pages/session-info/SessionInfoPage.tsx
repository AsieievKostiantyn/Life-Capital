import { Container, Title } from '@mantine/core';

import { useUserGameSessionStatus } from '@/features/game-session/hooks';
import { createGeneralInfoEditableTableSchema } from '@/features/player-state/table-schemas/generalInfoEditable.schema';

import {
  GeneralInfoEditableTable,
  SetDemandButton,
  SetEventButton,
} from './components';

export const SessionInfoPage = () => {
  const { isHost } = useUserGameSessionStatus();

  return (
    <>
      <Container maw={600} w="100%" px="0">
        <Title order={2} ta="center" my="sm">
          Загальна інформація
        </Title>
        <GeneralInfoEditableTable
          data={createGeneralInfoEditableTableSchema()}
          withTableBorder
          withColumnBorders
        />
        {isHost && (
          <>
            <SetDemandButton />
            <SetEventButton />
          </>
        )}
      </Container>
    </>
  );
};
