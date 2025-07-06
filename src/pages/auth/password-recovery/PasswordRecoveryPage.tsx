import { Link } from 'react-router-dom';

import {
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  Text,
  TextInput,
} from '@mantine/core';
import { MoveLeft } from 'lucide-react';

import { ROUTES } from '@/shared/router';

export const PasswordRecoveryPage = () => {
  return (
    <div className="max-w-100 w-full m-auto">
      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        mt="xl"
        aria-label="Recovery password form"
      >
        <Text size="lg" fw={500} ta="center">
          Forgot your password?
        </Text>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>
        <Divider my="sm" />
        <TextInput label="Your email" placeholder="hello@gmail.com" />
        <Group justify="space-between" mt="lg">
          <Link
            to={ROUTES.LOGIN}
            className="text-(--mantine-color-dimmed) text-[12px] hover:underline"
          >
            <Flex align="center" gap={3}>
              <MoveLeft size={8} /> Back to the login page
            </Flex>
          </Link>
          <Button>Reset password</Button>
        </Group>
      </Paper>
    </div>
  );
};
