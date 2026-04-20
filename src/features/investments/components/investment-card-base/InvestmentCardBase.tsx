import { Card, Group, Stack, Text } from '@mantine/core';

import type { Investment } from '../../types';
import { InvestmentDetails } from './InvestmentDetails';

type InvestmentCardBaseProps = {
  investment: Investment;
  actions?: React.ReactNode;
};

export const InvestmentCardBase = ({
  investment,
  actions,
}: InvestmentCardBaseProps) => {
  return (
    <Card bd="1px solid rgba(221, 146, 6, 0.845)" radius="md" p="md">
      <Stack gap="sm">
        <Text fw={800} size="lg">
          {investment.title}
        </Text>

        <Text size="sm">{investment.description}</Text>

        <InvestmentDetails investment={investment} />

        {actions && (
          <Group justify="center" gap="xl">
            {actions}
          </Group>
        )}
      </Stack>
    </Card>
  );
};
