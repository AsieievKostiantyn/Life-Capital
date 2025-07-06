import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { MoveLeft } from 'lucide-react';

import {
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  Text,
  TextInput,
} from '@mantine/core';

import { ROUTES } from '@/shared/router';

export const PasswordRecoveryPage = () => {
  return (
    <div className="max-w-125 w-full m-auto">
      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        mt="xl"
        aria-label="Recovery password form"
      >
        <Text size="lg" fw={500} ta="center">
          <FormattedMessage id="auth.resetPassword.title" />
        </Text>
        <Text c="dimmed" fz="sm" ta="center">
          <FormattedMessage id="auth.resetPassword.instruction" />
        </Text>
        <Divider my="sm" />
        <TextInput label="Email" placeholder="hello@gmail.com" radius="md" />
        <Group justify="space-between" mt="lg">
          <Link
            to={ROUTES.LOGIN}
            className="text-(--mantine-color-dimmed) text-[12px] hover:underline"
          >
            <Flex align="center" gap={3}>
              <MoveLeft size={8} />{' '}
              <FormattedMessage id="auth.resetPassword.backToLogin" />
            </Flex>
          </Link>
          <Button radius="xl">
            <FormattedMessage id="auth.resetPassword.button" />
          </Button>
        </Group>
      </Paper>
    </div>
  );
};
