import { User } from 'lucide-react';

import {
  Avatar,
  Badge,
  Card,
  Divider,
  Group,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';

import type { GameSessionOverviewView } from '../../types';

interface GameSessionOverviewCardProps {
  data: GameSessionOverviewView;
}

export const GameSessionOverviewCard = ({
  data,
}: GameSessionOverviewCardProps) => {
  const statusColor = data.status === 'active' ? 'green' : 'gray';

  return (
    <Card withBorder radius="lg" p="lg">
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <Stack gap={4}>
            <Title order={3}>{data.sessionName}</Title>

            <Group gap="xs">
              <User size={16} />
              <Text size="sm" c="dimmed">
                Ведучий:
              </Text>
              <Text size="sm" fw={500}>
                {data.host.displayName}
              </Text>
            </Group>
          </Stack>

          <Badge color={statusColor} variant="light">
            {data.status.toUpperCase()}
          </Badge>
        </Group>

        <Divider />

        <Stack gap="xs">
          <Text fw={500}>Учасники</Text>

          <Table withTableBorder withColumnBorders striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Ім&apos;я</Table.Th>
                <Table.Th>Професія</Table.Th>
                <Table.Th>Вільні кошти</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {data.participants.map((p) => (
                <Table.Tr key={p.userId}>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar radius="xl" src={p.avatarUrl} />
                      <Text>{p.displayName}</Text>
                    </Group>
                  </Table.Td>

                  <Table.Td>
                    {p.profession ?? (
                      <Text c="dimmed" size="sm">
                        —
                      </Text>
                    )}
                  </Table.Td>

                  <Table.Td>
                    {p.monthlyFreeFunds && Number(p.monthlyFreeFunds) ? (
                      <Text fw={500}>
                        {Number(p.monthlyFreeFunds).toLocaleString()}
                      </Text>
                    ) : (
                      <Text c="dimmed" size="sm">
                        —
                      </Text>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Stack>
      </Stack>
    </Card>
  );
};
