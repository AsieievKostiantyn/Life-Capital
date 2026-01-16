import { Badge, Card, Group, Text } from '@mantine/core';

import type { EventCardRow } from '../types/cardTypes';

interface EventCardProps {
  data: EventCardRow['data'];
}

export const EventCard = ({ data }: EventCardProps) => {
  return (
    <>
      <Card bd={'1px solid purple'}>
        <Group justify="space-between">
          <Text fw={500} size="lg">
            {data.title}
          </Text>
          <Badge color={'purple'}>Подія</Badge>
        </Group>
        <Text mt="sm">{data.description}</Text>
      </Card>
    </>
  );
};
