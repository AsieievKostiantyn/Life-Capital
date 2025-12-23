import { Container, Title } from '@mantine/core';

import { createGeneralInfoEditableTableSchema } from '@/features/player-state/table-schemas/generalInfoEditable.schema';

import { GeneralInfoEditableTable } from './components/GeneralInfoEditableTable';

export const SessionInfoPage = () => {
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
      </Container>
    </>
  );
};
