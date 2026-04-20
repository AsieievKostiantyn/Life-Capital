import { Badge, Card, Group, Text } from '@mantine/core';

import type { DemandCardRow } from '../types/cardTypes';

interface DemandCardProps {
  data: DemandCardRow['data'];
}

export const DemandCard = ({ data }: DemandCardProps) => {
  return (
    <>
      <Card bd={'1px solid blue'}>
        <Group justify="space-between">
          <Text fw={500} size="lg" maw={'85%'}>
            {data.title}
          </Text>
          <Badge color={'blue'}>Подія</Badge>
        </Group>
        <Text mt="sm">{data.description}</Text>
        <Text mt="sm">
          <Text span fw={500}>
            Коди:{' '}
          </Text>
          {data.codes.join(', ')}
        </Text>
      </Card>
    </>
  );
};
